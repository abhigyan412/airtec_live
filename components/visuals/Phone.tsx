import { Check } from 'lucide-react'
import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { Rich, SolidButton, TONE_FILL } from './parts'

type V = Extract<Visual, { type: 'phone' }>

/**
 * V8 · the top of a small phone with one notification or screen. The card
 * slides down from the top. No WhatsApp-style bubbles (plan.md §8).
 */
export function PhoneVisual({ v }: { v: V }) {
  return (
    <div className="flex h-full justify-center overflow-hidden">
      <div className="relative -mb-6 w-40 rounded-t-[1.25rem] border-[3px] border-b-0 border-foreground/80 bg-background px-2 pt-2 dark:border-border">
        <div className="mx-auto mb-1.5 h-1 w-8 rounded-full bg-foreground/20" />
        <div className="mv-drop rounded-lg border bg-card p-1.5 shadow-sm">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-semibold text-foreground">AIRTEC</span>
            {v.time && <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{v.time}</span>}
          </div>
          <p className="truncate text-xs font-medium text-foreground">
            <Rich text={v.title} />
          </p>
          {v.body && (
            <p className="truncate text-xs text-muted-foreground">
              <Rich text={v.body} />
            </p>
          )}
          {v.steps && (
            <ol className="mt-1 flex items-center gap-1">
              {v.steps.map((s, i) => (
                <li key={s.label} className="flex items-center gap-1">
                  <span
                    className={cn(
                      'flex h-3.5 w-3.5 items-center justify-center rounded-full',
                      s.done ? 'bg-success text-success-foreground' : 'border border-input',
                    )}
                  >
                    {s.done && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{s.label}</span>
                  {i < v.steps!.length - 1 && <span className="h-px w-1.5 bg-border" />}
                </li>
              ))}
            </ol>
          )}
          {v.dots && (
            <div className="mt-1 flex gap-1">
              {v.dots.map((d, i) => (
                <span key={i} className={cn('h-2 w-2 rounded-full', TONE_FILL[d])} />
              ))}
            </div>
          )}
          {v.action && <SolidButton className="mt-1 h-5 w-full justify-center">{v.action}</SolidButton>}
        </div>
      </div>
    </div>
  )
}
