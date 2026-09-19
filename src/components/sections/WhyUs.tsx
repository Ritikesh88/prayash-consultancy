import { ShieldCheck, Target, Layers, FileCheck, PhoneCall, Zap } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import { useContent } from '@/context/ContentContext'

const icons = [Target, Layers, FileCheck, Zap, ShieldCheck, PhoneCall]

export default function WhyUs() {
  const { content } = useContent()
  const differentiators = (content.whyUsItems || []).map((item, idx) => ({
    ...item,
    icon: icons[idx % icons.length],
  }))

  return (
    <section className="section-padding relative overflow-hidden" style={{ background: 'var(--bg-subtle)' }}>
      {/* Subtle diamond trellis pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, var(--text-primary) 1px, transparent 1px),
            linear-gradient(-45deg, var(--text-primary) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="container-main relative z-10">
        <SectionReveal>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="tag tag-accent mb-4 mx-auto w-fit">The Desk Advantage</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Built for Contractors Who Want to Win More Tenders
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              We don't offer generic advice. We act as your specialized government tender department so you can bid on bigger, higher-margin contracts.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((item, i) => {
            const Icon = item.icon
            return (
              <SectionReveal key={item.title} delay={i * 60}>
                <div
                  className="rounded-2xl p-7 h-full border transition-all duration-200 hover:-translate-y-1 group cursor-default shadow-xs hover:shadow-lg"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${item.color}50`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105"
                    style={{
                      backgroundColor: `${item.color}14`,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {item.desc}
                  </p>

                  <div
                    className="mt-5 h-0.5 rounded-full w-8 transition-all duration-300 group-hover:w-full"
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
