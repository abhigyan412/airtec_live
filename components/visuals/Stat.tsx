import type { Visual } from '@/content/modules'
import { Pill, Rich, delay } from './parts'

type V = Extract<Visual, { type: 'stat' }>

/**
 * V5 · one big number, a caption and up to 3 tags. The number rolls up into
 * place; a CSS-only count would lose Indian digit grouping (3,42,600).
 */
export function StatVisual({ v }: { v: V }) {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      <div className="overflow-hidden">
        <p className="mv-roll font-mono text-2xl font-semibold leading-tight tabular-nums text-foreground">
          <Rich text={v.value} />
        </p>
      </div>
      <p className="text-xs text-muted-foreground">
        <Rich text={v.caption} />
      </p>
      {v.pills && (
        <div className="flex flex-wrap gap-1">
          {v.pills.map((p, i) => (
            <span key={p.label} className="mv-fade" style={delay(200 + i * 60)}>
              <Pill label={p.label} tone={p.tone} className="px-1.5 py-0" />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
