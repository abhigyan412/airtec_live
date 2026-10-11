// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { ArrowDown } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { cn } from '@/lib/utils'
import { Mock } from '../parts'

const ROWS = [
  { rank: 1, name: 'Arjun K.', offer: true },
  { rank: 2, name: 'Zara M.' },
  { rank: 3, name: 'Vivaan S.' },
]

export function WaitlistSpot() {
  return (
    <Mock
      label="A seat is released in Class 1, available goes from 5 to 6, and the first family on the waitlist, Arjun K., is sent an offer with a reply deadline of 14 October"
      className="mx-auto w-full max-w-md"
    >
      <div className="flex items-center justify-between rounded-lg border bg-background p-3">
        <span className="text-sm font-semibold">Class 1 · seat released</span>
        <span className="font-mono text-sm tabular-nums">
          Available <span className="text-muted-foreground line-through">5</span> → <span className="mv-pop inline-block font-semibold text-success">6</span>
        </span>
      </div>
      <div className="flex justify-center py-1.5 text-muted-foreground">
        <ArrowDown className="mv-grow-y h-4 w-4" />
      </div>
      <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Waitlist</p>
      <ul className="space-y-1.5">
        {ROWS.map((r) => (
          <li
            key={r.rank}
            className={cn(
              'flex items-center justify-between gap-2 rounded-lg border px-3 py-2',
              r.offer ? 'mv-pop border-primary/40 bg-sidebar-accent' : 'opacity-50',
            )}
            style={r.offer ? { animationDelay: '320ms' } : undefined}
          >
            <span className="flex items-center gap-2 text-sm">
              <span className="font-mono text-xs text-muted-foreground">#{r.rank}</span>
              <span className={cn('font-medium', r.offer && 'text-sidebar-accent-foreground')}>{r.name}</span>
            </span>
            {r.offer ? <StatusPill tone="primary">Offer sent · reply by 14 Oct</StatusPill> : <StatusPill tone="muted">Waiting</StatusPill>}
          </li>
        ))}
      </ul>
    </Mock>
  )
}
