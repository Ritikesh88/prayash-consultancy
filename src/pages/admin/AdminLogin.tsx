import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowLeft, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { siteConfig } from '@/config/siteConfig'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@prayash.in')
  const [password, setPassword] = useState('admin@prayash2026')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const result = login(password, email)
      if (result.success) {
        navigate(from, { replace: true })
      } else {
        setError(result.error || 'Authentication failed. Please verify credentials.')
      }
      setLoading(false)
    }, 400)
  }

  return (
    <>
      <Helmet>
        <title>Admin Authentication | {siteConfig.companyName}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: 'var(--bg-base)' }}
      >
        {/* Subtle background mesh */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, var(--accent) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="w-full max-w-md relative z-10">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-6 px-3 py-1.5 rounded-lg border transition-colors shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <ArrowLeft size={14} />
            Back to Public Website
          </Link>

          {/* Login Card */}
          <div
            className="rounded-3xl border p-8 sm:p-10 shadow-2xl relative overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Top Accent Line */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ background: 'linear-gradient(90deg, #0D9488, #2DD4BF, #6366F1)' }}
            />

            {/* Header */}
            <div className="text-center mb-8">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-sm"
                style={{
                  backgroundColor: 'var(--accent-dim)',
                  borderColor: 'var(--accent-border)',
                  color: 'var(--accent)',
                }}
              >
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Tender Desk Admin CMS
              </h1>
              <p className="text-xs mt-1.5" style={{ color: 'var(--text-secondary)' }}>
                Sign in to customize homepage content, portal settings, and review client leads.
              </p>
            </div>

            {/* Helper Credential Pill */}
            <div
              className="mb-6 p-3 rounded-xl border text-xs flex items-start gap-2.5"
              style={{
                backgroundColor: 'rgba(13,148,136,0.06)',
                borderColor: 'rgba(13,148,136,0.25)',
              }}
            >
              <KeyRound size={16} className="flex-shrink-0 mt-0.5 text-teal-600 dark:text-teal-400" />
              <div>
                <p className="font-bold text-teal-700 dark:text-teal-300">Default Staff Access:</p>
                <p className="text-[11px] text-teal-600 dark:text-teal-400 font-mono mt-0.5">
                  Password: <span className="font-bold underline">admin@prayash2026</span>
                </p>
              </div>
            </div>

            {error && (
              <div
                className="mb-5 p-3 rounded-xl border text-xs flex items-center gap-2"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  color: '#EF4444',
                }}
              >
                <AlertCircle size={15} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Admin Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="admin@prayash.in"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border text-sm outline-none transition-all"
                    style={{
                      backgroundColor: 'var(--bg-base)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer p-0.5"
                    style={{ color: 'var(--text-muted)' }}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md mt-6 flex items-center justify-center gap-2 cursor-pointer"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Access Admin Panel</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}
