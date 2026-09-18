import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { siteConfig, whatsappUrl } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'
import ThemeToggle from '@/components/ui/ThemeToggle'

const companyLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/industries', label: 'Industries' },
  { to: '/faqs', label: 'FAQs' },
  { to: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { to: '/services#onboarding', label: 'GeM & Portal Support' },
  { to: '/services#discovery', label: 'Tender Discovery' },
  { to: '/services#eligibility', label: 'Eligibility Assessment' },
  { to: '/services#documentation', label: 'Bid Documentation' },
  { to: '/services#submission', label: 'Submission Support' },
  { to: '/services#post-award', label: 'Post-Award Support' },
]

const resourceLinks = [
  { to: '/faqs', label: 'Tender FAQs' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/send-tender', label: 'Send Your Tender' },
  { to: '/contact', label: 'Request Consultation' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 100%)' }}
              >
                <span className="text-white font-bold text-base tracking-tight">P</span>
              </div>
              <div>
                <span className="font-bold text-base leading-none block tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {siteConfig.companyName}
                </span>
                <span className="text-[10px] leading-none font-medium tracking-wide uppercase" style={{ color: 'var(--text-faint)' }}>
                  Tender Consultancy
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Practical assistance with government procurement — from GeM onboarding and tender
              discovery to documentation, bid preparation and submission support.
            </p>

            {/* Theme toggle in footer */}
            <div className="flex items-center gap-2.5 mb-5">
              <ThemeToggle />
              <span className="text-xs" style={{ color: 'var(--text-faint)' }}>Switch theme</span>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-3">
              <a
                href={siteConfig.phoneHref}
                onClick={() => trackEvent(EVENTS.PHONE_CLICK, { location: 'footer' })}
                className="flex items-center gap-2.5 text-sm transition-colors group"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Phone size={14} style={{ color: 'var(--accent)' }} />
                {siteConfig.phone}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'footer' })}
                className="flex items-center gap-2.5 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <MessageCircle size={14} style={{ color: 'var(--accent)' }} />
                WhatsApp: {siteConfig.whatsapp}
              </a>
              <a
                href={siteConfig.emailHref}
                onClick={() => trackEvent(EVENTS.EMAIL_CLICK, { location: 'footer' })}
                className="flex items-center gap-2.5 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Mail size={14} style={{ color: 'var(--accent)' }} />
                {siteConfig.email}
              </a>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                <MapPin size={14} style={{ color: 'var(--text-faint)' }} />
                {siteConfig.addressFull}
              </div>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                <Clock size={14} style={{ color: 'var(--text-faint)' }} />
                {siteConfig.businessHours}
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-faint)' }}>
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-faint)' }}>
              Services
            </h3>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-faint)' }}>
              Resources
            </h3>
            <ul className="flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-faint)' }}>
                Legal
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link to="/privacy-policy" className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm transition-colors" style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-main py-5">
          <div className="flex flex-col gap-3">
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-faint)' }}>
              <span className="font-semibold" style={{ color: 'var(--text-muted)' }}>Disclaimer: </span>
              {siteConfig.companyName} is an independent private consultancy. We are not a government
              department, government website, or government-appointed authority. Adjust wording after legal review.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
                © {new Date().getFullYear()} {siteConfig.companyName}. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/privacy-policy" className="text-[11px] transition-colors" style={{ color: 'var(--text-faint)' }}>Privacy Policy</Link>
                <Link to="/terms" className="text-[11px] transition-colors" style={{ color: 'var(--text-faint)' }}>Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
