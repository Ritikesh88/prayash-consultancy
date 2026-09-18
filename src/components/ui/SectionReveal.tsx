import type { ReactNode, CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'

interface SectionRevealProps {
  children: ReactNode
  delay?: number // ms
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside'
}

/**
 * SectionReveal — wraps children with a fade-in + slide-up animation
 * that triggers when the element scrolls into view.
 */
export default function SectionReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: SectionRevealProps) {
  const { ref, inView } = useInView({ threshold: 0.08 })

  const style: CSSProperties = {
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
  }

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={style}
      className={className}
    >
      {children}
    </Tag>
  )
}
