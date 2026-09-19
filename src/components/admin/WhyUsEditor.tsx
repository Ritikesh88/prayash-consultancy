import { useState } from 'react'
import { Save, RotateCcw, Check, Shield } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { WhyUsItem } from '@/types/content'

export default function WhyUsEditor() {
  const { content, updateSection, resetSection } = useContent()
  const [items, setItems] = useState<WhyUsItem[]>([...content.whyUsItems])
  const [saved, setSaved] = useState(false)

  const handleChange = (index: number, field: keyof WhyUsItem, value: string) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSection('whyUsItems', items)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset Why Us Pillars to factory defaults?')) {
      resetSection('whyUsItems')
      setItems([...content.whyUsItems])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            &ldquo;The Desk Advantage&rdquo; (Why Us) Editor
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Configure the 6 institutional pillars that distinguish Prayash Consultancy from traditional agents.
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
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border space-y-3"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center gap-2">
              <Shield size={16} style={{ color: item.color }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: item.color }}>
                Pillar #{idx + 1}
              </span>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Pillar Title
              </label>
              <input
                type="text"
                value={item.title}
                onChange={e => handleChange(idx, 'title', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border text-sm outline-none font-bold"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Detailed Explanation
              </label>
              <textarea
                rows={3}
                value={item.desc}
                onChange={e => handleChange(idx, 'desc', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none resize-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}
