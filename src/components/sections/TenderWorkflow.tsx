import SectionReveal from '@/components/ui/SectionReveal'

const stages = [
  {
    id: 'onboard',
    label: 'ONBOARD',
    desc: 'Portal registration & DSC set up',
    color: '#0D9488',
  },
  {
    id: 'discover',
    label: 'DISCOVER',
    desc: 'Matching tenders identified',
    color: '#0891B2',
  },
  {
    id: 'assess',
    label: 'ASSESS',
    desc: 'Eligibility & criteria checked',
    color: '#8B5CF6',
  },
  {
    id: 'prepare',
    label: 'PREPARE',
    desc: 'Documents & bid drafted',
    color: '#EC4899',
  },
  {
    id: 'submit',
    label: 'SUBMIT',
    desc: 'Bid submitted before deadline',
    color: '#F59E0B',
  },
  {
    id: 'track',
    label: 'TRACK',
    desc: 'Status monitored to award',
    color: '#10B981',
  },
]

export default function TenderWorkflow() {
  return (
    <section className="section-padding overflow-hidden" style={{ background: 'var(--bg-subtle)' }}>
      <div className="container-main">
        <SectionReveal>
          <div className="text-center mb-12">
            <div className="tag tag-accent mb-4 mx-auto w-fit">Standardized Workflow</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              The tender journey — end to end
            </h2>
            <p className="max-w-xl mx-auto text-base" style={{ color: 'var(--text-secondary)' }}>
              Every bid we manage moves through this disciplined six-stage pipeline with full status visibility.
            </p>
          </div>
        </SectionReveal>

        {/* Desktop: horizontal flow */}
        <div className="hidden lg:flex items-start gap-0">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex items-center flex-1">
              <div className="flex-1 flex flex-col items-center">
                {/* Stage box */}
                <div
                  className="w-full max-w-[140px] rounded-2xl p-4 border text-center transition-all duration-200 hover:-translate-y-1 cursor-default shadow-sm"
                  style={{
                    borderColor: `${stage.color}35`,
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <div
                    className="text-[11px] font-extrabold tracking-widest mb-2"
                    style={{ color: stage.color }}
                  >
                    {stage.label}
                  </div>
                  <div className="w-8 h-1 rounded-full mx-auto mb-2.5" style={{ backgroundColor: stage.color }} />
                  <p className="text-xs leading-snug font-medium" style={{ color: 'var(--text-muted)' }}>
                    {stage.desc}
                  </p>
                </div>
              </div>

              {/* Arrow connector */}
              {i < stages.length - 1 && (
                <div className="flex items-center flex-shrink-0 -mx-1 opacity-60">
                  <div className="w-5 h-0.5" style={{ background: 'var(--border-md)' }} />
                  <div
                    className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px]"
                    style={{ borderLeftColor: 'var(--border-md)' }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical flow */}
        <div className="lg:hidden flex flex-col gap-0 max-w-sm mx-auto">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex gap-4">
              {/* Left: line */}
              <div className="flex flex-col items-center">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                  style={{ backgroundColor: stage.color }}
                />
                {i < stages.length - 1 && (
                  <div className="w-0.5 flex-1 my-1" style={{ background: 'var(--border)' }} />
                )}
              </div>

              {/* Right: card */}
              <div
                className="flex-1 rounded-xl p-3.5 border mb-3 shadow-sm"
                style={{
                  borderColor: `${stage.color}35`,
                  backgroundColor: 'var(--bg-card)',
                }}
              >
                <div
                  className="text-xs font-bold tracking-wider mb-1"
                  style={{ color: stage.color }}
                >
                  {stage.label}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {stage.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
