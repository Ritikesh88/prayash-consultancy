import { Helmet } from 'react-helmet-async'
import { siteConfig } from '@/config/siteConfig'

const pageTitle = `Privacy Policy | ${siteConfig.companyName}`
const pageDesc = `Privacy policy and data protection information for ${siteConfig.companyName}.`
const updated = 'September 2026'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/privacy-policy`} />
      </Helmet>

      <main className="pt-40 pb-20" style={{ background: 'var(--bg-base)' }}>
        <div className="container-main max-w-3xl mx-auto">
          <div className="tag tag-accent mb-4 w-fit">Legal Policy</div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Privacy Policy
          </h1>
          <p className="text-xs mb-10" style={{ color: 'var(--text-muted)' }}>
            Last updated: {updated}
          </p>

          <div className="prose-content flex flex-col gap-8 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Introduction</h2>
              <p>
                {siteConfig.companyName} ("we", "us", "our") is an independent consultancy providing
                assistance with government procurement and tender-related processes. This Privacy
                Policy explains how we collect, use, and protect personal information provided
                through this website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Information We Collect</h2>
              <p>We collect information you provide directly, including:</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>Name, enterprise title, and contact details (mobile number, email address)</li>
                <li>Tender reference numbers and related procurement scope</li>
                <li>Tender documents uploaded voluntarily for eligibility evaluation</li>
                <li>Messages and query notes submitted through our digital desk forms</li>
              </ul>
              <p className="mt-3">
                <strong>Strict Zero-Storage Principle: </strong>We never collect or store government portal credentials, DSC private keys, passwords, or OTPs.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. How We Use Your Information</h2>
              <p>Your information is used strictly to:</p>
              <ul className="list-disc pl-5 mt-2 flex flex-col gap-1">
                <li>Respond to consultation requests and provide tender advisory</li>
                <li>Verify technical and financial eligibility against tender notifications</li>
                <li>Assist with preparing compliant bid documentation packages</li>
                <li>Improve our client services and website performance</li>
              </ul>
              <p className="mt-3">
                We do not sell, rent, or trade your personal or business data with any third parties.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Document Security</h2>
              <p>
                Tender documents uploaded through this website are treated with commercial confidentiality.
                Uploaded files are stored in restricted-access repositories accessible only to assigned tender specialists.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Data Retention</h2>
              <p>
                Information is retained only for the duration required to evaluate the tender or maintain ongoing client engagement. You may request immediate deletion of your records at any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Contact</h2>
              <p>
                For privacy or data requests, email us directly at{' '}
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
              This policy is provided for informational clarity and should be reviewed by your legal counsel prior to binding corporate engagement.
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
