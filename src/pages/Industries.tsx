import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/config/siteConfig'
import IndustriesSection from '@/components/sections/IndustriesSection'
import FinalCTA from '@/components/sections/FinalCTA'

const pageTitle = `Industries We Support | ${siteConfig.companyName}`
const pageDesc =
  'Tender assistance for civil contractors, IT companies, medical suppliers, manufacturers, MSMEs and service providers across all government procurement categories.'

export default function Industries() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/industries`} />
      </Helmet>

      <main style={{ background: 'var(--bg-base)' }}>
        <section className="pt-40 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container-main text-center">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Target Sectors</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Tender support across industries
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Government procurement encompasses thousands of product classifications and works contracts. Whatever your business supplies, our desk maps the right opportunities.
            </p>
          </div>
        </section>

        <IndustriesSection />
        <FinalCTA />
      </main>
    </>
  )
}
