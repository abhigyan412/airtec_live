import { Clock as ClockIcon } from 'lucide-react'
import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { GhostButton, Pill, TONE_TEXT } from './parts'

type V = Extract<Visual, { type: 'clock' }>

/** V13 · a countdown or time chip with an icon. The value ticks over from `from` (or rolls in). */
export function ClockVisual({ v }: { v: V }) {
  const tone = TONE_TEXT[v.tone ?? 'primary']
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      <div className="flex items-center gap-2">
        <span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10', tone)}>
          <ClockIcon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <div className="relative h-6 overflow-hidden">
            {v.from && (
              <span className={cn('mv-roll-out absolute inset-0 whitespace-nowrap font-mono text-base font-semibold tabular-nums', tone)}>{v.from}</span>
            )}
            <span className={cn('mv-roll block whitespace-nowrap font-mono text-base font-semibold tabular-nums', tone)} style={v.from ? { animationDelay: '120ms' } : undefined}>
              {v.time}
            </span>
          </div>
          <p className="truncate text-xs text-muted-foreground">{v.label}</p>
        </div>
      </div>
      {v.pill && (
        <span className="mv-pop w-fit" style={{ animationDelay: '360ms' }}>
          <Pill label={v.pill.label} tone={v.pill.tone} />
        </span>
      )}
      {v.actions && (
        <div className="flex gap-1">
          {v.actions.map((a) => (
            <GhostButton key={a}>{a}</GhostButton>
          ))}
        </div>
      )}
    </div>
  )
}
