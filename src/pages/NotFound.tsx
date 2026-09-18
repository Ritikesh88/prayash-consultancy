import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Search } from 'lucide-react'
import { whatsappUrl } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Prayash Consultancy</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main
        className="min-h-screen flex items-center justify-center pt-32 pb-16"
        style={{ background: 'var(--bg-base)' }}
      >
        <div className="container-main max-w-lg mx-auto text-center">
          {/* Large 404 Watermark */}
          <div className="relative mb-8">
            <p
              className="text-[120px] sm:text-[160px] font-black leading-none select-none"
              style={{ color: 'var(--accent)', opacity: 0.12 }}
            >
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center border shadow-md"
                style={{
                  backgroundColor: 'var(--accent-dim)',
                  borderColor: 'var(--accent-border)',
                  color: 'var(--accent)',
                }}
              >
                <Search size={28} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            This page could not be found
          </h1>
          <p className="mb-8 text-sm leading-relaxed max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
            The link may be outdated or the page has moved. You can return to our homepage or reach our consultants on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all text-white shadow-sm"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              <ArrowLeft size={15} />
              Return to Homepage
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: '404_page' })}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm transition-all"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#25D366')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
