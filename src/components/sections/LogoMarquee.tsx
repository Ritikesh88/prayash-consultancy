import type { ComponentType } from 'react'
import {
  GemLogo, RailwaysLogo, NtpcLogo, OngcLogo, BhelLogo, DrdoLogo,
  IsroLogo, AiimsLogo, NhaiLogo, DmrcLogo, IoclLogo, CilLogo,
  BelLogo, MofLogo,
} from '@/components/ui/governmentLogos'

interface BuyerItem {
  name: string
  fullName: string
  category: string
  badgeText: string
  color: string
  bg: string
  Logo: ComponentType<{ size?: number; className?: string }>
}

const row1: BuyerItem[] = [
  {
    name: 'GeM Portal',
    fullName: 'Government e-Marketplace',
    category: 'Central Procurement Portal',
    badgeText: 'Govt Portal',
    color: '#0D9488',
    bg: 'rgba(13,148,136,0.06)',
    Logo: GemLogo,
  },
  {
    name: 'Indian Railways',
    fullName: 'Ministry of Railways / IREPS',
    category: 'Rail Stores & Works',
    badgeText: 'Central Ministry',
    color: '#0369A1',
    bg: 'rgba(3,105,161,0.06)',
    Logo: RailwaysLogo,
  },
  {
    name: 'NTPC Limited',
    fullName: 'National Thermal Power Corp',
    category: 'Power & Infrastructure',
    badgeText: 'Maharatna PSU',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.06)',
    Logo: NtpcLogo,
  },
  {
    name: 'ONGC',
    fullName: 'Oil & Natural Gas Corp',
    category: 'Energy & Heavy Works',
    badgeText: 'Maharatna PSU',
    color: '#EA580C',
    bg: 'rgba(234,88,12,0.06)',
    Logo: OngcLogo,
  },
  {
    name: 'BHEL',
    fullName: 'Bharat Heavy Electricals',
    category: 'Engineering & Manufacturing',
    badgeText: 'Maharatna PSU',
    color: '#2563EB',
    bg: 'rgba(37,99,235,0.06)',
    Logo: BhelLogo,
  },
  {
    name: 'DRDO',
    fullName: 'Defence Research Organisation',
    category: 'Defence & Security R&D',
    badgeText: 'Defence Ministry',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.06)',
    Logo: DrdoLogo,
  },
  {
    name: 'Ministry of Finance',
    fullName: 'Department of Expenditure',
    category: 'Goods, Services & IT',
    badgeText: 'Central Ministry',
    color: '#0F766E',
    bg: 'rgba(15,118,110,0.06)',
    Logo: MofLogo,
  },
]

const row2: BuyerItem[] = [
  {
    name: 'ISRO',
    fullName: 'Indian Space Research Org',
    category: 'High-Tech & Materials',
    badgeText: 'Dept of Space',
    color: '#047857',
    bg: 'rgba(4,120,87,0.06)',
    Logo: IsroLogo,
  },
  {
    name: 'AIIMS',
    fullName: 'All India Inst of Medical Sciences',
    category: 'Healthcare & Supplies',
    badgeText: 'Apex Medical',
    color: '#BE185D',
    bg: 'rgba(190,24,93,0.06)',
    Logo: AiimsLogo,
  },
  {
    name: 'NHAI',
    fullName: 'National Highways Authority',
    category: 'Civil & Highway Roads',
    badgeText: 'Highway Authority',
    color: '#15803D',
    bg: 'rgba(21,128,61,0.06)',
    Logo: NhaiLogo,
  },
  {
    name: 'Delhi Metro (DMRC)',
    fullName: 'Delhi Metro Rail Corporation',
    category: 'Urban Transit & Systems',
    badgeText: 'Metro Rail PSU',
    color: '#C026D3',
    bg: 'rgba(192,38,211,0.06)',
    Logo: DmrcLogo,
  },
  {
    name: 'Indian Oil (IOCL)',
    fullName: 'Indian Oil Corporation',
    category: 'Petroleum & Logistics',
    badgeText: 'Maharatna PSU',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.06)',
    Logo: IoclLogo,
  },
  {
    name: 'Coal India (CIL)',
    fullName: 'Coal India Limited',
    category: 'Mining & Heavy Transport',
    badgeText: 'Maharatna PSU',
    color: '#475569',
    bg: 'rgba(71,85,105,0.06)',
    Logo: CilLogo,
  },
  {
    name: 'BEL',
    fullName: 'Bharat Electronics Limited',
    category: 'Defence Electronics & IT',
    badgeText: 'Navratna PSU',
    color: '#4338CA',
    bg: 'rgba(67,56,202,0.06)',
    Logo: BelLogo,
  },
]

function BuyerCard({ item }: { item: BuyerItem }) {
  const Logo = item.Logo
  return (
    <div
      className="flex items-center gap-3.5 px-5 py-3 rounded-2xl border flex-shrink-0 mx-2.5 transition-all duration-200 cursor-default select-none group shadow-xs hover:shadow-md hover:-translate-y-0.5"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex-shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-xs rounded-xl overflow-hidden">
        <Logo size={36} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-xs sm:text-sm font-extrabold tracking-tight whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
            {item.name}
          </p>
          <span
            className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm uppercase tracking-wide flex-shrink-0 border"
            style={{
              backgroundColor: `${item.color}14`,
              color: item.color,
              borderColor: `${item.color}30`,
            }}
          >
            {item.badgeText}
          </span>
        </div>
        <p className="text-[11px] whitespace-nowrap font-medium" style={{ color: 'var(--text-muted)' }}>
          {item.category}
        </p>
      </div>
    </div>
  )
}

const row1Doubled = [...row1, ...row1]
const row2Doubled = [...row2, ...row2]

export default function LogoMarquee() {
  return (
    <section
      className="py-16 overflow-hidden border-y relative"
      style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
    >
      {/* Subtle blueprint scanline pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '100% 28px',
        }}
      />
      <div className="container-main mb-10 text-center relative z-10">
        <div className="tag tag-accent mb-3 mx-auto w-fit">
          Government Opportunities
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Major Government Buyers Publishing Daily Tenders
        </h2>
        <p className="text-sm sm:text-base mt-2.5 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          We assist contractors, manufacturers, and MSMEs in discovering, qualifying, and bidding across leading Central Ministries, State Departments, and Maharatna PSUs.
        </p>
      </div>

      {/* Row 1 — Scrolls left */}
      <div className="relative mb-3.5 overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-subtle), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-subtle), transparent)' }}
        />
        <div className="marquee-track">
          {row1Doubled.map((item, i) => (
            <BuyerCard key={`r1-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2 — Scrolls right */}
      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-subtle), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-subtle), transparent)' }}
        />
        <div
          className="flex w-max"
          style={{ animation: 'marquee-left 52s linear infinite reverse' }}
        >
          {row2Doubled.map((item, i) => (
            <BuyerCard key={`r2-${i}`} item={item} />
          ))}
        </div>
      </div>

      <p
        className="text-center text-[11px] mt-8 max-w-xl mx-auto leading-relaxed"
        style={{ color: 'var(--text-faint)' }}
      >
        Buyer organizations shown represent official procurement bodies we assist clients in bidding for. Prayash Consultancy is an independent advisory firm.
      </p>
    </section>
  )
}
