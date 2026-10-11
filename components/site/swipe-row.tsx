'use client'
import { Children, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * A feature group. From 640px up it is a grid (the caller passes the column
 * classes). Below 640px it becomes a horizontal swipe row: cards 80% of the
 * screen wide, snap scrolling, and a "1 / 4" counter, so the visuals stay
 * readable without a very long page (module-features-plan.md §3).
 */
export function SwipeRow({ children, gridClassName }: { children: React.ReactNode; gridClassName: string }) {
  const ref = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const count = Children.count(children)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null
      if (!first) return
      const step = first.offsetWidth + 12 // gap-3
      setIndex(Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / step))))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [count])

  return (
    <div>
      <ul
        ref={ref}
        className={cn(
          '-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide',
          'sm:mx-0 sm:grid sm:snap-none sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0',
          '[&>li]:w-[80%] [&>li]:shrink-0 [&>li]:snap-start sm:[&>li]:w-auto',
          gridClassName,
        )}
      >
        {children}
      </ul>
      {count > 1 && (
        <p className="mt-2 text-center font-mono text-xs tabular-nums text-muted-foreground sm:hidden" aria-hidden>
          {index + 1} / {count}
        </p>
      )}
    </div>
  )
}
