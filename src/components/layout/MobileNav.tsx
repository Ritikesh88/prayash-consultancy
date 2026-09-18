import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X, Phone, MessageCircle, ChevronRight } from 'lucide-react'
import { siteConfig, whatsappUrl } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navLinks: { to: string; label: string }[]
}

export default function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-all duration-300 lg:hidden"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        onClick={onClose}
      />

      {/* Drawer */}
      <nav
        className="fixed top-0 right-0 bottom-0 w-[280px] z-50 flex flex-col lg:hidden transition-transform duration-300"
        style={{
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: '-16px 0 48px rgba(0,0,0,0.3)',
        }}
        aria-hidden={!isOpen}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            {siteConfig.companyName}
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-[var(--accent-dim)] text-[var(--accent)]' : ''
                  }`
                }
                style={({ isActive }) =>
                  isActive ? {} : { color: 'var(--text-secondary)' }
                }
              >
                {link.label}
                <ChevronRight size={14} style={{ color: 'var(--text-faint)' }} />
              </NavLink>
            ))}
          </div>

          <div
            className="my-4 h-px"
            style={{ background: 'var(--border)' }}
          />

          <div className="flex flex-col gap-1">
            <Link
              to="/send-tender"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Send Your Tender
              <ChevronRight size={14} style={{ color: 'var(--text-faint)' }} />
            </Link>
            <Link
              to="/client-login"
              onClick={() => trackEvent(EVENTS.CLIENT_LOGIN_CLICK)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              Client Login
              <ChevronRight size={14} style={{ color: 'var(--text-faint)' }} />
            </Link>
          </div>
        </div>

        {/* CTA + contact */}
        <div
          className="px-4 py-5 border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          <Link
            to="/contact"
            onClick={() => trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'mobile_nav' })}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white mb-3 transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            Get Consultation
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={siteConfig.phoneHref}
              onClick={() => trackEvent(EVENTS.PHONE_CLICK, { location: 'mobile_nav' })}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-colors border"
              style={{
                color: 'var(--text-secondary)',
                borderColor: 'var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              <Phone size={14} style={{ color: 'var(--accent)' }} />
              Call Us
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'mobile_nav' })}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-white transition-colors"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={14} />
              WhatsApp
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}
