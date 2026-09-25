import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, ChevronRight } from 'lucide-react'
import { siteConfig, whatsappUrl } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'
import ThemeToggle from '@/components/ui/ThemeToggle'
import MobileNav from './MobileNav'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/industries', label: 'Industries' },
  { to: '/about', label: 'About' },
  { to: '/faqs', label: 'FAQs' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          paddingTop: scrolled ? '0.625rem' : '0.875rem',
          paddingBottom: scrolled ? '0.625rem' : '0.875rem',
          background: 'var(--header-bg)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label={`${siteConfig.companyName} — Home`}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md"
              style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 100%)' }}
            >
              <span className="text-white font-bold text-sm tracking-tight">P</span>
            </div>
            <div>
              <span
                className="font-bold text-base leading-none block tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {siteConfig.companyName}
              </span>
              <span
                className="text-[10px] leading-none font-medium tracking-wide uppercase"
                style={{ color: 'var(--text-faint)' }}
              >
                Tender Consultancy
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[var(--accent)] bg-[var(--accent-dim)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Theme toggle */}
            <ThemeToggle compact />

            <Link
              to="/client-login"
              onClick={() => trackEvent(EVENTS.CLIENT_LOGIN_CLICK)}
              className="px-3.5 py-2 text-sm font-medium transition-colors duration-150"
              style={{ color: 'var(--text-faint)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-faint)')}
            >
              Client Login
            </Link>
            <Link
              to="/send-tender"
              onClick={() => trackEvent(EVENTS.CTA_SEND_TENDER_CLICK, { location: 'header' })}
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-150"
              style={{
                border: '1px solid var(--border-md)',
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-border)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-md)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              Send Your Tender
            </Link>
            <Link
              to="/contact"
              onClick={() => trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'header' })}
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg flex items-center gap-1.5 transition-colors duration-150"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Get Consultation
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle compact />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'header_mobile' })}
              className="px-3 py-2 text-xs font-semibold text-white rounded-lg transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              WhatsApp
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} navLinks={navLinks} />
    </>
  )
}
