import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  isInitialized: boolean
  adminEmail: string
  login: (password: string, email?: string) => { success: boolean; error?: string }
  initializePassword: (password: string, email?: string) => { success: boolean; error?: string }
  logout: () => void
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string }
  lockoutRemainingSeconds: number
}

const DEFAULT_ADMIN_EMAIL = 'admin@prayash.in'
const SESSION_KEY = 'prayash_admin_session_v1'
const PASSWORD_STORAGE_KEY = 'prayash_admin_pwd_custom'
const ATTEMPTS_STORAGE_KEY = 'prayash_admin_attempts_v1'

const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION_MS = 15 * 60 * 1000 // 15 minutes

interface AttemptRecord {
  count: number
  lockoutUntil: number | null
}

function validatePasswordStrength(pwd: string): { valid: boolean; error?: string } {
  if (!pwd || pwd.length < 10) {
    return { valid: false, error: 'Password must be at least 10 characters long.' }
  }
  if (!/[a-zA-Z]/.test(pwd) || !/[0-9]/.test(pwd)) {
    return { valid: false, error: 'Password must contain both letters and numbers.' }
  }
  return { valid: true }
}

function getAttemptsRecord(): AttemptRecord {
  if (typeof window === 'undefined') return { count: 0, lockoutUntil: null }
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY)
    if (!raw) return { count: 0, lockoutUntil: null }
    return JSON.parse(raw)
  } catch {
    return { count: 0, lockoutUntil: null }
  }
}

function getInitialLockout(): number {
  const record = getAttemptsRecord()
  if (record.lockoutUntil && Date.now() < record.lockoutUntil) {
    return Math.ceil((record.lockoutUntil - Date.now()) / 1000)
  }
  return 0
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      const session = localStorage.getItem(SESSION_KEY)
      if (session) {
        const parsed = JSON.parse(session)
        return Boolean(parsed?.timestamp && Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000)
      }
    } catch {
      return false
    }
    return false
  })

  const [isInitialized, setIsInitialized] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return Boolean(localStorage.getItem(PASSWORD_STORAGE_KEY))
  })

  const [adminEmail, setAdminEmail] = useState<string>(() => {
    if (typeof window === 'undefined') return DEFAULT_ADMIN_EMAIL
    try {
      const session = localStorage.getItem(SESSION_KEY)
      if (session) {
        const parsed = JSON.parse(session)
        if (parsed?.email) return parsed.email
      }
    } catch {
      return DEFAULT_ADMIN_EMAIL
    }
    return DEFAULT_ADMIN_EMAIL
  })

  const [lockoutRemainingSeconds, setLockoutRemainingSeconds] = useState<number>(getInitialLockout)

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemainingSeconds <= 0) return
    const interval = setInterval(() => {
      setLockoutRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [lockoutRemainingSeconds])

  const checkLockout = (): boolean => {
    const remaining = getInitialLockout()
    setLockoutRemainingSeconds(remaining)
    if (remaining === 0) {
      const record = getAttemptsRecord()
      if (record.lockoutUntil && Date.now() >= record.lockoutUntil) {
        localStorage.removeItem(ATTEMPTS_STORAGE_KEY)
      }
    }
    return remaining > 0
  }

  const recordFailedAttempt = () => {
    const record = getAttemptsRecord()
    const nextCount = record.count + 1
    if (nextCount >= MAX_FAILED_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS
      localStorage.setItem(
        ATTEMPTS_STORAGE_KEY,
        JSON.stringify({ count: nextCount, lockoutUntil })
      )
      setLockoutRemainingSeconds(Math.ceil(LOCKOUT_DURATION_MS / 1000))
    } else {
      localStorage.setItem(
        ATTEMPTS_STORAGE_KEY,
        JSON.stringify({ count: nextCount, lockoutUntil: null })
      )
    }
  }

  const clearFailedAttempts = () => {
    localStorage.removeItem(ATTEMPTS_STORAGE_KEY)
    setLockoutRemainingSeconds(0)
  }

  const initializePassword = (password: string, email: string = DEFAULT_ADMIN_EMAIL) => {
    const strength = validatePasswordStrength(password)
    if (!strength.valid) {
      return { success: false, error: strength.error }
    }
    localStorage.setItem(PASSWORD_STORAGE_KEY, password)
    setIsInitialized(true)
    setIsAuthenticated(true)
    setAdminEmail(email)
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ email, timestamp: Date.now() })
    )
    clearFailedAttempts()
    return { success: true }
  }

  const login = (password: string, email: string = DEFAULT_ADMIN_EMAIL) => {
    if (checkLockout()) {
      const mins = Math.ceil(lockoutRemainingSeconds / 60)
      return {
        success: false,
        error: `Too many failed attempts. Access locked for ${mins} more minute(s).`,
      }
    }

    const storedPassword = localStorage.getItem(PASSWORD_STORAGE_KEY)
    if (!storedPassword) {
      return {
        success: false,
        error: 'Admin account has not been initialized. Please set up master credentials first.',
      }
    }

    if (password === storedPassword) {
      clearFailedAttempts()
      setIsAuthenticated(true)
      setAdminEmail(email)
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ email, timestamp: Date.now() })
      )
      return { success: true }
    }

    recordFailedAttempt()
    const currentAttempts = getAttemptsRecord().count
    const remaining = MAX_FAILED_ATTEMPTS - currentAttempts
    if (remaining <= 0) {
      return {
        success: false,
        error: 'Too many failed attempts. Locked out for 15 minutes.',
      }
    }
    return {
      success: false,
      error: `Invalid password. ${remaining} attempt(s) remaining before lockout.`,
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(SESSION_KEY)
  }

  const changePassword = (oldPass: string, newPass: string) => {
    const storedPassword = localStorage.getItem(PASSWORD_STORAGE_KEY)
    if (storedPassword && oldPass !== storedPassword) {
      return { success: false, error: 'Current password is incorrect.' }
    }

    const strength = validatePasswordStrength(newPass)
    if (!strength.valid) {
      return { success: false, error: strength.error }
    }

    localStorage.setItem(PASSWORD_STORAGE_KEY, newPass)
    return { success: true }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isInitialized,
        adminEmail,
        login,
        initializePassword,
        logout,
        changePassword,
        lockoutRemainingSeconds,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
