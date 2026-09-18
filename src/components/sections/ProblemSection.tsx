import SectionReveal from '@/components/ui/SectionReveal'

const problems = [
  { text: 'Complex eligibility criteria', color: '#EF4444' },
  { text: 'Multiple portal registrations', color: '#F97316' },
  { text: 'Missing document checklists', color: '#EF4444' },
  { text: 'Unclear bid requirements', color: '#F97316' },
  { text: 'Tender deadlines missed', color: '#EF4444' },
  { text: 'GeM and CPPP differences', color: '#F97316' },
  { text: 'DSC and token management', color: '#EF4444' },
  { text: 'EMD and bid security rules', color: '#F97316' },
  { text: 'Technical specification reading', color: '#EF4444' },
  { text: 'Pre-qualification confusions', color: '#F97316' },
]

const solutions = [
  { label: 'Eligibility Reviewed', color: '#10B981', icon: '✓' },
  { label: 'Document Checklist Built', color: '#0D9488', icon: '✓' },
  { label: 'Bid Prepared', color: '#0891B2', icon: '✓' },
  { label: 'Submitted on Time', color: '#8B5CF6', icon: '✓' },
]

export default function ProblemSection() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-base)' }}>
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — Problems */}
          <SectionReveal>
            <div>
              <div className="tag tag-amber mb-5 w-fit">The Challenge</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Government tenders are complex by design.
              </h2>
              <p className="mb-7 text-base" style={{ color: 'var(--text-secondary)' }}>
                Most businesses that could win government contracts don't bid — not because they
                aren't capable, but because the process is difficult to navigate without support.
              </p>

              {/* Problem cloud */}
              <div className="flex flex-wrap gap-2 mb-6">
                {problems.map((p) => (
                  <span
                    key={p.text}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border"
                    style={{
                      backgroundColor: `${p.color}10`,
                      borderColor: `${p.color}30`,
                      color: p.color,
                    }}
                  >
                    {p.text}
                  </span>
                ))}
              </div>

              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Each tender has unique requirements. Without familiarity, preparation takes
                weeks — and a small mistake can disqualify an otherwise competitive bid.
              </p>
            </div>
          </SectionReveal>

          {/* Right — Solution */}
          <SectionReveal delay={150}>
            <div
              className="rounded-2xl p-7 border"
              style={{
                background: 'var(--bg-card)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div className="tag tag-accent mb-5 w-fit">The Solution</div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                An outsourced tender desk for your business.
              </h3>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                Instead of learning procurement from scratch, you get a dedicated team that
                handles the process — so you can focus on delivering the work.
              </p>

              {/* Solution checkmarks */}
              <div className="flex flex-col gap-3 mb-6">
                {solutions.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border"
                    style={{
                      backgroundColor: `${s.color}0D`,
                      borderColor: `${s.color}25`,
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                      style={{ background: s.color }}
                    >
                      {s.icon}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="px-4 py-3 rounded-xl text-xs border"
                style={{
                  background: 'var(--bg-subtle)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                We don't guarantee wins. We improve your preparation, process and probability of
                a valid, competitive submission.
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
