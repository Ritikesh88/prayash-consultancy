import { useState, useEffect } from 'react'
import { Radio } from 'lucide-react'

/**
 * TenderTicker — scrolling marquee with live-style tender activity updates.
 * Automatically slides up and hides once the user scrolls down past the hero section.
 */

const updates = [
  { label: 'GeM', text: 'New tenders published across IT & electronics category', color: '#0D9488' },
  { label: 'CPPP', text: 'Civil works tenders updated — Ministry of Housing', color: '#0891B2' },
  { label: 'GeM', text: 'MSME-exclusive opportunities available in stationery & supplies', color: '#0D9488' },
  { label: 'Rajasthan', text: 'State eTender portal: Infrastructure & roads tenders open', color: '#8B5CF6' },
  { label: 'MSTC', text: 'Reverse auction scheduled for medical equipment supply', color: '#EC4899' },
  { label: 'GeM', text: 'Security services tenders: Multiple PSU buyers active', color: '#0D9488' },
  { label: 'CPPP', text: 'Manpower supply tenders open across central departments', color: '#0891B2' },
  { label: 'Maharashtra', text: 'eTender portal: IT hardware & networking tenders', color: '#F59E0B' },
  { label: 'GeM', text: 'Furniture & fixtures: Ministry of Finance buyers active', color: '#0D9488' },
  { label: 'IREPS', text: 'Railway stores procurement — new categories listed', color: '#10B981' },
]

export default function TenderTicker() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Hide smoothly as soon as user scrolls down from top / hero section
      setVisible(window.scrollY < 180)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <aside
      role="region"
      aria-label="Tender Activity Marquee"
      className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
        visible
          ? 'max-h-12 opacity-100 translate-y-0 border-b'
          : 'max-h-0 opacity-0 -translate-y-full pointer-events-none border-b-0'
      }`}
      style={{
        background: 'var(--bg-subtle)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-stretch">
        {/* Fixed badge */}
        <div
          className="flex items-center gap-2 px-3 sm:px-4 py-2 flex-shrink-0 border-r z-10 select-none"
          style={{
            background: 'var(--accent)',
            borderColor: 'rgba(255,255,255,0.15)',
          }}
        >
          <Radio size={12} className="text-white animate-pulse" aria-hidden="true" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white whitespace-nowrap">
            Live Updates
          </span>
        </div>

        {/* Scrolling content */}
        <div
          className="flex-1 overflow-hidden relative group"
          tabIndex={0}
          aria-label="Scrolling list of active tender categories across procurement portals"
        >
          {/* Edge gradients */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--bg-subtle), transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--bg-subtle), transparent)' }}
          />

          {/* Marquee track with pause on hover/focus */}
          <div className="ticker-track py-2 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            {/* Primary list */}
            {updates.map((item, i) => (
              <span key={`p-${i}`} className="flex items-center gap-2 pr-6 whitespace-nowrap">
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide flex-shrink-0"
                  style={{
                    backgroundColor: `${item.color}18`,
                    color: item.color,
                    border: `1px solid ${item.color}35`,
                  }}
                >
                  {item.label}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {item.text}
                </span>
                <span style={{ color: 'var(--border-md)' }} className="text-xs">·</span>
              </span>
            ))}

            {/* Duplicated list for seamless loop */}
            {updates.map((item, i) => (
              <span key={`d-${i}`} aria-hidden="true" className="flex items-center gap-2 pr-6 whitespace-nowrap select-none">
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide flex-shrink-0"
                  style={{
                    backgroundColor: `${item.color}18`,
                    color: item.color,
                    border: `1px solid ${item.color}35`,
                  }}
                >
                  {item.label}
                </span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {item.text}
                </span>
                <span style={{ color: 'var(--border-md)' }} className="text-xs">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
