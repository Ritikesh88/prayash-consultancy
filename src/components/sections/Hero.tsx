import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, MessageCircle, CheckCircle2, Shield,
  Clock, UploadCloud, ChevronRight, Check,
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

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-8">
              <Link
                to="/contact"
                id="cta-hero-consultation"
                onClick={() => trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'hero' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-200"
                style={{ background: 'var(--accent)', boxShadow: '0 8px 24px var(--accent-glow)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                {hero.primaryCtaText}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/send-tender"
                id="cta-hero-send-tender"
                onClick={() => trackEvent(EVENTS.CTA_SEND_TENDER_CLICK, { location: 'hero' })}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border font-bold text-sm transition-all duration-200 shadow-xs"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <UploadCloud size={16} style={{ color: 'var(--accent)' }} />
                {hero.secondaryCtaText}
              </Link>
            </div>

            {/* Social proof & Indian contractor avatars */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex -space-x-2.5">
                {['/avatar-1.png', '/avatar-2.png', '/avatar-3.png'].map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 overflow-hidden flex-shrink-0 shadow-sm"
                    style={{ borderColor: 'var(--bg-base)', zIndex: 3 - i }}
                  >
                    <img
                      src={src}
                      alt={`Indian contractor client ${i + 1}`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                ))}
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-black shadow-sm text-white"
                  style={{ borderColor: 'var(--bg-base)', background: 'var(--accent)' }}
                >
                  +120
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-amber-400 text-sm">★</span>
                  ))}
                  <span className="text-xs font-bold ml-1" style={{ color: 'var(--text-primary)' }}>
                    4.9 / 5
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Trusted by contractors & MSME suppliers across India
                </p>
              </div>

              {/* Direct WhatsApp link */}
              <a
                href={`https://wa.me/${siteInfo.whatsapp}?text=Hello%20Prayash%20Consultancy%2C%20I%20need%20assistance%20with%20a%20government%20tender.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'hero_proof' })}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
                style={{ color: '#25D366' }}
              >
                <MessageCircle size={14} />
                Quick WhatsApp Inquiry
              </a>
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

                {/* Tender Tabs */}
                <div className="flex border-b overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
                  {tenderTabs.map((tab, i) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(i)}
                      className="px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2"
                      style={{
                        borderColor: activeTab === i ? 'var(--accent)' : 'transparent',
                        color: activeTab === i ? 'var(--accent)' : 'var(--text-muted)',
                        backgroundColor: activeTab === i ? 'var(--accent-dim)' : 'transparent',
                      }}
                    >
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
