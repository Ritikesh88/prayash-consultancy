import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Lock, ArrowLeft } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'

const pageTitle = `Client Portal | ${siteConfig.companyName}`
const pageDesc = 'Client portal access — coming soon.'

export default function ClientLogin() {
  const handleContactClick = () => {
    trackEvent(EVENTS.CLIENT_LOGIN_CLICK, { action: 'contact_redirect' })
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`${siteConfig.siteUrl}/client-login`} />
      </Helmet>

      <main
        className="min-h-screen flex items-center justify-center pt-32 pb-16"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="container-main max-w-md mx-auto text-center">
          <div
            className="w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto mb-6 shadow-md"
            style={{
              backgroundColor: 'var(--accent-dim)',
              borderColor: 'var(--accent-border)',
              color: 'var(--accent)',
            }}
          >
            <Lock size={28} />
          </div>

          <div className="tag tag-accent mb-4 mx-auto w-fit">Client Dashboard</div>

          <h1 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Client Portal Launching Soon
          </h1>

          <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            A unified dashboard for tracking ongoing tender bids, reviewing eligibility matrices, and receiving live submission timestamps.
          </p>

          <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
            Currently, our desk coordinates directly via dedicated WhatsApp groups, direct phone consultation, and email briefings.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/contact"
              onClick={handleContactClick}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all text-white shadow-sm"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Contact Our Desk Directly
            </Link>
            <Link
              to="/"
              className="w-full py-3.5 rounded-xl border font-semibold text-sm transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <ArrowLeft size={14} />
              Back to Home
            </Link>

            <Link
              to="/admin/login"
              className="w-full py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400 mt-2"
              style={{
                backgroundColor: 'rgba(13,148,136,0.06)',
                borderColor: 'rgba(13,148,136,0.25)',
              }}
            >
              <Lock size={12} />
              Staff Administrator Login →
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
