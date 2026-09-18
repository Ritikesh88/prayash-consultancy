import { Link } from 'react-router-dom'
import { Phone, MessageCircle } from 'lucide-react'
import { siteConfig, whatsappUrl } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'

/**
 * Sticky bottom bar visible on mobile only.
 * Provides quick access to phone, WhatsApp and consultation CTA.
 */
export default function MobileContactBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden backdrop-blur-md border-t pb-safe shadow-lg"
      style={{
        backgroundColor: 'var(--header-bg)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="grid grid-cols-3 gap-0">
        <a
          href={siteConfig.phoneHref}
          onClick={() => trackEvent(EVENTS.PHONE_CLICK, { location: 'mobile_sticky_bar' })}
          className="flex flex-col items-center justify-center gap-1 py-3 transition-colors border-r"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }}
        >
          <Phone size={18} style={{ color: 'var(--accent)' }} />
          <span className="text-[11px] font-semibold">Call Desk</span>
        </a>

        <Link
          to="/contact"
          onClick={() => trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'mobile_sticky_bar' })}
          className="flex flex-col items-center justify-center gap-1 py-3 text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wide leading-tight text-center px-2">
            Consultation
          </span>
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'mobile_sticky_bar' })}
          className="flex flex-col items-center justify-center gap-1 py-3 transition-colors border-l"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-secondary)',
          }}
        >
          <MessageCircle size={18} className="text-[#25D366]" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
