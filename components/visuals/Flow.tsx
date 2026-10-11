import { ArrowRight } from 'lucide-react'
import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { Pill, Rich, TONE_BOX, delay } from './parts'

type V = Extract<Visual, { type: 'flow' }>

function Step({ label, tone, last, style }: { label: string; tone?: V['steps'][number]['tone']; last?: boolean; style?: React.CSSProperties }) {
  return (
    <span
      style={style}
      className={cn(
        'inline-flex min-w-0 items-center rounded-md border px-2 py-1 text-xs font-medium',
        tone ? TONE_BOX[tone] : 'border-border bg-card text-foreground',
        last && 'mv-pop',
      )}
    >
      <span className="truncate">
        <Rich text={label} />
      </span>
    </span>
  )
}

function Arrow({ i }: { i: number }) {
  return (
    <span className="mv-grow-x flex shrink-0 items-center text-muted-foreground" style={delay(i * 120)}>
      <ArrowRight className="h-3.5 w-3.5" />
    </span>
  )
}

/**
 * V4 · small step boxes joined by arrows. Arrows draw left to right, then the
 * last box lights up. `merge` joins two inputs into one result, `split` fans
 * one source out to two.
 */
export function FlowVisual({ v }: { v: V }) {
  const n = v.steps.length
  const lastDelay = delay((n - 1) * 120 + 120)

  if (v.layout === 'merge' || v.layout === 'split') {
    const [a, b, c] = v.steps
    const stack = v.layout === 'merge' ? [a, b] : [b, c]
    const single = v.layout === 'merge' ? c : a
    const stacked = (
      <span className="flex min-w-0 flex-col gap-1">
        {stack.map((s) => (
          <Step key={s.label} label={s.label} tone={s.tone} />
        ))}
      </span>
    )
    return (
      <div className="flex h-full items-center gap-1.5">
        {v.layout === 'merge' ? stacked : <Step label={single.label} tone={single.tone} />}
        <Arrow i={0} />
        {v.layout === 'merge' ? <Step label={single.label} tone={single.tone} last style={lastDelay} /> : stacked}
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className="flex flex-wrap items-center gap-1.5">
        {v.steps.map((s, i) => (
          <span key={s.label + i} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <Arrow i={i - 1} />}
            <Step label={s.label} tone={s.tone} last={i === n - 1} style={i === n - 1 ? lastDelay : undefined} />
          </span>
        ))}
      </div>
      {v.note && (
        <span className="mv-fade" style={lastDelay}>
          <Pill label={v.note.label} tone={v.note.tone} />
        </span>
      )}
    </div>
  )
}
