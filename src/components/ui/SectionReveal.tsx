import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'morph'

interface SectionRevealProps {
  children: ReactNode
  delay?: number // ms
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside'
  direction?: RevealDirection
  amount?: number
}

/**
 * SectionReveal — Apple-grade 3D morphing fluid reveal.
 * Features:
 * - Always repeats on enter/exit (`once: false`) so scrolling top-to-bottom or vice versa re-animates smoothly.
 * - 3D morphing directional fly-ins (left-to-right, right-to-left, up/down, 3D tilt-morph).
 * - Critically damped spring physics matching Apple fluid interaction standards.
 * - Automatic accessible graceful degradation for `prefers-reduced-motion`.
 */
export default function SectionReveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
  direction = 'up',
  amount = 0.2,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const getVariants = () => {
    if (shouldReduceMotion) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.25, delay: delay / 1000 },
        },
      }
    }

    switch (direction) {
      case 'left':
        return {
          hidden: {
            opacity: 0,
            x: -60,
            rotateY: 8,
            scale: 0.96,
            transformPerspective: 1000,
          },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            transformPerspective: 1000,
            transition: {
              type: 'spring' as const,
              stiffness: 160,
              damping: 22,
              mass: 0.85,
              delay: delay / 1000,
            },
          },
        }

      case 'right':
        return {
          hidden: {
            opacity: 0,
            x: 60,
            rotateY: -8,
            scale: 0.96,
            transformPerspective: 1000,
          },
          visible: {
            opacity: 1,
            x: 0,
            rotateY: 0,
            scale: 1,
            transformPerspective: 1000,
            transition: {
              type: 'spring' as const,
              stiffness: 160,
              damping: 22,
              mass: 0.85,
              delay: delay / 1000,
            },
          },
        }

      case 'down':
        return {
          hidden: {
            opacity: 0,
            y: -40,
            rotateX: 6,
            scale: 0.97,
            transformPerspective: 1000,
          },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transformPerspective: 1000,
            transition: {
              type: 'spring' as const,
              stiffness: 170,
              damping: 24,
              mass: 0.85,
              delay: delay / 1000,
            },
          },
        }

      case 'morph':
        return {
          hidden: {
            opacity: 0,
            scale: 0.92,
            rotateX: 8,
            y: 35,
            transformPerspective: 1200,
          },
          visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: 0,
            transformPerspective: 1200,
            transition: {
              type: 'spring' as const,
              stiffness: 150,
              damping: 20,
              mass: 0.9,
              delay: delay / 1000,
            },
          },
        }

      case 'up':
      default:
        return {
          hidden: {
            opacity: 0,
            y: 36,
            rotateX: -4,
            scale: 0.98,
            transformPerspective: 1000,
          },
          visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transformPerspective: 1000,
            transition: {
              type: 'spring' as const,
              stiffness: 170,
              damping: 24,
              mass: 0.85,
              delay: delay / 1000,
            },
          },
        }
    }
  }

  const variants = getVariants()

  // once: false ensures continuous playback both on forward and reverse scrolls
  const motionProps = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: false, amount, margin: '0px 0px -40px 0px' },
    variants,
  }

  if (Tag === 'section') {
    return (
      <motion.section {...motionProps} className={className}>
        {children}
      </motion.section>
    )
  }

  if (Tag === 'article') {
    return (
      <motion.article {...motionProps} className={className}>
        {children}
      </motion.article>
    )
  }

  if (Tag === 'aside') {
    return (
      <motion.aside {...motionProps} className={className}>
        {children}
      </motion.aside>
    )
  }

  return (
    <motion.div {...motionProps} className={className}>
      {children}
    </motion.div>
  )
}
