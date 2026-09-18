import { Link } from 'react-router-dom'
import { ArrowRight, HardHat, Zap, Monitor, HeartPulse, Shield, Users, Wrench, Factory, Package, Hammer, Briefcase } from 'lucide-react'
import { industriesData } from '@/config/industriesData'
import { trackEvent, EVENTS } from '@/lib/analytics'
import SectionReveal from '@/components/ui/SectionReveal'

const iconMap: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
  HardHat, Zap, Monitor, HeartPulse, Shield, Users, Wrench, Factory, Package, Hammer, Briefcase,
}

export default function IndustriesSection() {
  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {/* Subtle isometric technical grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] pattern-isometric" />
      <div className="container-main relative z-10">
        <SectionReveal>
          <div className="text-center mb-12">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Supported Sectors</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Tender assistance across every category
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--text-secondary)' }}>
              From civil infrastructure and healthcare to IT and manpower supply — our desk supports businesses across all procurement categories.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {industriesData.map((industry, i) => {
            const Icon = iconMap[industry.icon] ?? Briefcase
            return (
              <SectionReveal key={industry.id} delay={i * 40}>
                <div
                  className="flex flex-col gap-3 p-5 rounded-xl border transition-all duration-200 group h-full shadow-sm"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-border)'
                    e.currentTarget.style.boxShadow = '0 6px 20px var(--accent-dim)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
                    style={{
                      backgroundColor: 'var(--accent-dim)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: 'var(--text-primary)' }}>
                      {industry.title}
                    </h3>
                    <p className="text-xs leading-relaxed hidden sm:block" style={{ color: 'var(--text-muted)' }}>
                      {industry.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            )
          })}
        </div>

        {/* Category request box */}
        <SectionReveal delay={150}>
          <div
            className="rounded-2xl border p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
          >
            <div>
              <p className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                Don't see your specific product or service?
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Government tenders exist across thousands of niche categories. Message our team with your catalogue.
              </p>
            </div>
            <Link
              to="/contact"
              id="cta-industries-discuss"
              onClick={() =>
                trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'industries_section' })
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all flex-shrink-0 shadow-sm text-white"
              style={{ background: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
            >
              Discuss Your Sector
              <ArrowRight size={15} />
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
