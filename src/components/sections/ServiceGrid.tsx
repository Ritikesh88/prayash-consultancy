import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Search, ClipboardCheck, FileText, Send, Award } from 'lucide-react'
import { trackEvent, EVENTS } from '@/lib/analytics'
import SectionReveal from '@/components/ui/SectionReveal'
import { useContent } from '@/context/ContentContext'

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  Building2,
  Search,
  ClipboardCheck,
  FileText,
  Send,
  Award,
}

export default function ServiceGrid() {
  const { content } = useContent()
  const servicesData = content.services || []
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Subtle blueprint crosshatch pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            radial-gradient(var(--text-primary) 1px, transparent 1px),
            linear-gradient(to right, var(--text-primary) 0.5px, transparent 0.5px),
            linear-gradient(to bottom, var(--text-primary) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '36px 36px, 36px 36px, 36px 36px',
        }}
      />
      <div className="container-main relative z-10">
        <SectionReveal>
          <div className="text-center mb-12">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Core Services</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Everything you need to participate with confidence.
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--text-secondary)' }}>
              From initial registration to post-award clearance — practical assistance across every stage of public procurement.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.map((service, i) => {
            const Icon = iconMap[service.icon] ?? FileText
            // Alternate fly-in paths: left, morph/up, right for dynamic 3D staging
            const direction = i % 3 === 0 ? 'left' : i % 3 === 1 ? 'morph' : 'right'
            return (
              <SectionReveal key={service.id} delay={i * 60} direction={direction}>
                <div
                  id={`service-${service.id}`}
                  className="card group flex flex-col h-full shadow-sm"
                  style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105"
                    style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
                  >
                    <Icon size={18} />
                  </div>

                  <h3 className="font-bold mb-1 text-base leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {service.title}
                  </h3>
                  <p className="text-xs mb-4 font-medium" style={{ color: 'var(--text-muted)' }}>
                    {service.subtitle}
                  </p>

                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: 'var(--accent)' }}
                        />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/services#${service.id}`}
                    onClick={() =>
                      trackEvent(EVENTS.CTA_CONSULTATION_CLICK, {
                        location: `service_card_${service.id}`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:gap-2.5 transition-all mt-auto"
                    style={{ color: 'var(--accent)' }}
                  >
                    {service.cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </SectionReveal>
            )
          })}
        </div>

        <SectionReveal delay={150}>
          <div className="text-center mt-12">
            <Link
              to="/services"
              onClick={() =>
                trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'service_grid_bottom' })
              }
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border font-semibold text-sm transition-all shadow-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              View Full Scope of Services
              <ArrowRight size={15} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
