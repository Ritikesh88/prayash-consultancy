/**
 * High-fidelity SVG vector logos for major Indian Government procuring entities,
 * Central Ministries, and Maharatna/Navratna PSUs.
 */

export interface LogoProps {
  size?: number
  className?: string
  color?: string
}

// 1. GeM — Government e-Marketplace
export function GemLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#0D9488" />
      {/* GeM stylized lettermark */}
      <path
        d="M24 10C16.268 10 10 16.268 10 24s6.268 14 14 14c6.188 0 11.41-4.015 13.255-9.6H24v-6h19.5C43.83 23.01 44 23.5 44 24c0 11.046-8.954 20-20 20S4 35.046 4 24 12.954 4 24 4c5.523 0 10.523 2.239 14.142 5.858l-4.242 4.242C31.33 11.53 27.83 10 24 10z"
        fill="#FFFFFF"
      />
      <circle cx="34" cy="18" r="4" fill="#F59E0B" />
    </svg>
  )
}

// 2. Indian Railways
export function RailwaysLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#0369A1" />
      {/* Wheel and Locomotive silhouette */}
      <circle cx="24" cy="24" r="16" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="3 2" />
      <circle cx="24" cy="24" r="9" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M24 11v5M24 32v5M11 24h5M32 24h5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3.5" fill="#F59E0B" />
      <path d="M16 38h16" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// 3. NTPC Limited — National Thermal Power Corporation
export function NtpcLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#D97706" />
      {/* Dynamic energy spark & flame */}
      <path
        d="M26 8L13 26h9l-3 14 16-20h-10l5-12z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="24" r="18" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}

// 4. ONGC — Oil and Natural Gas Corporation
export function OngcLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#EA580C" />
      {/* Oil derrick and flame */}
      <path
        d="M24 10c-3 5-6 10-6 15a6 6 0 0012 0c0-5-3-10-6-15z"
        fill="#FEF08A"
      />
      <path
        d="M24 18c-1.5 2.5-3 5-3 7.5a3 3 0 006 0c0-2.5-1.5-5-3-7.5z"
        fill="#DC2626"
      />
      <path d="M14 40l10-14 10 14M17 35h14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// 5. BHEL — Bharat Heavy Electricals Limited
export function BhelLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#2563EB" />
      {/* Heavy turbine and electrical core */}
      <circle cx="24" cy="24" r="15" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M24 13v22M13 24h22M16 16l16 16M32 16L16 32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="6" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="24" cy="24" r="2.5" fill="#60A5FA" />
    </svg>
  )
}

// 6. DRDO — Defence Research and Development Organisation
export function DrdoLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#7C3AED" />
      {/* Defence shield with wings & radar */}
      <path
        d="M24 8l14 6v10c0 10-14 16-14 16S10 34 10 24V14l14-6z"
        fill="#6D28D9"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <path d="M24 16v14M17 23h14" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="23" r="3" fill="#F59E0B" />
    </svg>
  )
}

// 7. ISRO — Indian Space Research Organisation
export function IsroLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#047857" />
      {/* Satellite orbit and launch rocket */}
      <ellipse cx="24" cy="24" rx="17" ry="7" transform="rotate(-30 24 24)" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" />
      <path
        d="M24 8l5 12-5 3-5-3 5-12z"
        fill="#F59E0B"
      />
      <path
        d="M24 23l-3 15 3-2 3 2-3-15z"
        fill="#FFFFFF"
      />
      <circle cx="34" cy="14" r="3" fill="#34D399" />
    </svg>
  )
}

// 8. AIIMS — All India Institute of Medical Sciences
export function AiimsLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#BE185D" />
      {/* Medical rod of Asclepius and emblem */}
      <circle cx="24" cy="24" r="16" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M24 12v24M15 24h18" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="5" fill="#9D174D" />
      <path d="M21 24h6" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// 9. NHAI — National Highways Authority of India
export function NhaiLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#15803D" />
      {/* Highway perspective road lines */}
      <path d="M14 38L21 12h6l7 26H14z" fill="#166534" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M24 16v6M24 26v6M24 36v3" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="17" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}

// 10. DMRC — Delhi Metro Rail Corporation
export function DmrcLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#C026D3" />
      {/* DMRC metro transit monogram */}
      <circle cx="24" cy="24" r="15" stroke="#FFFFFF" strokeWidth="2" />
      <path
        d="M17 17h8a7 7 0 010 14h-8V17zm4 4v6h4a3 3 0 000-6h-4z"
        fill="#FFFFFF"
      />
      <circle cx="34" cy="24" r="2.5" fill="#FDE047" />
    </svg>
  )
}

