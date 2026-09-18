import FAQAccordion from '@/components/ui/FAQAccordion'
import { faqData } from '@/config/faqData'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'

export default function FAQSection() {
  // Show first 6 on homepage
  const preview = faqData.slice(0, 6)

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Subtle geometric pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 100% 50%, transparent 20%, var(--text-primary) 21%, var(--text-primary) 34%, transparent 35%, transparent),
            radial-gradient(circle at 0% 50%, transparent 20%, var(--text-primary) 21%, var(--text-primary) 34%, transparent 35%, transparent)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      <div className="container-main relative z-10">
        <SectionReveal>
          <div className="text-center mb-12">
            <div className="tag tag-accent mb-4 mx-auto w-fit">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Common questions answered
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--text-secondary)' }}>
              Clear answers to the most frequent inquiries from contractors, suppliers, and MSMEs.
            </p>
          </div>
        </SectionReveal>

        <div className="max-w-3xl mx-auto mb-10">
          <FAQAccordion items={preview} />
        </div>

        <SectionReveal delay={100}>
          <div className="text-center">
            <Link
              to="/faqs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm transition-all shadow-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              Explore All Questions & Answers
              <ArrowRight size={14} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
