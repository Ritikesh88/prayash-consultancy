import { useState } from 'react'
import { Save, RotateCcw, Check, Plus, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { ProblemItem } from '@/types/content'

export default function ProblemSectionEditor() {
  const { content, updateSection, resetSection } = useContent()
  const [items, setItems] = useState<ProblemItem[]>([...content.problemItems])
  const [saved, setSaved] = useState(false)

  const handleChange = (index: number, field: keyof ProblemItem, value: string) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  const addItem = () => {
    setItems([...items, { pain: 'New common bidding challenge', fix: 'Our desk operational solution' }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, idx) => idx !== index))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSection('problemItems', items)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset Pain vs. Precision items to factory defaults?')) {
      resetSection('problemItems')
      setItems([...content.problemItems])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            &ldquo;Pain vs. Precision&rdquo; Matrix Editor
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Compare contractor pain points with Prayash Desk operational solutions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addItem}
            className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
          >
            <Plus size={13} />
            <span>Add Row</span>
          </button>
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

      <form onSubmit={handleSave} className="space-y-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl border grid grid-cols-1 md:grid-cols-2 gap-4 relative items-start"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5 text-red-500">
                <AlertTriangle size={13} />
                Contractor Pain Point #{idx + 1}
              </label>
              <textarea
                rows={2}
                value={item.pain}
                onChange={e => handleChange(idx, 'pain', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none resize-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-emerald-500">
                  <CheckCircle2 size={13} />
                  Prayash Desk Precision Solution
                </label>
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer"
                    title="Remove row"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
              <textarea
                rows={2}
                value={item.fix}
                onChange={e => handleChange(idx, 'fix', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none resize-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}
