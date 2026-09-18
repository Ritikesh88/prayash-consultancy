import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { whatsappUrl, siteConfig } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'
import SectionReveal from '@/components/ui/SectionReveal'

export default function FinalCTA() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container-main">
        <SectionReveal>
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, #0891B2 50%, #6366F1 100%)',
                padding: '1px',
              }}
            >
              <div
                className="absolute inset-[1px] rounded-3xl"
                style={{ background: 'var(--bg-card)' }}
              />
            </div>

            {/* Glow orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div
                className="absolute -top-10 right-0 w-64 h-64 rounded-full"
                style={{ background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' }}
              />
              <div
                className="absolute -bottom-10 left-0 w-48 h-48 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
              />
            </div>

            <div className="relative z-10 border border-[var(--border)] rounded-3xl px-8 py-14 sm:px-14 sm:py-16 text-center">
              <div className="tag tag-accent mb-5 mx-auto w-fit">Get Started Today</div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Have a tender in mind?
              </h2>
              <p className="text-base max-w-lg mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Share the tender details with our desk and understand exactly what it takes to qualify and submit. No complicated jargon — just actionable guidance.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5">
                <Link
                  to="/send-tender"
                  id="cta-final-send-tender"
                  onClick={() => trackEvent(EVENTS.CTA_SEND_TENDER_CLICK, { location: 'final_cta' })}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-all shadow-lg text-white w-full sm:w-auto"
                  style={{ background: 'var(--accent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                >
                  Send Your Tender
                  <ArrowRight size={15} />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="cta-final-whatsapp"
                  onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'final_cta' })}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm transition-colors text-white w-full sm:w-auto shadow-sm"
                  style={{ background: '#25D366' }}
                >
                  <MessageCircle size={16} />
                  Talk on WhatsApp
                </a>
              </div>

              {/* Phone */}
              <a
                href={siteConfig.phoneHref}
                onClick={() => trackEvent(EVENTS.PHONE_CLICK, { location: 'final_cta' })}
                className="inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <Phone size={14} style={{ color: 'var(--accent)' }} />
                Or call our desk at {siteConfig.phone}
              </a>

              {/* Trust line */}
              <p className="text-[11px] mt-5" style={{ color: 'var(--text-faint)' }}>
                Independent consultancy. Portal credentials & private keys are never requested.
              </p>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