// 11. IOCL — Indian Oil Corporation Limited
export function IoclLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#F97316" />
      {/* IndianOil circular roundel & saffron flame */}
      <circle cx="24" cy="24" r="16" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2.5" />
      <rect x="12" y="21" width="24" height="6" fill="#1E3A8A" />
      <circle cx="24" cy="15" r="4" fill="#FDE047" />
    </svg>
  )
}

// 12. Coal India Limited (CIL)
export function CilLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#334155" />
      {/* Coal crystal geometry */}
      <path
        d="M24 10l12 7v14l-12 7-12-7V17l12-7z"
        fill="#1E293B"
        stroke="#38BDF8"
        strokeWidth="2"
      />
      <path d="M24 10v28M12 17l24 14M36 17L12 31" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6" />
      <circle cx="24" cy="24" r="4" fill="#38BDF8" />
    </svg>
  )
}

// 13. BEL — Bharat Electronics Limited
export function BelLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#4338CA" />
      {/* Radar waves and silicon circuit */}
      <circle cx="24" cy="24" r="14" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="24" cy="24" r="8" stroke="#818CF8" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="#38BDF8" />
      <path d="M12 24h6M30 24h6M24 12v6M24 30v6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// 14. Ministry of Finance
export function MofLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#0F766E" />
      {/* Ashoka Chakra & pillar facade */}
      <path d="M14 36h20M16 36V22M21 36V22M27 36V22M32 36V22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 22l12-8 12 8H12z" fill="#115E59" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="24" cy="28" r="3.5" stroke="#FDE047" strokeWidth="1.5" />
    </svg>
  )
}

// 15. CPPP — Central Public Procurement Portal (eprocure.gov.in)
export function CpppLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#0284C7" />
      {/* National Tricolor ribbon arc + shield */}
      <path d="M8 12h32" stroke="#FF9933" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 17h32" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <path d="M8 22h32" stroke="#138808" strokeWidth="3" strokeLinecap="round" />
      <path d="M24 23l10 5v9c0 5-10 8-10 8s-10-3-10-8v-9l10-5z" fill="#0369A1" stroke="#FFFFFF" strokeWidth="1.5" />
      <path d="M20 33l3 3 5-6" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// 16. GePNIC — Government e-Procurement System of NIC
export function GepnicLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#4F46E5" />
      {/* Network nodes & digital certificate seal */}
      <circle cx="24" cy="24" r="15" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="24" cy="15" r="4" fill="#A5B4FC" />
      <circle cx="15" cy="30" r="4" fill="#A5B4FC" />
      <circle cx="33" cy="30" r="4" fill="#A5B4FC" />
      <path d="M24 19L15 26M24 19L33 26M19 30h10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="3" fill="#FDE047" />
    </svg>
  )
}

// 17. MSTC Limited — e-Commerce & e-Auctions
export function MstcLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#7E22CE" />
      {/* Gavel & dynamic marketplace arrows */}
      <circle cx="24" cy="24" r="16" stroke="#D8B4FE" strokeWidth="2" />
      <path d="M15 29l7-7 4 4-7 7-4-4z" fill="#FDE047" />
      <rect x="23" y="15" width="10" height="6" rx="1" transform="rotate(45 23 15)" fill="#FFFFFF" />
      <path d="M13 36h10" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// 18. IREPS — Indian Railways E-Procurement System
export function IrepsLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#0E7490" />
      {/* High-speed rail front & digital antenna */}
      <path d="M16 14h16l4 18H12l4-18z" fill="#155E75" stroke="#FFFFFF" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="19" cy="26" r="2.5" fill="#FEF08A" />
      <circle cx="29" cy="26" r="2.5" fill="#FEF08A" />
      <path d="M21 14V9h6v5M13 37h22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 20h.01" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

// 19. State eTenders — State Government Procurement Portals
export function StateTenderLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#059669" />
      {/* State pillar emblem & certified bid envelope */}
      <rect x="12" y="15" width="24" height="18" rx="2" fill="#047857" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M12 18l12 9 12-9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="38" r="3" fill="#FDE047" />
    </svg>
  )
}

// 20. Central PSU Portals — ONGC, BHEL, NTPC, IOCL E-Tender Desk
export function PsuPortalLogo({ size = 32, className = '' }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="48" height="48" rx="10" fill="#B45309" />
      {/* Industrial cog & energy nucleus */}
      <circle cx="24" cy="24" r="14" stroke="#FDE68A" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="24" cy="24" r="7" fill="#92400E" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="24" cy="24" r="2.5" fill="#F59E0B" />
      <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

