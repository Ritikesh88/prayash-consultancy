import {
  GemLogo, CpppLogo, GepnicLogo, MstcLogo, IrepsLogo,
  StateTenderLogo, PsuPortalLogo,
} from '@/components/ui/governmentLogos'
import { useContent } from '@/context/ContentContext'

const logoLookup: Record<string, typeof GemLogo> = {
  GeM: GemLogo,
  CPPP: CpppLogo,
  GePNIC: GepnicLogo,
  MSTC: MstcLogo,
  IREPS: IrepsLogo,
  'State eTenders': StateTenderLogo,
  'PSU Portals': PsuPortalLogo,
}

export default function PortalTrustSection() {
  const { content } = useContent()
  const portals = content.portals || []
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {portals.map((portal) => {
            const Logo = logoLookup[portal.name] || GemLogo
            return (
              <div
                key={portal.name}
                className="flex flex-col justify-between p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-default select-none relative overflow-hidden"
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

                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 rounded-xl overflow-hidden shadow-xs border border-white/10">
                    <Logo size={36} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        {portal.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-xs opacity-75 truncate block" style={{ color: portal.color }}>
                      {portal.domain}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-[11px] font-medium line-clamp-1 mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {portal.full}
                  </p>
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
              </div>
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
