import { XCircle, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionReveal from '@/components/ui/SectionReveal'
import { useContent } from '@/context/ContentContext'

export default function ProblemSection() {
  const { content } = useContent()
  const comparisonData = content.problemItems || []
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Subtle cautionary diagonal grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, var(--text-primary), var(--text-primary) 1px, transparent 1px, transparent 24px)',
        }}
      />
      <div className="container-main relative z-10">
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="tag tag-amber mb-4 mx-auto w-fit">
              <AlertTriangle size={12} className="text-amber-500" />
              Tender Complexity Solved
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Why Capable Contractors Lose Tenders Before Price Opening
            </h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              In public procurement, over 70% of tender rejections occur at the technical and documentary stage — not on pricing. We replace trial-and-error with structured operational precision.
            </p>
          </div>
        </SectionReveal>

        {/* Comparative Matrix */}
        <SectionReveal delay={100}>
          <div
            className="rounded-3xl border overflow-hidden shadow-xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
          >
            {/* Table Header Bar */}
            <div className="grid md:grid-cols-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <div
                className="p-5 sm:p-6 border-b md:border-b-0 md:border-r flex items-center gap-3"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.04)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="w-8 h-8 rounded-full bg-rose-500/15 flex items-center justify-center text-rose-500 flex-shrink-0">
                  <XCircle size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    The Pain Points
                  </p>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                    Bidding In-House Without a Dedicated Desk
                  </h3>
                </div>
              </div>

              <div
                className="p-5 sm:p-6 flex items-center gap-3"
                style={{
                  backgroundColor: 'rgba(13,148,136,0.05)',
                }}
              >
                <div className="w-8 h-8 rounded-full bg-[#0D9488]/15 flex items-center justify-center text-[#0D9488] flex-shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                    The Solution
                  </p>
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                    Prayash Outsourced Tender Desk
                  </h3>
                </div>
              </div>
            </div>

            {/* Matrix Rows */}
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              {comparisonData.map((row, idx) => (
                <div
                  key={idx}
                  className="grid md:grid-cols-2 transition-colors duration-150"
                  style={{
                    backgroundColor: idx % 2 === 0 ? 'transparent' : 'var(--bg-subtle)',
                  }}
                >
                  {/* Left Column (Pain) */}
                  <div
                    className="p-5 sm:p-6 border-b md:border-b-0 md:border-r flex items-start gap-3.5"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 flex-shrink-0" />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {row.pain}
                    </p>
                  </div>

                  {/* Right Column (Solution) */}
                  <div className="p-5 sm:p-6 flex items-start gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] mt-2 flex-shrink-0" />
                    <p className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                      {row.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Matrix Footer Callout */}
            <div
              className="p-6 sm:p-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  Ready to bid on high-value tenders without compliance headaches?
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Our consultants can audit your business credentials and recommend live matching tenders.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs text-white shadow-sm transition-all flex-shrink-0"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Schedule an Assessment <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
