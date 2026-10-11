import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { Pill, Rich, delay } from './parts'

type V = Extract<Visual, { type: 'rows' }>

function Initials({ name }: { name: string }) {
  const letters = name
    .replace(/[^A-Za-z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-semibold text-primary" aria-hidden>
      {letters}
    </span>
  )
}

/** V3 · up to 3 mini list rows: initials, name, value, pill. Rows fade in 60ms apart. */
export function RowsVisual({ v }: { v: V }) {
  return (
    <div className="flex h-full flex-col justify-center">
      {(v.caption || v.header) && (
        <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">{v.caption}</span>
          {v.header && (
            <span className="flex gap-3">
              {v.header.map((h) => (
                <span key={h} className="w-14 text-right">
                  {h}
                </span>
              ))}
            </span>
          )}
        </div>
      )}
      <ul className="divide-y divide-border/70">
        {v.rows.map((r, i) => (
          <li
            key={r.name + i}
            style={delay(i * 60)}
            className={cn('mv-fade flex h-6 items-center gap-2 text-xs', r.dim && 'opacity-55')}
          >
            {!v.header && <Initials name={r.name} />}
            <span className={cn('min-w-0 truncate font-medium text-foreground', r.struck && 'text-muted-foreground line-through')}>{r.name}</span>
            {r.meta && <span className="truncate text-muted-foreground">{r.meta}</span>}
            <span className="ml-auto flex shrink-0 items-center gap-3">
              {r.values?.map((val) => (
                <span key={val} className={cn('text-right font-mono tabular-nums text-foreground', v.header ? 'w-14' : '')}>
                  <Rich text={val} />
                </span>
              ))}
              {r.pill && <Pill label={r.pill.label} tone={r.pill.tone} className="px-1.5 py-0" />}
            </span>
          </li>
        ))}
      </ul>
      {v.link && <span className="mt-1 text-xs font-medium text-primary">{v.link} →</span>}
    </div>
  )
}
