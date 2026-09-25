import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, MessageCircle, CheckCircle2, Shield,
  Clock, ChevronRight, Check,
  Landmark, ShieldCheck, FileSearch, TrendingUp,
} from 'lucide-react'
import { trackEvent, EVENTS } from '@/lib/analytics'
import SectionReveal from '@/components/ui/SectionReveal'
import { useContent } from '@/context/ContentContext'

export default function Hero() {
  const { content } = useContent()
  const hero = content.hero
  const siteInfo = content.siteInfo
  const tenderTabs = hero.tabs && hero.tabs.length > 0 ? hero.tabs : [
    { id: 'gem', label: 'GeM Bid #894120', agency: 'Ministry of Defence (MES)', value: '₹4.20 Cr', readiness: 94 },
    { id: 'cppp', label: 'CPPP Tender #44192', agency: 'Indian Railways (CRIS)', value: '₹1.85 Cr', readiness: 88 },
    { id: 'state', label: 'State eTender #1082', agency: 'PWD Rajasthan', value: '₹6.50 Cr', readiness: 76 },
  ]

  const [activeTab, setActiveTab] = useState(0)
  const currentTender = tenderTabs[activeTab] || tenderTabs[0]

  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* ── Background: Architectural Hairline Grid + Chromatic Glow ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--bg-base)' }}>
        {/* Subtle dot matrix grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Subtle, barely visible Indian professional consultancy watermark overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.035] mix-blend-luminosity filter contrast-125"
          style={{
            backgroundImage: 'url(/indian-professionals.png)',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 85%)',
          }}
        />
        {/* Top-right ambient lighting */}
        <div
          className="absolute -top-40 right-[-10%] w-[650px] h-[650px] rounded-full blur-[120px] opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #0D9488 0%, #0891B2 60%, transparent 80%)' }}
        />
        {/* Bottom-left subtle glow */}
        <div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* ── LEFT: High-Impact Editorial Copy (7 cols) ── */}
          <div className="lg:col-span-7">
            {/* Trust badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 shadow-xs"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--accent-border)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-bold tracking-wide" style={{ color: 'var(--accent)' }}>
                {hero.badgeLabel}
              </span>
              <span style={{ color: 'var(--border-md)' }}>·</span>
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {hero.badgeSub}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.65rem] font-extrabold mb-6 leading-[1.08] tracking-[-0.03em]"
              style={{ color: 'var(--text-primary)' }}
            >
              {hero.headline}{' '}
              <span
                className="block mt-1"
                style={{
                  background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 50%, #6366F1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {hero.headlineAccent}
              </span>
            </h1>

            {/* Value Statement */}
            <p
              className="text-base sm:text-lg mb-8 max-w-xl leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {hero.subheadline}
            </p>

            {/* Key Value Metric Pills */}
            <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg">
              <div
                className="p-3 rounded-xl border text-center"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <p className="text-lg sm:text-xl font-black" style={{ color: 'var(--accent)' }}>{hero.metric1Number}</p>
                <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{hero.metric1Label}</p>
              </div>
              <div
                className="p-3 rounded-xl border text-center"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <p className="text-lg sm:text-xl font-black" style={{ color: '#10B981' }}>{hero.metric2Number}</p>
                <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{hero.metric2Label}</p>
              </div>
              <div
                className="p-3 rounded-xl border text-center"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                <p className="text-lg sm:text-xl font-black" style={{ color: 'var(--text-primary)' }}>{hero.metric3Number}</p>
                <p className="text-[11px] font-medium" style={{ color: 'var(--text-muted)' }}>{hero.metric3Label}</p>
              </div>
            </div>

            {/* ── Chief Consultant / Ex-Govt Tender Evaluator Authority Card (matching provided design) ── */}
            <div
              className="p-5 sm:p-6 rounded-2xl border mb-6 relative overflow-hidden transition-all duration-300 shadow-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'rgba(13, 148, 136, 0.28)',
                boxShadow: '0 4px 24px -2px rgba(13, 148, 136, 0.08)',
              }}
            >
              {/* Header row with Avatar + Tags + Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative flex-shrink-0">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 overflow-hidden shadow-md"
                    style={{ borderColor: 'var(--accent)' }}
                  >
                    <img
                      src="/avatar-1.png"
                      alt="Chief Consultant - Ex-Government Tender Expert & Committee Approver"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase text-white shadow-xs whitespace-nowrap"
                    style={{ background: '#0D9488' }}
                  >
                    18+ Yrs
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap mb-1">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: 'rgba(13, 148, 136, 0.1)',
                        borderColor: 'rgba(13, 148, 136, 0.3)',
                        color: 'var(--accent)',
                      }}
                    >
                      ★ EX-GOVT INSIDER ADVANTAGE
                    </span>
                    <span className="text-gray-300 dark:text-neutral-700 hidden sm:inline">|</span>
                    <span className="text-[11px] font-semibold" style={{ color: 'var(--accent)' }}>
                      18+ Years in Govt Tenders Only
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight leading-snug" style={{ color: 'var(--text-primary)' }}>
                    Guided by an Experienced Ex-Government Tender Expert & Committee Approver
                  </h3>
                </div>
              </div>

              {/* Main Copy */}
              <p className="text-xs sm:text-[13px] leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                Our team is personally guided by a senior consultant who has 18+ years of experience in government enterprises, working directly with tender committees, procurement processes and evaluation frameworks. With first-hand knowledge of how tenders are scrutinized and approved, we help your business navigate the entire process with confidence — ensuring compliance, higher win probabilities and better outcomes.
              </p>

              {/* 4 Feature Value Badges Grid */}
              <div
                className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-3 rounded-xl border mb-5"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* 1. 18+ Years in Govt Tenders */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-xs"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    <Landmark size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      18+ Years
                    </p>
                    <p className="text-[10px] leading-tight" style={{ color: 'var(--text-muted)' }}>
                      in Govt Tenders
                    </p>
                  </div>
                </div>

                {/* 2. Ex-Government Experience */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-xs"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    <ShieldCheck size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      Ex-Government Experience
                    </p>
                    <p className="text-[10px] leading-tight truncate" style={{ color: 'var(--text-muted)' }}>
                      Direct Committee & Procurement Insight
                    </p>
                  </div>
                </div>

                {/* 3. Proven Tender Strategy */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-xs"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    <FileSearch size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      Proven Tender Strategy
                    </p>
                    <p className="text-[10px] leading-tight truncate" style={{ color: 'var(--text-muted)' }}>
                      Compliance, Clarity & Stronger Bids
                    </p>
                  </div>
                </div>

                {/* 4. Higher Chances of Winning */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white shadow-xs"
                    style={{ backgroundColor: '#0D9488' }}
                  >
                    <TrendingUp size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      Higher Chances of Winning
                    </p>
                    <p className="text-[10px] leading-tight truncate" style={{ color: 'var(--text-muted)' }}>
                      With Expert Guidance
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs matching the image layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Link
                    to="/contact"
                    id="cta-hero-consultation"
                    onClick={() => trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'hero_chief_card' })}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md w-full transition-all"
                    style={{
                      background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
                      boxShadow: '0 4px 14px rgba(13, 148, 136, 0.25)',
                    }}
                  >
                    <span>Get Free Tender Consultation</span>
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <Link
                    to="/send-tender"
                    id="cta-hero-send-tender"
                    onClick={() => trackEvent(EVENTS.CTA_SEND_TENDER_CLICK, { location: 'hero_chief_card' })}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border font-bold text-xs sm:text-sm shadow-xs w-full transition-all"
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      borderColor: 'rgba(13, 148, 136, 0.45)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <MessageCircle size={15} style={{ color: '#0D9488' }} />
                    <span>Send Tender for Feasibility Review</span>
                  </Link>
                </motion.div>
              </div>

              {/* Bottom social proof & Quick WhatsApp inquiry matching image */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['/avatar-1.png', '/avatar-2.png', '/avatar-3.png'].map((src, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border-2 overflow-hidden flex-shrink-0 shadow-xs"
                        style={{ borderColor: 'var(--bg-card)', zIndex: 3 - i }}
                      >
                        <img
                          src={src}
                          alt={`Indian contractor ${i + 1}`}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    ))}
                    <div
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-[10px] font-black shadow-xs text-white"
                      style={{ borderColor: 'var(--bg-card)', background: '#0D9488' }}
                    >
                      120+
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-400 text-xs">
                        {'★★★★★'}
                      </div>
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                        4.9 / 5
                      </span>
                    </div>
                    <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      Trusted by Contractors & MSME suppliers across India
                    </p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${siteInfo.whatsapp}?text=Hello%20Prayash%20Consultancy%2C%20I%20need%20assistance%20with%20a%20government%20tender.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'hero_chief_card' })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                  style={{ color: '#0D9488' }}
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>Quick WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Sleek Tender Operations Console (5 cols) ── */}
          <div className="lg:col-span-5">
            <SectionReveal delay={100}>
              <div
                className="relative rounded-3xl border shadow-2xl overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Window header */}
                <div
                  className="flex items-center justify-between px-5 py-3.5 border-b select-none"
                  style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-bold uppercase tracking-wider ml-1" style={{ color: 'var(--text-muted)' }}>
                      Tender Desk Terminal
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                    <span className="text-[11px] font-bold text-[#10B981]">LIVE</span>
                  </div>
                </div>

                {/* Tender Tabs with Apple fluid spring sliding pill */}
                <div className="flex border-b overflow-x-auto p-1.5 gap-1" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card-alt)' }}>
                  {tenderTabs.map((tab, i) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(i)}
                      className="relative px-3.5 py-2 text-xs font-semibold whitespace-nowrap rounded-lg transition-colors z-10"
                      style={{
                        color: activeTab === i ? 'var(--text-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {activeTab === i && (
                        <motion.div
                          layoutId="activeHeroTab"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          className="absolute inset-0 rounded-lg shadow-xs"
                          style={{
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border-md)',
                            zIndex: -1,
                          }}
                        />
                      )}
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Terminal Content */}
                <div className="p-6">
                  {/* Tender Spec Card */}
                  <div
                    className="p-4 rounded-2xl border mb-5 shadow-xs"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0891B2]">
                          {currentTender.agency}
                        </span>
                        <h3 className="text-sm font-bold mt-0.5" style={{ color: 'var(--text-primary)' }}>
                          Supply of High-Capacity Inverters &amp; Batteries
                        </h3>
                      </div>
                      <span className="text-xs font-black px-2.5 py-1 rounded-md text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/25">
                        {currentTender.value}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-3 mt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                      <div>
                        <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>EMD Status</p>
                        <p className="font-bold text-[#10B981] flex items-center gap-1 mt-0.5">
                          <Check size={12} /> MSME Exempted
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>Submission Due</p>
                        <p className="font-bold flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-primary)' }}>
                          <Clock size={12} style={{ color: 'var(--accent)' }} /> 04 Oct 2026
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Readiness Progress Meter */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                        Bid Compilation Readiness
                      </span>
                      <span className="font-black text-sm" style={{ color: 'var(--accent)' }}>
                        {currentTender.readiness}% Complete
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${currentTender.readiness}%`,
                          background: 'linear-gradient(90deg, #0D9488 0%, #10B981 100%)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Operational Checklist */}
                  <div className="space-y-2 mb-5">
                    {[
                      { text: 'Technical specifications compliance sheet matched', status: true },
                      { text: 'CA audited turnover & solvency certificates verified', status: true },
                      { text: 'Past work orders & performance credentials attached', status: true },
                      { text: 'Final BoQ financial pricing matrix verification', status: currentTender.readiness > 80 },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs p-2 rounded-lg"
                        style={{
                          backgroundColor: item.status ? 'var(--accent-dim)' : 'var(--bg-subtle)',
                        }}
                      >
                        {item.status ? (
                          <CheckCircle2 size={14} className="flex-shrink-0 text-[#10B981]" />
                        ) : (
                          <Clock size={14} className="flex-shrink-0 text-amber-500" />
                        )}
                        <span
                          className="font-medium truncate"
                          style={{ color: item.status ? 'var(--text-primary)' : 'var(--text-muted)' }}
                        >
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Strict Security Note */}
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-[11px]"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                  >
                    <Shield size={14} className="text-[#0D9488] flex-shrink-0" />
                    <p style={{ color: 'var(--text-muted)' }}>
                      <strong>Security First: </strong>DSC private keys and portal passwords are never requested.
                    </p>
                  </div>
                </div>

                {/* Bottom console footer */}
                <div
                  className="px-6 py-3 border-t flex items-center justify-between text-xs"
                  style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>Have a live tender?</span>
                  <Link
                    to="/send-tender"
                    className="font-bold flex items-center gap-1 hover:underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    Send tender for free review <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
