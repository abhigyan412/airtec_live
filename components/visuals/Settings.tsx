import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'

type V = Extract<Visual, { type: 'settings' }>

/** V6 · setting rows with a switch or a value field. Switches that are on toggle on. */
export function SettingsVisual({ v }: { v: V }) {
  return (
    <ul className="flex h-full flex-col justify-center divide-y divide-border/70">
      {v.rows.map((r) => (
        <li key={r.label} className="flex h-7 items-center justify-between gap-2 text-xs">
          <span className="truncate text-foreground">{r.label}</span>
          {typeof r.value === 'boolean' ? (
            <span
              className={cn(
                'relative inline-flex h-4 w-7 shrink-0 items-center rounded-full',
                r.value ? 'mv-track bg-primary' : 'bg-input/60',
              )}
            >
              <span
                className={cn('absolute h-3 w-3 rounded-full bg-background shadow', r.value ? 'mv-knob left-[14px]' : 'left-0.5')}
              />
            </span>
          ) : (
            <span className="rounded-md border border-input bg-background px-1.5 py-0.5 font-mono text-xs tabular-nums">{r.value}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
