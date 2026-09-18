import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Building2, Search, ClipboardCheck, FileText, Send, Award,
} from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'
import { servicesData } from '@/config/servicesData'
import { trackEvent, EVENTS } from '@/lib/analytics'
import FinalCTA from '@/components/sections/FinalCTA'
import SectionReveal from '@/components/ui/SectionReveal'

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  Building2,
  Search,
  ClipboardCheck,
  FileText,
  Send,
  Award,
}

const pageTitle = `Government Tender Consultancy Services | ${siteConfig.companyName}`
const pageDesc =
  'Comprehensive assistance across government procurement portals — GeM registration, tender discovery, eligibility assessment, bid documentation and submission support.'

export default function Services() {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={`${siteConfig.siteUrl}/services`} />
      </Helmet>

      <main style={{ background: 'var(--bg-base)' }}>
        {/* Header */}
        <section className="pt-40 pb-12" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container-main text-center">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Services</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              End-to-End Tender Desk Services
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Complete support across every stage of government procurement — from portal onboarding and discovery to preparation, submission, and post-award assistance.
            </p>
          </div>
        </section>

        {/* Services detail */}
        <section className="section-padding">
          <div className="container-main">
            <div className="flex flex-col gap-16">
              {servicesData.map((service, i) => {
                const Icon = iconMap[service.icon] ?? FileText
                const isEven = i % 2 === 0
                return (
                  <SectionReveal key={service.id} delay={i * 60}>
                    <div
                      id={service.id}
                      className={`flex flex-col lg:flex-row gap-10 items-start ${
                        !isEven ? 'lg:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Content */}
                      <div className="flex-1">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                          style={{
                            backgroundColor: 'var(--accent-dim)',
                            border: '1px solid var(--accent-border)',
                            color: 'var(--accent)',
                          }}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="tag tag-accent mb-3 w-fit text-[10px]">
                          Step {String(i + 1).padStart(2, '0')} of {servicesData.length}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                          {service.title}
                        </h2>
                        <p className="mb-6 leading-relaxed text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                          {service.description}
                        </p>
                        <Link
                          to="/contact"
                          onClick={() =>
                            trackEvent(EVENTS.CTA_CONSULTATION_CLICK, {
                              location: `service_page_${service.id}`,
                            })
                          }
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all text-white shadow-sm"
                          style={{ background: 'var(--accent)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                        >
                          {service.cta}
                          <ArrowRight size={15} />
                        </Link>
                      </div>

                      {/* Points card */}
                      <div
                        className="flex-1 rounded-2xl border p-7 sm:p-8 shadow-sm w-full"
                        style={{
                          backgroundColor: 'var(--bg-card)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        <p
                          className="text-xs font-bold uppercase tracking-widest mb-5"
                          style={{ color: 'var(--text-faint)' }}
                        >
                          Scope of Assistance
                        </p>
                        <ul className="flex flex-col gap-3.5">
                          {service.points.map((point) => (
                            <li key={point} className="flex items-start gap-3">
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: 'var(--accent)' }}
                              />
                              <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SectionReveal>
                )
              })}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
    </>
  )
}
