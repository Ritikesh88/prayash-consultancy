import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { trackEvent, EVENTS } from '@/lib/analytics'
import SectionReveal from '@/components/ui/SectionReveal'

const steps = [
  {
    number: '01',
    title: 'Initial Consultation',
    desc: 'Share your business type, what you supply or service, and any tenders you have in mind. We understand your situation first.',
    color: '#0D9488',
    bg: 'rgba(13,148,136,0.10)',
    border: 'rgba(13,148,136,0.25)',
  },
  {
    number: '02',
    title: 'Portal Onboarding',
    desc: 'If not already registered, we assist with GeM, eTender and other portal registration — getting your business set up correctly.',
    color: '#0891B2',
    bg: 'rgba(8,145,178,0.10)',
    border: 'rgba(8,145,178,0.25)',
  },
  {
    number: '03',
    title: 'Tender Discovery',
    desc: 'We identify relevant open tenders matching your product/service category. You review the shortlist and decide which to pursue.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.10)',
    border: 'rgba(139,92,246,0.25)',
  },
  {
    number: '04',
    title: 'Eligibility & Bid Preparation',
    desc: 'We review the tender requirements, identify what documentation is needed, and assist with organising and preparing the bid.',
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.10)',
    border: 'rgba(236,72,153,0.25)',
  },
  {
    number: '05',
    title: 'Submission & Tracking',
    desc: 'We support the submission process on the portal and track key deadlines. Post-submission status is monitored.',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.10)',
    border: 'rgba(245,158,11,0.25)',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-subtle)' }}>
      {/* Subtle concentric radar pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, var(--accent) 1px, transparent 1px), radial-gradient(circle at 50% 50%, transparent 40px, var(--accent) 41px, transparent 42px)',
          backgroundSize: '120px 120px',
        }}
      />
      <div className="container-main relative z-10">
        <SectionReveal>
          <div className="text-center mb-12">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Process</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              How we work with you
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--text-secondary)' }}>
              A structured, five-step approach from first conversation to tender submission.
            </p>
          </div>
        </SectionReveal>

        {/* Steps — horizontal on large, vertical on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
          {steps.map((step, i) => (
            <SectionReveal
              key={step.number}
              delay={i * 80}
              direction={i === 0 ? 'left' : i === steps.length - 1 ? 'right' : 'morph'}
            >
              <div
                className="relative rounded-2xl p-5 h-full border transition-all duration-250 hover:-translate-y-1"
                style={{
                  background: step.bg,
                  border: `1px solid ${step.border}`,
                  boxShadow: `0 4px 24px ${step.bg}`,
                }}
              >
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-3xl font-black leading-none"
                    style={{ color: `${step.color}40` }}
                  >
                    {step.number}
                  </span>
                  {/* Connector arrow (hidden on last) */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: step.color }}
                      >
                        <ArrowRight size={12} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <h3
                  className="font-bold text-sm mb-2 leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {step.desc}
                </p>
                {/* Bottom color bar */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, ${step.color}, transparent)` }}
                />
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal>
          <div className="text-center">
            <Link
              to="/how-it-works"
              onClick={() => trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { page: 'how_it_works' })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{
                background: 'var(--accent)',
                color: '#fff',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              See the Full Process
              <ArrowRight size={15} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
