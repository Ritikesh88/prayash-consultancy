import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/config/siteConfig'
import SendTenderSection from '@/components/sections/SendTenderSection'

const pageTitle = `Send Your Tender for Review | ${siteConfig.companyName}`
const pageDesc =
  'Share a tender document or bid number with our team. We will review the requirements and help you understand what it takes to participate.'

export default function SendTender() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/send-tender`} />
      </Helmet>

      <main style={{ background: 'var(--bg-base)' }}>
        <section className="pt-40 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container-main text-center">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Tender Review</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Found a tender? Send it to us.
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Share the tender document or bid number with our team. We'll review the core requirements, eligibility criteria, and help you understand the next steps.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-main max-w-3xl mx-auto">
            <SendTenderSection compact />
          </div>
        </section>
      </main>
    </>
  )
}
