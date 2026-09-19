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

        {/* ── Spotlight: 18-Year Ex-Govt Tender Drafter & Evaluator Inside Advantage ── */}
        <SectionReveal>
          <div
            className="mb-10 p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-lg"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'rgba(13, 148, 136, 0.4)',
              background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(13, 148, 136, 0.05) 100%)',
            }}
          >
            <div
              className="absolute -right-16 -top-16 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: '#0D9488' }}
            />

            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-3.5">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-extrabold uppercase tracking-wider"
                  style={{
                    backgroundColor: 'rgba(13, 148, 136, 0.12)',
                    borderColor: 'rgba(13, 148, 136, 0.35)',
                    color: 'var(--accent)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  The Unfair Competitive Advantage
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Why Our Win Rate Is Higher: 18 Years Working Inside Govt Tender Approval Committees
                </h3>

                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Most agencies guess what government officers want. At Prayash, your bids are reviewed and guided by a professional with <strong style={{ color: 'var(--text-primary)' }}>18+ years of experience dealing exclusively in government tenders</strong>, having worked directly inside government bodies and PSUs that <strong style={{ color: 'var(--text-primary)' }}>draft the tenders and approve the bids</strong>. He knows the tender process and winning rules from the inside out — ensuring our clients consistently beat rival bidders.
                </p>

                <div className="grid sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl border bg-black/5 dark:bg-white/5" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-xs font-bold text-accent mb-1">01. Inside Drafting Logic</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      We know how technical specs and qualification criteria are formulated by government officers.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border bg-black/5 dark:bg-white/5" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-xs font-bold text-[#10B981] mb-1">02. Disqualification Traps</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Pre-empt unwritten reasons why approval committees eliminate competing bids during scrutiny.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border bg-black/5 dark:bg-white/5" style={{ borderColor: 'var(--border)' }}>
                    <p className="text-xs font-bold text-amber-500 mb-1">03. Winning Bid Strategy</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      Aligning every affidavit, BOQ sheet, and technical submission with maximum scoring parameters.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'rgba(13, 148, 136, 0.3)',
                }}
              >
                <div className="relative mb-3">
                  <div className="w-20 h-20 rounded-2xl border-2 overflow-hidden shadow-md" style={{ borderColor: 'var(--accent)' }}>
                    <img src="/avatar-1.png" alt="Chief Government Tender Advisor" className="w-full h-full object-cover object-top" />
                  </div>
                  <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase text-white shadow-xs" style={{ background: '#0D9488' }}>
                    18+ Yrs
                  </span>
                </div>
                <h4 className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
                  Chief Tender Evaluator
                </h4>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Ex-Govt Tender Drafter & Committee Member
                </p>
                <div
                  className="mt-3 py-1.5 px-3 rounded-full text-[11px] font-bold border"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                    color: '#10B981',
                  }}
                >
                  Zero Technical Rejections Target
                </div>
              </div>
            </div>
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
