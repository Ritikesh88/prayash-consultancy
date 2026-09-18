/**
 * Portal Trust Section
 * Shows the government procurement portals supported.
 * Clean, modern badges with semantic theme variables.
 */

const portals = [
  { name: 'GeM', full: 'Government e-Marketplace', color: '#0D9488' },
  { name: 'CPPP', full: 'Central Public Procurement Portal', color: '#0891B2' },
  { name: 'GePNIC', full: 'NIC eProcurement System', color: '#6366F1' },
  { name: 'MSTC', full: 'PSU e-Auctions & Tenders', color: '#7C3AED' },
  { name: 'IREPS', full: 'Indian Railways Procurement', color: '#0D9488' },
  { name: 'PSU Portals', full: 'ONGC, BHEL, NTPC, IOCL', color: '#0891B2' },
  { name: 'State eTenders', full: 'State Govt Portals Nationwide', color: '#6366F1' },
]

export default function PortalTrustSection() {
  return (
    <section
      className="py-8 border-b"
      style={{
        background: 'var(--bg-subtle)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="container-main">
        <p
          className="text-center text-[11px] font-bold uppercase tracking-widest mb-5"
          style={{ color: 'var(--text-faint)' }}
        >
          Procurement Portals We Support
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {portals.map((portal) => (
            <div
              key={portal.name}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all duration-150 shadow-sm"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: portal.color }}
              />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                  {portal.name}
                </span>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  {portal.full}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] mt-4" style={{ color: 'var(--text-faint)' }}>
          Independent private consultancy providing guidance across government portals.
        </p>
      </div>
    </section>
  )
}
