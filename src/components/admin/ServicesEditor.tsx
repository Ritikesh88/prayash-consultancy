import { useState } from 'react'
import { Save, RotateCcw, Check, Plus, Trash2 } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { ServiceItemContent } from '@/types/content'

export default function ServicesEditor() {
  const { content, updateSection, resetSection } = useContent()
  const [services, setServices] = useState<ServiceItemContent[]>([...content.services])
  const [saved, setSaved] = useState(false)

  const handleServiceChange = (index: number, field: keyof ServiceItemContent, value: string) => {
    const updated = [...services]
    updated[index] = { ...updated[index], [field]: value }
    setServices(updated)
  }

  const handlePointChange = (serviceIdx: number, pointIdx: number, value: string) => {
    const updated = [...services]
    const updatedPoints = [...updated[serviceIdx].points]
    updatedPoints[pointIdx] = value
    updated[serviceIdx] = { ...updated[serviceIdx], points: updatedPoints }
    setServices(updated)
  }

  const addPoint = (serviceIdx: number) => {
    const updated = [...services]
    updated[serviceIdx] = { ...updated[serviceIdx], points: [...updated[serviceIdx].points, 'New deliverable point'] }
    setServices(updated)
  }

  const removePoint = (serviceIdx: number, pointIdx: number) => {
    const updated = [...services]
    updated[serviceIdx] = {
      ...updated[serviceIdx],
      points: updated[serviceIdx].points.filter((_, idx) => idx !== pointIdx),
    }
    setServices(updated)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSection('services', services)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset Services to factory defaults?')) {
      resetSection('services')
      setServices([...content.services])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Core Tender Services Editor
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Edit service offerings, subtitles, and individual bullet points across your service grid.
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

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((service, sIdx) => (
          <div
            key={service.id}
            className="p-5 rounded-2xl border space-y-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Service Title
              </label>
              <input
                type="text"
                value={service.title}
                onChange={e => handleServiceChange(sIdx, 'title', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border text-sm outline-none font-bold"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Subtitle / Scope
              </label>
              <input
                type="text"
                value={service.subtitle}
                onChange={e => handleServiceChange(sIdx, 'subtitle', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  Deliverable Bullet Points
                </label>
                <button
                  type="button"
                  onClick={() => addPoint(sIdx)}
                  className="text-[10px] font-bold text-teal-600 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <Plus size={12} />
                  Add Point
                </button>
              </div>

              <div className="space-y-1.5">
                {service.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={pt}
                      onChange={e => handlePointChange(sIdx, pIdx, e.target.value)}
                      className="flex-1 px-2.5 py-1 rounded-md border text-xs outline-none"
                      style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                    />
                    <button
                      type="button"
                      onClick={() => removePoint(sIdx, pIdx)}
                      className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                      title="Delete point"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}
