import React from 'react'
import {
  Landmark, ShieldCheck, Zap, Hammer, Train, HeartPulse, Cpu, Flame,
  GraduationCap, HardHat, Wifi, Plane, Building, Compass, Anchor, Fuel,
  FlaskConical, Leaf, Cog
} from 'lucide-react'

/**
 * LogoMarquee — Auto-scrolling trust strip showing government buyer categories.
 * Uses clean SVG vector icons (no emojis per professional UI/UX standards).
 * Two rows scrolling in opposite directions for visual richness.
 */

interface BadgeItem {
  name: string
  sub: string
  color: string
  bg: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const row1: BadgeItem[] = [
  { name: 'Ministry of Finance', sub: 'Central Government', color: '#0D9488', bg: 'rgba(13,148,136,0.08)', icon: Landmark },
  { name: 'DRDO', sub: 'Defence Research', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', icon: ShieldCheck },
  { name: 'NTPC Limited', sub: 'Power Sector PSU', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', icon: Zap },
  { name: 'NMDC', sub: 'Mining PSU', color: '#10B981', bg: 'rgba(16,185,129,0.08)', icon: Hammer },
  { name: 'Delhi Metro Rail', sub: 'Urban Transit', color: '#0891B2', bg: 'rgba(8,145,178,0.08)', icon: Train },
  { name: 'AIIMS', sub: 'Healthcare', color: '#EC4899', bg: 'rgba(236,72,153,0.08)', icon: HeartPulse },
  { name: 'BEL', sub: 'Electronics PSU', color: '#6366F1', bg: 'rgba(99,102,241,0.08)', icon: Cpu },
  { name: 'ONGC', sub: 'Oil & Gas PSU', color: '#F97316', bg: 'rgba(249,115,22,0.08)', icon: Flame },
  { name: 'NIT / IIT', sub: 'Educational Institutes', color: '#14B8A6', bg: 'rgba(20,184,166,0.08)', icon: GraduationCap },
  { name: 'State PWD Depts', sub: 'Public Works', color: '#84CC16', bg: 'rgba(132,204,22,0.08)', icon: HardHat },
]

const row2: BadgeItem[] = [
  { name: 'Indian Railways', sub: 'Rail Infrastructure', color: '#0891B2', bg: 'rgba(8,145,178,0.08)', icon: Train },
  { name: 'BSNL', sub: 'Telecom PSU', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)', icon: Wifi },
  { name: 'HAL', sub: 'Aerospace PSU', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', icon: Plane },
  { name: 'Municipal Corps', sub: 'Urban Local Bodies', color: '#10B981', bg: 'rgba(16,185,129,0.08)', icon: Building },
  { name: 'Border Roads Org.', sub: 'Infrastructure', color: '#0D9488', bg: 'rgba(13,148,136,0.08)', icon: Compass },
  { name: 'Port Trusts', sub: 'Maritime / Ports', color: '#6366F1', bg: 'rgba(99,102,241,0.08)', icon: Anchor },
  { name: 'IOCL / HPCL', sub: 'Oil Marketing PSU', color: '#F97316', bg: 'rgba(249,115,22,0.08)', icon: Fuel },
  { name: 'CSIR Labs', sub: 'Research Institutes', color: '#EC4899', bg: 'rgba(236,72,153,0.08)', icon: FlaskConical },
  { name: 'Zila Parishads', sub: 'Rural Local Bodies', color: '#84CC16', bg: 'rgba(132,204,22,0.08)', icon: Leaf },
  { name: 'CIL / Coal India', sub: 'Mining PSU', color: '#14B8A6', bg: 'rgba(20,184,166,0.08)', icon: Cog },
]

function Badge({ item }: { item: BadgeItem }) {
  const Icon = item.icon
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl border flex-shrink-0 mx-2 group hover:scale-[1.03] transition-all duration-200 cursor-default select-none shadow-sm"
      style={{
        backgroundColor: item.bg,
        borderColor: `${item.color}35`,
        boxShadow: `0 2px 10px ${item.color}10`,
      }}
    >
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          backgroundColor: `${item.color}18`,
          color: item.color,
        }}
      >
        <Icon size={15} />
      </div>
      <div>
        <p className="text-xs font-bold whitespace-nowrap leading-tight" style={{ color: item.color }}>
          {item.name}
        </p>
        <p className="text-[10px] whitespace-nowrap mt-0.5" style={{ color: 'var(--text-faint)' }}>
          {item.sub}
        </p>
      </div>
    </div>
  )
}

// Doubled lists for smooth infinite loop
const row1Doubled = [...row1, ...row1]
const row2Doubled = [...row2, ...row2]

export default function LogoMarquee() {
  return (
    <section
      className="py-14 overflow-hidden border-y"
      style={{ background: 'var(--bg-subtle)', borderColor: 'var(--border)' }}
    >
      <div className="container-main mb-8 text-center">
        <div className="tag tag-blue mb-3 mx-auto w-fit">
          Government Opportunities
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Thousands of Government Buyers Publish Tenders Every Day
        </h2>
        <p className="text-sm mt-2 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
          Central ministries, PSUs, defence, healthcare, railway, urban bodies, and state departments.
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-3 overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-subtle), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-subtle), transparent)' }}
        />
        <div className="marquee-track">
          {row1Doubled.map((item, i) => (
            <Badge key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--bg-subtle), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-subtle), transparent)' }}
        />
        <div
          className="flex w-max"
          style={{ animation: 'marquee-left 50s linear infinite reverse' }}
        >
          {row2Doubled.map((item, i) => (
            <Badge key={i} item={item} />
          ))}
        </div>
      </div>

      <p
        className="text-center text-[11px] mt-6"
        style={{ color: 'var(--text-faint)' }}
      >
        Buyer organizations shown are procurement categories we help contractors and MSMEs pursue. Independent consultancy.
      </p>
    </section>
  )
}
