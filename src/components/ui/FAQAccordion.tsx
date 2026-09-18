import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FAQItem } from '@/config/faqData'

interface FAQAccordionProps {
  items: FAQItem[]
  initialOpen?: string
}

export default function FAQAccordion({ items, initialOpen }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(initialOpen ?? null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className="rounded-xl border transition-all duration-200 overflow-hidden shadow-sm"
            style={{
              backgroundColor: isOpen ? 'var(--accent-dim)' : 'var(--bg-card)',
              borderColor: isOpen ? 'var(--accent-border)' : 'var(--border)',
            }}
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-question-${item.id}`}
              className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 cursor-pointer"
            >
              <span
                className="text-sm font-semibold leading-relaxed transition-colors"
                style={{
                  color: isOpen ? 'var(--accent)' : 'var(--text-primary)',
                }}
              >
                {item.question}
              </span>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-200"
                style={{
                  backgroundColor: isOpen ? 'var(--accent)' : 'var(--accent-dim)',
                  color: isOpen ? '#FFFFFF' : 'var(--accent)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                <ChevronDown size={14} />
              </div>
            </button>

            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 pb-5">
                <div className="h-px mb-4" style={{ background: 'var(--border)' }} />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
