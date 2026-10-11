'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Fade-and-rise once per element as it enters the viewport (plan §3.5). The
// hidden state only applies under `html.js`, so without JS nothing is hidden.
// The same pass sets `data-inview`, which starts micro-visual animations
// (module-features-plan.md §4.6, §6).
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.add('js')
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)'))
    const show = (el: Element) => {
      el.classList.add('is-visible')
      el.setAttribute('data-inview', '')
    }
    if (!('IntersectionObserver' in window)) {
      els.forEach(show)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(entry.target)
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
