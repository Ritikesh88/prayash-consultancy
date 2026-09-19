import { useState } from 'react'
import { Save, RotateCcw, Check, Globe } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { PortalItem } from '@/types/content'

export default function PortalsEditor() {
  const { content, updateSection, resetSection } = useContent()
  const [portals, setPortals] = useState<PortalItem[]>([...content.portals])
  const [saved, setSaved] = useState(false)

  const handlePortalChange = (index: number, field: keyof PortalItem, value: string) => {
    const updated = [...portals]
    updated[index] = { ...updated[index], [field]: value }
    setPortals(updated)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSection('portals', portals)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset Portals to factory defaults?')) {
      resetSection('portals')
      setPortals([...content.portals])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Procurement Portals Configuration
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Manage the list of sovereign and PSU tender portals displayed on the trust bar and homepage.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="px-5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            style={{ background: 'var(--accent)' }}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            <span>{saved ? 'Saved to Website!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portals.map((portal, idx) => (
          <div
            key={portal.name}
            className="p-5 rounded-2xl border space-y-3 relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <Globe size={16} style={{ color: portal.color }} />
                <span className="font-extrabold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {portal.name}
                </span>
              </div>
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `${portal.color}15`,
                  borderColor: `${portal.color}35`,
                  color: portal.color,
                }}
              >
                {portal.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Display Name
                </label>
                <input
                  type="text"
                  value={portal.name}
                  onChange={e => handlePortalChange(idx, 'name', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none font-bold"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Portal Domain
                </label>
                <input
                  type="text"
                  value={portal.domain}
                  onChange={e => handlePortalChange(idx, 'domain', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none font-mono"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--accent)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Full Authority Title
                </label>
                <input
                  type="text"
                  value={portal.full}
                  onChange={e => handlePortalChange(idx, 'full', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Integration Status Badge
                </label>
                <input
                  type="text"
                  value={portal.status}
                  onChange={e => handlePortalChange(idx, 'status', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}
