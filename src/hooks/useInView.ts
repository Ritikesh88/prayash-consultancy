import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

/**
 * useInView — fires when an element enters the viewport.
 * Used to trigger scroll-based animations.
 */
export function useInView({
  threshold = 0.1,
  rootMargin = '0px 0px -60px 0px',
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
