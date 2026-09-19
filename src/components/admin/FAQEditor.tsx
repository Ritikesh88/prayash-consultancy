import { useState } from 'react'
import { Save, RotateCcw, Check, Plus, Trash2, HelpCircle } from 'lucide-react'
import { useContent } from '@/context/ContentContext'
import type { FAQItemContent } from '@/types/content'

export default function FAQEditor() {
  const { content, updateSection, resetSection } = useContent()
  const [faqs, setFaqs] = useState<FAQItemContent[]>([...content.faqs])
  const [saved, setSaved] = useState(false)

  const handleFAQChange = (index: number, field: keyof FAQItemContent, value: string) => {
    const updated = [...faqs]
    updated[index] = { ...updated[index], [field]: value }
    setFaqs(updated)
  }

  const addFAQ = () => {
    setFaqs([
      {
        id: `faq-${Date.now()}`,
        question: 'New Frequently Asked Question',
        answer: 'Comprehensive explanation provided by the tender consultancy desk.',
        category: 'General',
      },
      ...faqs,
    ])
  }

  const removeFAQ = (index: number) => {
    setFaqs(faqs.filter((_, idx) => idx !== index))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateSection('faqs', faqs)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    if (window.confirm('Reset all FAQs to factory defaults?')) {
      resetSection('faqs')
      setFaqs([...content.faqs])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Frequently Asked Questions (FAQ) Manager
          </h2>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Add, update, or remove knowledge base questions displayed on the homepage and dedicated FAQ page.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addFAQ}
            className="px-3.5 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}
          >
            <Plus size={13} />
            <span>Add New FAQ</span>
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

      <form onSubmit={handleSave} className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl border space-y-3 relative"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle size={15} className="text-teal-600" />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>
                  Question #{idx + 1}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFAQ(idx)}
                className="text-red-500 hover:text-red-700 p-1 cursor-pointer transition-colors"
                title="Delete question"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-3">
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Question Text
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={e => handleFAQChange(idx, 'question', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-sm outline-none font-bold"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                  Category Pill
                </label>
                <input
                  type="text"
                  value={faq.category}
                  onChange={e => handleFAQChange(idx, 'category', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border text-xs outline-none"
                  style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-muted)' }}>
                Detailed Answer
              </label>
              <textarea
                rows={3}
                value={faq.answer}
                onChange={e => handleFAQChange(idx, 'answer', e.target.value)}
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
