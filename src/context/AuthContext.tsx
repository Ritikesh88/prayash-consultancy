import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  adminEmail: string
  login: (password: string, email?: string) => { success: boolean; error?: string }
  logout: () => void
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string }
}

const DEFAULT_ADMIN_EMAIL = 'admin@prayash.in'
const DEFAULT_PASSWORD = 'admin@prayash2026'
const SESSION_KEY = 'prayash_admin_session_v1'
const PASSWORD_STORAGE_KEY = 'prayash_admin_pwd_custom'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [adminEmail, setAdminEmail] = useState<string>(DEFAULT_ADMIN_EMAIL)

  useEffect(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY)
      if (session) {
        const parsed = JSON.parse(session)
        // Session valid for 7 days
        if (parsed?.timestamp && Date.now() - parsed.timestamp < 7 * 24 * 60 * 60 * 1000) {
          setIsAuthenticated(true)
          if (parsed.email) setAdminEmail(parsed.email)
        } else {
          localStorage.removeItem(SESSION_KEY)
        }
      }
    } catch {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [])

  const getStoredPassword = () => {
    return localStorage.getItem(PASSWORD_STORAGE_KEY) || DEFAULT_PASSWORD
  }

  const login = (password: string, email: string = DEFAULT_ADMIN_EMAIL) => {
    const activePassword = getStoredPassword()
    if (password === activePassword) {
      setIsAuthenticated(true)
      setAdminEmail(email)
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ email, timestamp: Date.now() })
      )
      return { success: true }
    }
    return { success: false, error: 'Invalid password. Please check your credentials.' }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(SESSION_KEY)
  }

  const changePassword = (oldPass: string, newPass: string) => {
    const activePassword = getStoredPassword()
    if (oldPass !== activePassword) {
      return { success: false, error: 'Current password is incorrect.' }
    }
    if (!newPass || newPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' }
    }
    localStorage.setItem(PASSWORD_STORAGE_KEY, newPass)
    return { success: true }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminEmail, login, logout, changePassword }}>
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
