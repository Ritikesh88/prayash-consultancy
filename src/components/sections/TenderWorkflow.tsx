import { useState, useEffect } from 'react'
import {
  KeyRound, Search, CheckCircle, FileSpreadsheet,
  UploadCloud, Trophy, ArrowRight, ShieldCheck, Zap
} from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import { useContent } from '@/context/ContentContext'

const defaultIcons = [KeyRound, Search, ShieldCheck, FileSpreadsheet, UploadCloud, Trophy]

export default function TenderWorkflow() {
  const { content } = useContent()
  const stages = (content.workflowStages || []).map((stage, idx) => ({
    ...stage,
    icon: defaultIcons[idx % defaultIcons.length],
  }))

  const [activeStage, setActiveStage] = useState(0)

  // Subtle cyclic highlight simulating left-to-right workflow progress
  useEffect(() => {
    if (stages.length === 0) return
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [stages.length])

  if (stages.length === 0) return null

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-subtle)' }}
    >
      {/* ── Subtle Background: Circuit / Fiber Grid ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, var(--accent) 1px, transparent 1px),
            linear-gradient(to right, var(--text-primary) 0.5px, transparent 0.5px),
            linear-gradient(to bottom, var(--text-primary) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '48px 48px, 48px 48px, 48px 48px',
        }}
      />

      <div className="container-main relative z-10">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider mb-4 shadow-xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-md)',
                color: 'var(--accent)',
              }}
            >
              <Zap size={13} className="animate-pulse" style={{ color: 'var(--accent)' }} />
              Dynamic Execution Pipeline
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              The tender journey — end to end
            </h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Every tender follows our continuous, zero-defect left-to-right verification pipeline to guarantee 100% compliance before digital sealing.
            </p>
          </div>
        </SectionReveal>

        {/* ── DESKTOP: Dynamic Left-to-Right Animated Pipeline ── */}
        <div className="hidden lg:block relative mb-12">
          {/* Continuous Glowing Flow Track running from Left to Right behind the cards */}
          <div className="absolute top-[42px] left-8 right-8 z-0 pointer-events-none">
            <div className="flow-track h-[3px]">
              {/* Dynamic traveling laser beam flowing left to right */}
              <div className="flow-beam" />
            </div>
          </div>

          {/* 6 Stage Stations */}
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {stages.map((stage, idx) => {
              const Icon = stage.icon
              const isCurrent = activeStage === idx

              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  onMouseEnter={() => setActiveStage(idx)}
                  className={`cursor-pointer transition-all duration-300 flex flex-col group ${
                    isCurrent ? '-translate-y-2' : 'hover:-translate-y-1'
                  }`}
                >
                  {/* Station Node / Number Bubble */}
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className={`relative w-11 h-11 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-md ${
                        isCurrent ? 'scale-110 shadow-lg' : 'group-hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: isCurrent ? stage.color : 'var(--bg-card)',
                        borderColor: isCurrent ? stage.color : 'var(--border-md)',
                        boxShadow: isCurrent ? `0 0 20px ${stage.color}60` : undefined,
                      }}
                    >
                      <Icon
                        size={20}
                        className="transition-colors duration-200"
                        style={{ color: isCurrent ? '#FFFFFF' : stage.color }}
                      />

                      {/* Small number pill on top */}
                      <span
                        className="absolute -top-2.5 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold border shadow-xs"
                        style={{
                          backgroundColor: 'var(--bg-base)',
                          color: stage.color,
                          borderColor: `${stage.color}50`,
                        }}
                      >
                        {stage.step}
                      </span>
                    </div>
                  </div>

                  {/* Stage Card */}
                  <div
                    className={`flex-1 rounded-2xl p-4 border flex flex-col justify-between transition-all duration-300 relative overflow-hidden backdrop-blur-sm shadow-xs ${
                      isCurrent ? 'shadow-xl' : 'hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: isCurrent ? stage.color : 'var(--border)',
                      boxShadow: isCurrent ? `0 8px 30px ${stage.color}20` : undefined,
                    }}
                  >
                    {/* Glowing indicator line on top of active card */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300"
                      style={{
                        backgroundColor: stage.color,
                        opacity: isCurrent ? 1 : 0.2,
                      }}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-[10px] font-black uppercase tracking-wider"
                          style={{ color: stage.color }}
                        >
                          {stage.label}
                        </span>
                        <span
                          className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border"
                          style={{
                            backgroundColor: `${stage.color}12`,
                            borderColor: `${stage.color}30`,
                            color: stage.color,
                          }}
                        >
                          Step {stage.step}
                        </span>
                      </div>

                      <h4
                        className="text-xs font-extrabold leading-snug mb-1.5 transition-colors"
                        style={{ color: isCurrent ? 'var(--text-primary)' : 'var(--text-primary)' }}
                      >
                        {stage.title}
                      </h4>

                      <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                        {stage.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
                      <div className="text-[9px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                        Key Deliverable:
                      </div>
                      <p className="text-[10px] font-medium leading-tight line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                        {stage.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Active Stage Detailed Spotlight Bar */}
          <div
            className="mt-6 rounded-2xl p-4 border flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: `${stages[activeStage].color}40`,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider text-white flex-shrink-0"
                style={{ backgroundColor: stages[activeStage].color }}
              >
                Stage {stages[activeStage].step} in Focus
              </span>
              <div>
                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stages[activeStage].title}
                </span>
                <span className="text-xs ml-2 hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>
                  — {stages[activeStage].deliverable}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                style={{
                  backgroundColor: `${stages[activeStage].color}12`,
                  borderColor: `${stages[activeStage].color}30`,
                  color: stages[activeStage].color,
                }}
              >
                SLA: {stages[activeStage].sla}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold" style={{ color: stages[activeStage].color }}>
                <span>Next</span>
                <ArrowRight size={13} />
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET: Vertical Flow with Dynamic Connecting Light ── */}
        <div className="lg:hidden flex flex-col gap-4 max-w-lg mx-auto">
          {stages.map((stage, idx) => {
            const Icon = stage.icon
            const isCurrent = activeStage === idx

            return (
              <div
                key={stage.id}
                onClick={() => setActiveStage(idx)}
                className="flex gap-4 items-start"
              >
                {/* Vertical timeline node */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs transition-all"
                    style={{
                      backgroundColor: isCurrent ? stage.color : 'var(--bg-card)',
                      borderColor: stage.color,
                    }}
                  >
                    <Icon size={16} style={{ color: isCurrent ? '#FFFFFF' : stage.color }} />
                  </div>
                  {idx < stages.length - 1 && (
                    <div
                      className="w-[2px] h-14 my-1"
                      style={{
                        background: isCurrent
                          ? `linear-gradient(to bottom, ${stage.color}, var(--border))`
                          : 'var(--border)',
                      }}
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-2xl p-4 border shadow-xs transition-all mb-2"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    borderColor: isCurrent ? stage.color : 'var(--border)',
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: stage.color }}>
                      Step {stage.step} · {stage.label}
                    </span>
                    <span className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {stage.sla}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {stage.title}
                  </h4>
                  <p className="text-xs leading-relaxed mb-2.5" style={{ color: 'var(--text-secondary)' }}>
                    {stage.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: stage.color }}>
                    <CheckCircle size={12} />
                    <span>{stage.deliverable}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
