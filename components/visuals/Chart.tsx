import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { delay } from './parts'

type V = Extract<Visual, { type: 'chart' }>

/**
 * V10 · a tiny bar chart: one hue, no axes, at most 7 bars, with the
 * highlighted (default: last) bar labelled. Bars grow from 0.
 */
export function ChartVisual({ v }: { v: V }) {
  const max = Math.max(...v.points)
  const min = Math.min(...v.points)
  const hi = v.highlight ?? v.points.length - 1
  // Keep small differences visible: bars start from 40% of the min, not 0.
  const floor = min * 0.4
  return (
    <div className="flex h-full flex-col justify-end gap-1">
      <div className="flex h-14 items-end gap-1.5">
        {v.points.map((p, i) => (
          <div key={i} className="relative flex h-full flex-1 flex-col justify-end">
            {i === hi && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-xs font-semibold tabular-nums text-primary">
                {v.lastLabel}
              </span>
            )}
            <div
              className={cn('mv-grow-y w-full rounded-t-sm', i === hi ? 'bg-primary' : 'bg-primary/35')}
              style={{ height: `${((p - floor) / (max - floor)) * 100}%`, ...delay(i * 40) }}
            />
          </div>
        ))}
      </div>
      {v.labels && (
        <div className="flex gap-1.5">
          {v.labels.map((l) => (
            <span key={l} className="flex-1 truncate text-center text-[11px] text-muted-foreground">
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
