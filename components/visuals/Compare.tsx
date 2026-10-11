import { ArrowRight } from 'lucide-react'
import type { Visual } from '@/content/modules'
import { Pill, Rich } from './parts'

type V = Extract<Visual, { type: 'compare' }>

function Struck({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-muted-foreground">
      {children}
      <span className="mv-grow-x absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-destructive" />
    </span>
  )
}

/** V12 · a crossed-out "before" next to an "after". The strike line draws across. */
export function CompareVisual({ v }: { v: V }) {
  if (v.duplicate) {
    // Two identical notifications, the second struck out.
    const card = (struck: boolean) => (
      <div className="flex items-center gap-2 rounded-md border bg-card px-2 py-1 text-xs">
        <span className="h-2 w-2 rounded-full bg-primary" />
        {struck ? (
          <Struck>
            <Rich text={v.before} />
          </Struck>
        ) : (
          <span className="text-foreground">
            <Rich text={v.before} />
          </span>
        )}
        <span className="ml-auto text-[11px] text-muted-foreground">{struck ? 'blocked' : '07:00'}</span>
      </div>
    )
    return (
      <div className="flex h-full flex-col justify-center gap-1.5">
        {card(false)}
        <div className="opacity-70">{card(true)}</div>
      </div>
    )
  }
  return (
    <div className="flex h-full flex-col items-start justify-center gap-2">
      <div className="flex items-center gap-2 font-mono text-lg font-semibold tabular-nums">
        <Struck>
          <Rich text={v.before} />
        </Struck>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-foreground">
          <Rich text={v.after} />
        </span>
      </div>
      {v.note && (
        <span className="mv-fade" style={{ animationDelay: '300ms' }}>
          <Pill label={v.note} tone="success" />
        </span>
      )}
    </div>
  )
}
