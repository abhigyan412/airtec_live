import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { GhostButton, Pill, delay } from './parts'

type V = Extract<Visual, { type: 'pills' }>

/** V1 · a row or stack of status pills, or a segmented tab bar. Items fade in 60ms apart. */
export function PillsVisual({ v }: { v: V }) {
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {v.tabs ? (
        <div className="inline-flex w-fit gap-0.5 rounded-lg bg-muted p-0.5">
          {v.items.map((it, i) => (
            <span
              key={it.label}
              style={delay(i * 60)}
              className={cn(
                'mv-fade rounded-md px-2 py-1 text-xs font-medium',
                it.tone === 'muted' ? 'text-muted-foreground' : 'bg-background shadow-sm',
                it.tone === 'success' && 'text-success',
                it.tone === 'primary' && 'text-primary',
              )}
            >
              {it.label}
            </span>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {v.items.map((it, i) => (
            <span key={it.label} className="mv-fade" style={delay(i * 60)}>
              <Pill label={it.label} tone={it.tone} />
            </span>
          ))}
        </div>
      )}
      {(v.caption || v.action) && (
        <div className="flex items-center justify-between gap-2">
          {v.caption && <span className="truncate text-xs text-muted-foreground">{v.caption}</span>}
          {v.action && <GhostButton className="ml-auto">{v.action}</GhostButton>}
        </div>
      )}
    </div>
  )
}
