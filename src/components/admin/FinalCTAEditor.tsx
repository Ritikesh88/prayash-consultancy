import { useState } from 'react'
import { Save, RotateCcw, Check, Megaphone } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { FinalCTAContent } from '@/types/content'

export default function FinalCTAEditor() {
  const { content, updateSection, resetSection } = useContent()
  const [formData, setFormData] = useState<FinalCTAContent>({ ...content.finalCta })
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSection('finalCta', formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset Final CTA to factory defaults?')) {
      resetSection('finalCta')
      setFormData({ ...content.finalCta })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Final Conversion Call-To-Action Editor
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Customize the high-conversion bottom banner prompt and callout buttons.
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

      <form onSubmit={handleSave} className="p-6 rounded-2xl border space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Megaphone size={18} className="text-teal-500" />
          <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            Closing Section Banner Elements
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Top Badge Text
            </label>
            <input
              type="text"
              value={formData.badge}
              onChange={e => setFormData({ ...formData, badge: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Banner Headline
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={e => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none font-bold"
              style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Description Text
            </label>
            <textarea
              rows={3}
              value={formData.subheadline}
              onChange={e => setFormData({ ...formData, subheadline: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none resize-none"
              style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              Primary Button Text
            </label>
            <input
              type="text"
              value={formData.primaryButtonText}
              onChange={e => setFormData({ ...formData, primaryButtonText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
              WhatsApp Button Text
            </label>
            <input
              type="text"
              value={formData.whatsappButtonText}
              onChange={e => setFormData({ ...formData, whatsappButtonText: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
              style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
