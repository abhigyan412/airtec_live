import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { GhostButton, TONE_FILL, TONE_TEXT } from './parts'

type V = Extract<Visual, { type: 'bar' }>

/** V2 · a labelled progress or segmented bar. The fill grows from 0. */
export function BarVisual({ v }: { v: V }) {
  const last = v.segments[v.segments.length - 1]
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-medium text-foreground">{v.label}</span>
        <span className={cn('font-mono tabular-nums', TONE_TEXT[last.tone])}>{last.label}</span>
      </div>
      <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
        <div className="mv-grow-x flex h-full w-full">
          {v.segments.map((s) => (
            <div key={s.label} className={TONE_FILL[s.tone]} style={{ width: `${s.value}%` }} />
          ))}
        </div>
      </div>
      {v.action && <GhostButton className="w-fit">{v.action}</GhostButton>}
    </div>
  )
}
