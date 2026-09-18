import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/config/siteConfig'

const pageTitle = `Terms & Conditions | ${siteConfig.companyName}`
const pageDesc = `Terms and conditions for ${siteConfig.companyName} government tender consultancy services.`
const updated = 'September 2026'

export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/terms`} />
      </Helmet>

      <main className="pt-40 pb-20" style={{ background: 'var(--bg-base)' }}>
        <div className="container-main max-w-3xl mx-auto">
          <div className="tag tag-accent mb-4 w-fit">Legal Terms</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Terms & Conditions
          </h1>
          <p className="text-xs mb-10" style={{ color: 'var(--text-muted)' }}>
            Last updated: {updated}
          </p>

          <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Nature of Services</h2>
              <p>
                {siteConfig.companyName} provides professional assistance with government procurement and
                tender-related processes. Our services encompass vendor onboarding guidance,
                tender discovery, eligibility analysis, document compilation, and submission assistance.
              </p>
              <p className="mt-3">
                We are an independent private consultancy. We are not a government department,
                public procurement authority, or official representative of GeM, CPPP, MSTC, or state portals.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Zero Outcome Guarantees</h2>
              <p>
                Tender evaluations and awards are determined solely by the procuring authority based on statutory criteria, technical qualifications, and price bids.
                Our role is strictly advisory and operational; we do not guarantee L1 status, tender awards, or selection outcomes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Client Responsibilities</h2>
              <p>Clients are solely responsible for:</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>Providing authentic, legally valid company documents and financial records</li>
                <li>Retaining exclusive custody of portal passwords and Digital Signature (DSC) keys</li>
                <li>Final review and legal authorization of bids prior to submission</li>
                <li>Direct payment of official EMD, tender document fees, and performance guarantees</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Confidentiality</h2>
              <p>
                Commercial, financial, and pricing information disclosed during our advisory engagement is protected by strict commercial confidentiality obligations and will never be shared with competitors or unauthorized parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the Republic of India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Contact</h2>
              <p>
                For inquiries regarding these terms, reach our legal desk at{' '}
                <a href={siteConfig.emailHref} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>

            <div
              className="rounded-xl border p-5 text-xs leading-relaxed"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              These terms are provided for governance transparency and should be reviewed by qualified legal counsel prior to entering commercial consultancy contracts.
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
