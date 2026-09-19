import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Target, Users, BookOpen, Lock } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'
import SectionReveal from '@/components/ui/SectionReveal'

const values = [
  {
    icon: Target,
    title: 'Focused on Practical Execution',
    desc: 'We concentrate on what actually gets a bid submitted correctly — specific portal parameters, real checklists, and concrete requirements.',
  },
  {
    icon: Users,
    title: 'Contractor & MSME First',
    desc: 'Built specifically for businesses that want to bid on tenders but lack the dedicated internal back-office or bandwidth.',
  },
  {
    icon: BookOpen,
    title: 'Transparency at Every Step',
    desc: 'No vague promises or hidden processes. You know exactly what documents are needed, why they are required, and where your bid stands.',
  },
  {
    icon: Lock,
    title: 'Strict Security Principles',
    desc: 'We never ask for or store portal passwords, DSC private keys, or PINs. All authorization stays with the business owner.',
  },
]

const pageTitle = `About Us | ${siteConfig.companyName}`
const pageDesc =
  'Prayash Consultancy is an outsourced government tender desk helping contractors, suppliers, manufacturers and MSMEs navigate procurement portals.'

export default function About() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/about`} />
      </Helmet>

      <main style={{ background: 'var(--bg-base)' }}>
        {/* Header */}
        <section className="pt-40 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container-main">
            <div className="max-w-3xl">
              <div className="tag tag-accent mb-4 w-fit">About Us</div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                A dedicated tender desk for businesses that need to bid.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {siteConfig.companyName} operates as an outsourced government procurement team. We partner with contractors, suppliers, manufacturers, and MSMEs to systematically discover, evaluate, prepare, and submit tender bids across India.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Scope */}
        <section className="section-padding">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <SectionReveal>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    What we do — and our firm boundaries
                  </h2>
                  <div className="flex flex-col gap-6">
                    <div
                      className="p-6 rounded-2xl border shadow-sm"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                    >
                      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent)' }}>
                        What We Provide
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {[
                          'Vendor registration on GeM, CPPP, and state eTender portals',
                          'Targeted tender discovery based on your product/service catalogue',
                          'Technical and financial eligibility vetting before you invest effort',
                          'Preparation of non-collusion, solvency, and compliance affidavits',
                          'Technical bid compilation and portal upload assistance',
                          'Post-award documentation guidance and milestone tracking',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="p-6 rounded-2xl border shadow-sm"
                      style={{ backgroundColor: 'var(--bg-card)', borderColor: 'rgba(239,68,68,0.2)' }}
                    >
                      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--error)' }}>
                        What We Do Not Do
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {[
                          'We do not guarantee tender award or L1 status — bids are awarded by authorities on merit and price',
                          'We never store portal passwords, DSC private keys, or OTPs',
                          'We do not act as an agent of any ministry or government procurement entity',
                          'We do not provide legal opinions on disputes or litigation',
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--error)' }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={100}>
                <div className="flex flex-col gap-4">
                  {values.map((v) => {
                    const Icon = v.icon
                    return (
                      <div
                        key={v.title}
                        className="rounded-xl border p-5 shadow-sm transition-all"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                      >
                        <div className="flex items-start gap-3.5">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
                          >
                            <Icon size={18} />
                          </div>
                          <div>
                            <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                              {v.title}
                            </h3>
                            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                              {v.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* Leadership & Govt Pedigree */}
        <section className="py-14 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
          <div className="container-main max-w-4xl">
            <SectionReveal>
              <div
                className="p-8 sm:p-10 rounded-3xl border relative overflow-hidden shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'rgba(13, 148, 136, 0.35)',
                }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="relative flex-shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-2 overflow-hidden shadow-lg" style={{ borderColor: 'var(--accent)' }}>
                      <img src="/avatar-1.png" alt="Lead Consultant & Ex-Government Tender Evaluator" className="w-full h-full object-cover object-top" />
                    </div>
                    <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-xl text-xs font-black uppercase text-white shadow-sm" style={{ background: '#0D9488' }}>
                      18+ Yrs Exp
                    </span>
                  </div>

                  <div className="space-y-3 text-left">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-extrabold uppercase tracking-wider"
                      style={{
                        backgroundColor: 'rgba(13, 148, 136, 0.1)',
                        borderColor: 'rgba(13, 148, 136, 0.3)',
                        color: 'var(--accent)',
                      }}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      Our Leadership Pedigree
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      18+ Years Dealing Exclusively in Government Tenders
                    </h3>

                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      Our advisory desk is spearheaded by a principal consultant with 18+ years of career experience inside government enterprises and PSUs. Having personally drafted tender notices, set eligibility thresholds, and served on tender scrutiny and approval committees, he understands the evaluation mindset from the inside out.
                    </p>

                    <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-primary)' }}>
                      When Prayash reviews your tender bid, every document, solvency certificate, and BOQ line item is scrutinized through the eyes of the government committee that will award the contract — maximizing your winning probability above competing bidders.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container-main max-w-3xl">
            <div
              className="rounded-2xl border p-6 text-center"
              style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
            >
              <ShieldCheck size={20} className="mx-auto mb-2" style={{ color: 'var(--accent)' }} />
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Legal Independence Note: </strong>
                {siteConfig.companyName} is an independent, private consultancy. We are not a government agency, department, or portal operator. All official portals (GeM, CPPP, MSTC) are sovereign systems governed by the respective authorities.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="container-main text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Ready to bid with complete confidence?
            </h2>
            <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
              Discuss your company's product categories and target procurement opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                onClick={() => trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'about_page' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all text-white shadow-sm"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Get Tender Consultation <ArrowRight size={15} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm transition-all"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
