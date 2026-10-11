import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { TONE_BOX, TONE_FILL } from './parts'

type G = Extract<Visual, { type: 'grid' }>
type M = Extract<Visual, { type: 'month' }>

/** V7 · a mini timetable or slot grid. The highlighted cell pulses once. */
export function GridVisual({ v }: { v: G }) {
  return (
    <div className="flex h-full flex-col justify-center gap-1">
      <div className="grid gap-1 text-xs" style={{ gridTemplateColumns: `2.5rem repeat(${v.cols.length}, minmax(0, 1fr))` }}>
        <span />
        {v.cols.map((c) => (
          <span key={c} className="truncate text-center text-muted-foreground">
            {c}
          </span>
        ))}
        {v.rows.map((r, ri) => (
          <div key={r} className="contents">
            <span className="truncate font-mono text-muted-foreground">{r}</span>
            {v.cols.map((_, ci) => {
              const key = `${ri}-${ci}`
              const cell = v.cells[key]
              return (
                <span
                  key={key}
                  className={cn(
                    'truncate rounded border px-1 py-0.5 text-center',
                    cell?.tone ? TONE_BOX[cell.tone] : 'border-border bg-card text-foreground',
                    v.highlight === key && 'mv-pulse font-semibold',
                  )}
                  style={v.highlight === key ? { animationDelay: '200ms' } : undefined}
                >
                  {cell?.label ?? ''}
                </span>
              )
            })}
          </div>
        ))}
      </div>
      {v.note && <span className="text-xs font-medium text-success">{v.note}</span>}
    </div>
  )
}

/** V7 (calendar form) · a month of day squares with marked days. Today pulses once. */
export function MonthVisual({ v }: { v: M }) {
  // October 2026 starts on a Thursday: three blank cells, then 31 days.
  const lead = 3
  const cells = Array.from({ length: 35 }, (_, i) => i - lead + 1)
  return (
    <div className="flex h-full flex-col justify-center gap-1">
      {v.caption && <span className="text-xs font-medium text-muted-foreground">{v.caption}</span>}
      <div className="grid w-fit grid-cols-7 gap-[3px]">
        {cells.map((d, i) => {
          const tone = d > 0 ? v.marks[d] : undefined
          return (
            <span
              key={i}
              className={cn(
                'h-2.5 w-4 rounded-[3px]',
                d < 1 || d > 31 ? 'bg-transparent' : tone ? TONE_FILL[tone] : 'bg-muted',
                v.today === d && 'mv-pulse ring-1 ring-primary',
              )}
            />
          )
        })}
      </div>
    </div>
  )
}
