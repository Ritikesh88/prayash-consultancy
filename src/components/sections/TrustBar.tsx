import { useContent } from '@/context/ContentContext'
import SectionReveal from '@/components/ui/SectionReveal'

const icons = [
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
    </svg>
  ),
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  ),
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
]

export default function TrustBar() {
  const { content } = useContent()
  const values = content.trustBar || []

  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
      {/* Subtle micro-coordinate pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="container-main py-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {values.map((item, i) => {
            const Icon = icons[i]
            return (
              <SectionReveal key={item.title} delay={i * 40} direction="up">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5 lg:flex-col lg:items-start">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <div style={{ color: item.color }}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              </SectionReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
