import { useState } from 'react'
import { Save, RotateCcw, Check, Sparkles, LayoutTemplate, Layers } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { HeroContent } from '@/types/content'

export default function HeroSectionEditor() {
  const { content, updateSection, resetSection } = useContent()
  const [formData, setFormData] = useState<HeroContent>({ ...content.hero })
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSection('hero', formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset Hero Section to factory defaults?')) {
      resetSection('hero')
      setFormData({ ...content.hero })
    }
  }

  const handleTabChange = (index: number, field: string, value: string | number) => {
    const updatedTabs = [...formData.tabs]
    updatedTabs[index] = { ...updatedTabs[index], [field]: value }
    setFormData(prev => ({ ...prev, tabs: updatedTabs }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Hero Section & Console Editor
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Customize apex headlines, trust pills, metric badges, and simulated live tender desk tabs.
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Badges & Headlines */}
        <div className="p-5 rounded-2xl border space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Sparkles size={16} className="text-teal-500" />
            Top Trust Badge & Main Headline
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Badge Left Tag
              </label>
              <input
                type="text"
                value={formData.badgeLabel}
                onChange={e => setFormData({ ...formData, badgeLabel: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Badge Subtext
              </label>
              <input
                type="text"
                value={formData.badgeSub}
                onChange={e => setFormData({ ...formData, badgeSub: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Headline Lead
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={e => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Headline Accent (Gradient Highlight)
              </label>
              <input
                type="text"
                value={formData.headlineAccent}
                onChange={e => setFormData({ ...formData, headlineAccent: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none font-semibold text-teal-600 dark:text-teal-400"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Subheadline Editorial Pitch
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
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={formData.primaryCtaText}
                onChange={e => setFormData({ ...formData, primaryCtaText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-secondary)' }}>
                Secondary CTA Button Label
              </label>
              <input
                type="text"
                value={formData.secondaryCtaText}
                onChange={e => setFormData({ ...formData, secondaryCtaText: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="p-5 rounded-2xl border space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <LayoutTemplate size={16} className="text-teal-500" />
            Hero Proof Metrics (3 Highlights)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl border" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
              <label className="block text-[11px] font-bold uppercase text-teal-600 mb-1">Metric #1</label>
              <input
                type="text"
                value={formData.metric1Number}
                onChange={e => setFormData({ ...formData, metric1Number: e.target.value })}
                className="w-full font-black text-base px-2.5 py-1.5 rounded-lg border mb-2 outline-none"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
              <input
                type="text"
                value={formData.metric1Label}
                onChange={e => setFormData({ ...formData, metric1Label: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              />
            </div>

            <div className="p-3.5 rounded-xl border" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
              <label className="block text-[11px] font-bold uppercase text-teal-600 mb-1">Metric #2</label>
              <input
                type="text"
                value={formData.metric2Number}
                onChange={e => setFormData({ ...formData, metric2Number: e.target.value })}
                className="w-full font-black text-base px-2.5 py-1.5 rounded-lg border mb-2 outline-none"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
              <input
                type="text"
                value={formData.metric2Label}
                onChange={e => setFormData({ ...formData, metric2Label: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              />
            </div>

            <div className="p-3.5 rounded-xl border" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
              <label className="block text-[11px] font-bold uppercase text-teal-600 mb-1">Metric #3</label>
              <input
                type="text"
                value={formData.metric3Number}
                onChange={e => setFormData({ ...formData, metric3Number: e.target.value })}
                className="w-full font-black text-base px-2.5 py-1.5 rounded-lg border mb-2 outline-none"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
              <input
                type="text"
                value={formData.metric3Label}
                onChange={e => setFormData({ ...formData, metric3Label: e.target.value })}
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border outline-none"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
              />
            </div>
          </div>
        </div>

        {/* Live Tender Desk Tabs */}
        <div className="p-5 rounded-2xl border space-y-4" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
          <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Layers size={16} className="text-teal-500" />
            Tender Desk Live Console Simulator Tabs
          </h3>

          <div className="space-y-4">
            {formData.tabs.map((tab, idx) => (
              <div key={tab.id} className="p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-4 gap-3" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Tab Tag / ID</label>
                  <input
                    type="text"
                    value={tab.label}
                    onChange={e => handleTabChange(idx, 'label', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none font-bold"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Issuing Agency</label>
                  <input
                    type="text"
                    value={tab.agency}
                    onChange={e => handleTabChange(idx, 'agency', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Contract Value</label>
                  <input
                    type="text"
                    value={tab.value}
                    onChange={e => handleTabChange(idx, 'value', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none font-mono"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--accent)' }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>Readiness Score (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={tab.readiness}
                    onChange={e => handleTabChange(idx, 'readiness', Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}
