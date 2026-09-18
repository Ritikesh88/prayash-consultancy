import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, CheckCircle2, FileText, Clock, Send, Shield } from 'lucide-react'
import { whatsappUrl } from '@/config/siteConfig'
import { trackEvent, EVENTS } from '@/lib/analytics'

const workflowCards = [
  {
    icon: CheckCircle2,
    label: 'Eligibility Checked',
    value: 'Criteria reviewed ✓',
    status: 'done',
    color: '#10B981',
  },
  {
    icon: FileText,
    label: 'Documents',
    value: '8 of 10 ready',
    status: 'progress',
    color: '#F59E0B',
  },
  {
    icon: FileText,
    label: 'Technical Bid',
    value: 'Drafted & reviewed',
    status: 'active',
    color: '#0D9488',
  },
  {
    icon: Send,
    label: 'Submission',
    value: 'Due: 24 Sep 2026',
    status: 'pending',
    color: '#64748B',
  },
]

const portalsSupported = ['GeM', 'CPPP', 'GePNIC', 'State eTender', 'MSTC']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-24 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0" style={{ background: 'var(--bg-base)' }}>
        {/* Primary glow — top right */}
        <div
          className="absolute -top-20 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(13,148,136,0.12) 0%, transparent 70%)' }}
        />
        {/* Secondary glow — bottom left */}
        <div
          className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.08) 0%, transparent 70%)' }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(13,148,136,1) 1px, transparent 1px), linear-gradient(to right, rgba(13,148,136,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ── Left: Copy ── */}
          <div>
            {/* Tag */}
            <div className="tag tag-accent mb-6 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse" />
              Your Outsourced Government Tender Desk
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold mb-6 leading-[1.07] tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Government Tenders.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #2DD4BF 0%, #0D9488 50%, #0891B2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Managed From Start to Finish.
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              className="text-base sm:text-lg mb-6 max-w-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              From GeM registration and tender discovery to eligibility checks, documentation,
              bid preparation and submission support — practical assistance at every stage.
            </p>

            {/* Who we help */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Civil Contractors', 'Suppliers & Traders', 'Manufacturers', 'Service Providers', 'MSMEs'].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 rounded-full text-xs font-medium border shadow-xs"
                  style={{
                    color: 'var(--text-secondary)',
                    borderColor: 'var(--border)',
                    background: 'var(--bg-card)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                to="/contact"
                id="cta-hero-consultation"
                onClick={() => trackEvent(EVENTS.CTA_CONSULTATION_CLICK, { location: 'hero' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-white font-semibold text-sm transition-all duration-150 shadow-md"
                style={{ background: 'var(--accent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Get Tender Consultation
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/send-tender"
                id="cta-hero-send-tender"
                onClick={() => trackEvent(EVENTS.CTA_SEND_TENDER_CLICK, { location: 'hero' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm transition-all duration-150 border shadow-xs"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-border)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                Send Us a Tender
              </Link>
            </div>

            {/* Social proof avatar strip */}
            <div className="flex items-center gap-3 mt-6">
              {/* Stacked avatars */}
              <div className="flex -space-x-2.5">
                {['/avatar-1.png', '/avatar-2.png', '/avatar-3.png'].map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 overflow-hidden flex-shrink-0 shadow-sm"
                    style={{ borderColor: 'var(--bg-base)', zIndex: 3 - i }}
                  >
                    <img
                      src={src}
                      alt={`Client ${i + 1}`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                ))}
                {/* +N bubble */}
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm"
                  style={{ borderColor: 'var(--bg-base)', background: 'var(--accent)', color: '#fff', zIndex: 0 }}
                >
                  +12
                </div>
              </div>
              {/* Trust text */}
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#F59E0B">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  Trusted by contractors & MSMEs across India
                </p>
              </div>
            </div>

            {/* WhatsApp link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-hero-whatsapp"
              onClick={() => trackEvent(EVENTS.WHATSAPP_CLICK, { location: 'hero' })}
              className="inline-flex items-center gap-2 text-sm transition-colors mt-3"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#25D366')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <MessageCircle size={15} />
              <span>Or message our team on WhatsApp</span>
            </a>
          </div>

          {/* ── Right: Dashboard Visual ── */}
          <div className="relative hidden lg:block">
            {/* Outer glow */}
            <div
              className="absolute -inset-4 rounded-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 70%)',
              }}
            />

            {/* Dashboard card */}
            <div
              className="relative rounded-2xl shadow-xl overflow-hidden"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              {/* Top bar */}
              <div
                className="flex items-center justify-between px-5 py-3.5 border-b"
                style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
                  <span className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                    Active — Prayash Tender Desk
                  </span>
                </div>
                <Clock size={12} style={{ color: 'var(--text-faint)' }} />
              </div>

              <div className="p-6">
                {/* Tender header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-faint)' }}>
                      Current Workfile
                    </p>
                    <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                      Supply of Office Furniture &amp; Equipment
                    </h3>
                    <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      Ministry of Finance · GeM #2026-MOF-0881
                    </p>
                  </div>
                  <span className="tag tag-accent text-[9px] py-1 px-2.5 flex-shrink-0 mt-0.5">In Preparation</span>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    <span>Bid Readiness Status</span>
                    <span className="font-bold text-[#0D9488]">72%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: '72%',
                        background: 'linear-gradient(90deg, #0D9488, #2DD4BF)',
                      }}
                    />
                  </div>
                </div>

                {/* Stage cards */}
                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {workflowCards.map((card) => {
                    const Icon = card.icon
                    return (
                      <div
                        key={card.label}
                        className="rounded-xl p-3 border transition-colors"
                        style={{
                          borderColor:
                            card.status === 'done'
                              ? 'rgba(16,185,129,0.3)'
                              : card.status === 'active'
                                ? 'rgba(13,148,136,0.35)'
                                : card.status === 'progress'
                                  ? 'rgba(245,158,11,0.3)'
                                  : 'var(--border)',
                          backgroundColor:
                            card.status === 'done'
                              ? 'rgba(16,185,129,0.06)'
                              : card.status === 'active'
                                ? 'rgba(13,148,136,0.08)'
                                : card.status === 'progress'
                                  ? 'rgba(245,158,11,0.06)'
                                  : 'var(--bg-subtle)',
                        }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon size={12} style={{ color: card.color }} />
                          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                            {card.label}
                          </span>
                        </div>
                        <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {card.value}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Security note */}
                <div
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs"
                  style={{ backgroundColor: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
                >
                  <Shield size={12} className="text-[#0D9488] flex-shrink-0" />
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    Portal passwords and DSC private keys are strictly never requested.
                  </p>
                </div>

                {/* Portals supported */}
                <div className="flex items-center gap-2 mt-3.5 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>
                    Portals:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {portalsSupported.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-0.5 rounded text-[10px] font-bold border"
                        style={{
                          backgroundColor: 'var(--bg-subtle)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-3 -right-3 bg-[#0D9488] rounded-xl px-4 py-2 shadow-lg shadow-[#0D9488]/30">
              <p className="text-[11px] font-bold text-white uppercase tracking-wider">
                End-to-End Assistance
              </p>
            </div>

            {/* Floating badge — bottom left */}
            <div
              className="absolute -bottom-3 -left-3 rounded-xl px-4 py-2 shadow-lg border"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--accent-border)',
              }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                GeM · CPPP · State Portals
              </p>
            </div>
          </div>
        </div>

        {/* Mobile visual card */}
        <div
          className="mt-10 lg:hidden rounded-2xl border p-5 shadow-sm"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Active Tender Desk
            </span>
          </div>
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Supply of Office Furniture &amp; Equipment
          </p>
          <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
            Ministry of Finance · GeM #2026-MOF-0881
          </p>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div
                className="h-full w-[72%] rounded-full"
                style={{ background: 'linear-gradient(90deg, #0D9488, #2DD4BF)' }}
              />
            </div>
            <span className="text-xs font-bold text-[#0D9488]">72%</span>
          </div>
          <p className="text-[11px]" style={{ color: 'var(--text-faint)' }}>
            Bid Readiness Status · Submission due 24 Sep
          </p>
        </div>
      </div>
    </section>
  )
}
