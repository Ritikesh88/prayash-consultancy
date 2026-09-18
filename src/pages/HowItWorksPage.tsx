import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import HowItWorks from '@/components/sections/HowItWorks'
import TenderWorkflow from '@/components/sections/TenderWorkflow'
import FinalCTA from '@/components/sections/FinalCTA'
import { trackEvent, EVENTS } from '@/lib/analytics'
import SectionReveal from '@/components/ui/SectionReveal'

const pageTitle = `How We Work — Government Tender Process | ${siteConfig.companyName}`
const pageDesc =
  'Our step-by-step approach to government tender participation: onboarding, tender discovery, eligibility assessment, bid preparation and submission support.'

export default function HowItWorksPage() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/how-it-works`} />
      </Helmet>

      <main style={{ background: 'var(--bg-base)' }}>
        {/* Header */}
        <section className="pt-40 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container-main text-center">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Process & Methodology</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              How our tender desk works with you
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              A disciplined, structured process built around the exact requirements of public procurement — eliminating compliance oversights.
            </p>
          </div>
        </section>

        <HowItWorks />
        <TenderWorkflow />

        {/* What to prepare */}
        <section className="section-padding" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container-main max-w-3xl mx-auto">
            <SectionReveal>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Helpful details for our first consultation
              </h2>
              <div
                className="rounded-2xl border p-8 shadow-sm"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'Basic entity credentials (GST number, PAN, incorporation)',
                    'Udyam / MSME certificate (if qualifying for exemption benefits)',
                    'Specific tender PDF or bid number (if currently evaluating one)',
                    'Product / service scope you intend to supply',
                    'Operating state or geographic execution range',
                    'Prior government or private contract experience',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs mt-6 pt-4 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                  Don't have everything in hand? Don't worry. Share whatever details you currently have, and our team will map out the missing requirements.
                </p>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/contact"
                  onClick={() =>
                    trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'how_it_works_page' })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all text-white shadow-sm"
                  style={{ background: 'var(--accent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                >
                  Start a Free Consultation
                  <ArrowRight size={15} />
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  )
}
