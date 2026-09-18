import { Users, Target, Archive, MessageSquare, Phone, Layers } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'

const differentiators = [
  {
    icon: Target,
    title: 'Practical over theoretical',
    desc: 'We focus on what needs to happen for a specific tender — exact documents, specific eligibility criteria, actual deadlines.',
    color: '#0D9488',
  },
  {
    icon: Users,
    title: 'Contractor-first',
    desc: 'We work backwards from your position as a contractor. What does your business need to do to participate?',
    color: '#0891B2',
  },
  {
    icon: Layers,
    title: 'Structured process',
    desc: 'Our service mirrors the structure of procurement — checklists, stages, document tracking and clear handoffs.',
    color: '#8B5CF6',
  },
  {
    icon: Archive,
    title: 'Document experience',
    desc: 'We know what documents are required for different tender types and can help you organise and prepare them.',
    color: '#EC4899',
  },
  {
    icon: MessageSquare,
    title: 'Clear communication',
    desc: 'We communicate plainly about what is needed, what is happening and what to expect. No jargon.',
    color: '#F59E0B',
  },
  {
    icon: Phone,
    title: 'Human access',
    desc: 'Speak directly with a tender professional over phone or WhatsApp when you need context or guidance.',
    color: '#10B981',
  },
]

export default function WhyUs() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-base)' }}>
      <div className="container-main">
        <SectionReveal>
          <div className="text-center mb-12">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Why Choose Us</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Why businesses work with us
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--text-secondary)' }}>
              We focus on the practical realities of government procurement — not generic advice.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {differentiators.map((item, i) => {
            const Icon = item.icon
            return (
              <SectionReveal key={item.title} delay={i * 80}>
                <div
                  className="rounded-2xl p-6 h-full border transition-all duration-250 hover:-translate-y-1 group cursor-default"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = `${item.color}40`
                    el.style.boxShadow = `0 8px 32px ${item.color}15`
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--border)'
                    el.style.boxShadow = 'var(--shadow-card)'
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {item.desc}
                  </p>
                  {/* Bottom accent line */}
                  <div
                    className="mt-4 h-0.5 rounded-full w-8 transition-all duration-300 group-hover:w-full"
                    style={{ background: `linear-gradient(to right, ${item.color}, transparent)` }}
                  />
                </div>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
