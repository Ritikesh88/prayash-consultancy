import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import { trackEvent, EVENTS } from '@/lib/analytics'
import SectionReveal from '@/components/ui/SectionReveal'

const checklistItems = [
  'Business registration (LLP / Pvt Ltd / Partnership / Proprietorship)',
  'GST registration with active status',
  'Company / Entity PAN card',
  'MSME / Udyam registration (for exemption benefits)',
  'Audited financial statements (last 3 FY)',
  'Experience certificates & past work orders',
  'Technical credentials & key personnel profiles',
  'Certifications (ISO, BIS, or specific licences)',
  'Class-3 Digital Signature Certificate (DSC)',
  'Tender-specific compliance documents',
]

export default function BidReadiness() {
  const [checked, setChecked] = useState<Set<number>>(new Set([0, 1, 2])) // pre-check 3 basics for better engagement

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const progress = Math.round((checked.size / checklistItems.length) * 100)

  return (
    <section className="section-padding" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <SectionReveal>
            <div>
              <div className="tag tag-accent mb-5 w-fit">Interactive Diagnostic</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Is your business ready to bid for government tenders?
              </h2>
              <p className="text-base mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Before spending weeks preparing tender bids, ensure your foundational documentation and portal credentials are in order.
              </p>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Tick off the items you currently possess. Our team helps you assemble missing documents, register on required portals, and ensure 100% compliance.
              </p>
              <Link
                to="/contact"
                id="cta-bid-readiness"
                onClick={() =>
                  trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'bid_readiness' })
                }
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-md"
                style={{
                  background: 'var(--accent)',
                  color: '#FFFFFF',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Get a Free Document Audit
                <ArrowRight size={16} />
              </Link>
            </div>
          </SectionReveal>

          {/* Right — Interactive checklist card */}
          <SectionReveal delay={120}>
            <div
              className="rounded-2xl border p-6 sm:p-7 shadow-lg"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    Tender Readiness Scorecard
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Click to check or uncheck items
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold" style={{ color: 'var(--accent)' }}>
                    {progress}%
                  </span>
                  <p className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
                    {checked.size} of {checklistItems.length} ready
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 rounded-full mb-6 overflow-hidden" style={{ background: 'var(--border)' }}>
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    background: progress > 70 ? 'var(--success)' : 'var(--accent)',
                  }}
                />
              </div>

              {/* Items */}
              <div className="flex flex-col gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                {checklistItems.map((item, i) => {
                  const isChecked = checked.has(i)
                  return (
                    <button
                      key={i}
                      onClick={() => toggle(i)}
                      className="flex items-center gap-3 p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer border"
                      style={{
                        backgroundColor: isChecked ? 'var(--accent-dim)' : 'transparent',
                        borderColor: isChecked ? 'var(--accent-border)' : 'transparent',
                      }}
                      aria-pressed={isChecked}
                    >
                      {isChecked ? (
                        <CheckCircle2 size={18} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                      ) : (
                        <Circle size={18} className="flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
                      )}
                      <span
                        className="text-xs sm:text-sm font-medium leading-snug select-none"
                        style={{
                          color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                          textDecoration: isChecked ? 'none' : 'none',
                        }}
                      >
                        {item}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div
                className="mt-5 pt-4 border-t flex items-center justify-between text-xs"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              >
                <span>Need help getting missing items?</span>
                <Link to="/contact" className="font-semibold underline" style={{ color: 'var(--accent)' }}>
                  Talk to a tender expert
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
