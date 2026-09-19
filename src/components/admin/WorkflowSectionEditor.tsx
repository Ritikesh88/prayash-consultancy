import { useState } from 'react'
import { Save, RotateCcw, Check } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { WorkflowStageContent } from '@/types/content'

export default function WorkflowSectionEditor() {
  const { content, updateSection, resetSection } = useContent()
  const [stages, setStages] = useState<WorkflowStageContent[]>([...content.workflowStages])
  const [saved, setSaved] = useState(false)

  const handleStageChange = (index: number, field: keyof WorkflowStageContent, value: string) => {
    const updated = [...stages]
    updated[index] = { ...updated[index], [field]: value }
    setStages(updated)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSection('workflowStages', stages)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset 6-Stage Tender Workflow to factory defaults?')) {
      resetSection('workflowStages')
      setStages([...content.workflowStages])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            The Tender Journey Pipeline Editor
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Edit the six lifecycle stages of your left-to-right dynamic animated flow, key deliverables, and SLAs.
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

      <form onSubmit={handleSave} className="space-y-4">
        {stages.map((stage, idx) => (
          <div
            key={stage.id}
            className="p-5 rounded-2xl border space-y-3 relative overflow-hidden transition-all shadow-xs"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            {/* Top border color indicator */}
            <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: stage.color }} />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold text-white"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.step}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: stage.color }}>
                  Stage {stage.step} — {stage.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>Theme Color</label>
                <input
                  type="color"
                  value={stage.color}
                  onChange={e => handleStageChange(idx, 'color', e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Stage Badge (e.g. ONBOARD)
                </label>
                <input
                  type="text"
                  value={stage.label}
                  onChange={e => handleStageChange(idx, 'label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none font-bold"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Stage Title
                </label>
                <input
                  type="text"
                  value={stage.title}
                  onChange={e => handleStageChange(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Turnaround / SLA (e.g. Day 1 — 24h)
                </label>
                <input
                  type="text"
                  value={stage.sla}
                  onChange={e => handleStageChange(idx, 'sla', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Key Deliverable Output
                </label>
                <input
                  type="text"
                  value={stage.deliverable}
                  onChange={e => handleStageChange(idx, 'deliverable', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Detailed Description
              </label>
              <textarea
                rows={2}
                value={stage.desc}
                onChange={e => handleStageChange(idx, 'desc', e.target.value)}
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
