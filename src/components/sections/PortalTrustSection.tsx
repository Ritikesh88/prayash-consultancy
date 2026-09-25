import { ExternalLink } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  GemLogo, CpppLogo, GepnicLogo, MstcLogo, IrepsLogo,
  StateTenderLogo, PsuPortalLogo,
} from '@/components/ui/governmentLogos'
import { useContent } from '@/context/ContentContext'
import type { PortalItem } from '@/types/content'

const logoLookup: Record<string, typeof GemLogo> = {
  GeM: GemLogo,
  CPPP: CpppLogo,
  GePNIC: GepnicLogo,
  MSTC: MstcLogo,
  IREPS: IrepsLogo,
  'State eTenders': StateTenderLogo,
  'PSU Portals': PsuPortalLogo,
}

const defaultPortalUrls: Record<string, string> = {
  GeM: 'https://gem.gov.in',
  CPPP: 'https://eprocure.gov.in/eprocure/app',
  GePNIC: 'https://gepnic.gov.in',
  MSTC: 'https://www.mstcecommerce.com',
  IREPS: 'https://www.ireps.gov.in',
  'State eTenders': 'https://etenders.gov.in/eprocure/app',
  'PSU Portals': 'https://eprocure.gov.in/cppp/',
}

function resolvePortalUrl(portal: PortalItem): string {
  if (portal.url && portal.url.trim().length > 0) return portal.url
  if (defaultPortalUrls[portal.name]) return defaultPortalUrls[portal.name]
  if (portal.domain.startsWith('http')) return portal.domain
  return `https://${portal.domain}`
}

export default function PortalTrustSection() {
  const { content } = useContent()
  const portals = content.portals || []
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      className="py-12 border-b relative overflow-hidden"
      style={{
        background: 'var(--bg-subtle)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Subtle security mesh / circuit background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container-main relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider mb-3 shadow-xs"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-md)',
              color: 'var(--accent)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Verified Procurement Gateways
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Procurement Portals We Support
          </h3>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            End-to-end enrollment, document validation, BOQ compliance, and submission handling across India&apos;s apex digital procurement systems.
          </p>
          <p className="text-[11px] font-semibold mt-2 flex items-center justify-center gap-1 text-[#0D9488]">
            <span>Click any gateway card to visit the official portal in a new tab</span>
            <ExternalLink size={11} />
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {portals.map((portal, index) => {
            const Logo = logoLookup[portal.name] || GemLogo
            const targetUrl = resolvePortalUrl(portal)

            // Apple fluid motion spring animation: cards fly in smoothly from the left with subtle 3D depth
            // Configured with once: false so it repeats whenever scrolled into the visible frame
            const cardVariants = {
              hidden: shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, x: -55, rotateY: 10, scale: 0.96, transformPerspective: 900 },
              visible: shouldReduceMotion
                ? { opacity: 1, transition: { duration: 0.3, delay: index * 0.04 } }
                : {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    scale: 1,
                    transformPerspective: 900,
                    transition: {
                      type: 'spring' as const,
                      stiffness: 170,
                      damping: 24, // Critically damped
                      mass: 0.85,
                      delay: index * 0.065, // Apple-style organic stagger
                    },
                  },
            }

            const cardMotionProps = {
              initial: 'hidden',
              whileInView: 'visible',
              viewport: { once: false, amount: 0.25, margin: '0px 0px -40px 0px' },
              variants: cardVariants,
            }

            return (
              <motion.a
                key={portal.name}
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit official ${portal.name} portal (${portal.domain}) in a new tab`}
                {...cardMotionProps}
                whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { type: 'spring', stiffness: 350, damping: 25 } }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98, transition: { duration: 0.1 } }}
                className="flex flex-col justify-between p-4 rounded-2xl border transition-[border-color,box-shadow] duration-300 hover:shadow-xl group cursor-pointer select-none relative overflow-hidden text-left no-underline block"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Top subtle glow on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: portal.color }}
                />

                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 rounded-xl overflow-hidden shadow-xs border border-white/10">
                      <Logo size={36} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-extrabold tracking-tight group-hover:text-[#0D9488] transition-colors" style={{ color: 'var(--text-primary)' }}>
                          {portal.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-xs opacity-75 truncate block" style={{ color: portal.color }}>
                        {portal.domain}
                      </span>
                    </div>
                  </div>
                  <div
                    className="p-1 rounded-md opacity-40 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
                    style={{ color: portal.color }}
                    title="Opens official portal in new tab"
                  >
                    <ExternalLink size={13} />
                  </div>
                </div>

                <div className="mt-auto pt-2.5 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <p className="text-[11px] font-medium line-clamp-1 truncate" style={{ color: 'var(--text-secondary)' }}>
                      {portal.full}
                    </p>
                    <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex items-center gap-0.5" style={{ color: portal.color }}>
                      Visit ↗
                    </span>
                  </div>
                  <span
                    className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${portal.color}10`,
                      color: portal.color,
                      borderColor: `${portal.color}25`,
                    }}
                  >
                    {portal.status}
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>

        <p className="text-center text-[11px] mt-8" style={{ color: 'var(--text-faint)' }}>
          Prayash Consultancy is an independent advisory and bid preparation bureau. Portal names, trademarks, and sovereign logos belong to their respective authorities.
        </p>
      </div>
    </section>
  )
}
