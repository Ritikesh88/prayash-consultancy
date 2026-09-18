import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { faqData } from '@/config/faqData'
import FAQAccordion from '@/components/ui/FAQAccordion'
import { trackEvent, EVENTS } from '@/lib/analytics'

const pageTitle = `Government Tender FAQs | ${siteConfig.companyName}`
const pageDesc =
  'Answers to common questions about government tender participation, GeM registration, bid documentation, eligibility and the consultation process.'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/faqs`} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <main style={{ background: 'var(--bg-base)' }}>
        <section className="pt-40 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container-main text-center">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Knowledge Base</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Practical answers to questions regarding GeM registrations, eligibility criteria, documentation, and tender desk services.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-main max-w-3xl mx-auto">
            <FAQAccordion items={faqData} />

            <div
              className="mt-12 rounded-2xl border p-8 sm:p-10 text-center shadow-md"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                Have a specific question about your tender?
              </h2>
              <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Every tender notification has distinct eligibility and submission conditions. Speak directly with our consultants.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  onClick={() =>
                    trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'faq_page' })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all text-white shadow-sm"
                  style={{ background: 'var(--accent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                >
                  Contact a Consultant <ArrowRight size={14} />
                </Link>
                <Link
                  to="/send-tender"
                  onClick={() =>
                    trackEvent(EVENTS.CTA_SEND_TENDER_CLICK, { location: 'faq_page' })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm transition-all"
                  style={{
                    background: 'var(--bg-subtle)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  Send a Tender for Review
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
