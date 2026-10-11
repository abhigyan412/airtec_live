// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { ArrowRight } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { cn, formatAmount } from '@/lib/utils'
import { Mock } from '../parts'

export function FineToFeesSpot() {
  return (
    <div
      role="img"
      aria-label="An overdue fine of 30 rupees for 6 days appears as a new Library fine line on the family's fee statement, and an RTE student's fine shows as waived"
      className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <Mock label="" className="w-48 shrink-0">
        <p className="text-xs text-muted-foreground">Wings of Fire · Meera</p>
        <p className="mt-1 text-sm font-semibold">Overdue 6 days</p>
        <p className="rupee mt-1 font-mono text-2xl font-semibold tabular-nums text-warning">{formatAmount(30)}</p>
      </Mock>
      <ArrowRight className="mv-grow-x h-5 w-5 rotate-90 text-muted-foreground sm:rotate-0" />
      <Mock label="" className="w-full max-w-[280px]">
        <p className="mb-2 text-sm font-semibold">Fee statement · Joshi family</p>
        <ul className="divide-y text-sm">
          {[
            { k: 'Term 2 tuition', v: 12000 },
            { k: 'Transport', v: 1800 },
            { k: 'Library fine', v: 30, fresh: true },
          ].map((r) => (
            <li
              key={r.k}
              className={cn('flex items-center justify-between py-1.5', r.fresh && 'mv-pop -mx-2 rounded-md bg-primary/5 px-2 font-medium')}
              style={r.fresh ? { animationDelay: '300ms' } : undefined}
            >
              <span>{r.k}</span>
              <span className="rupee font-mono tabular-nums">{formatAmount(r.v)}</span>
            </li>
          ))}
          <li className="flex items-center justify-between py-1.5 text-muted-foreground">
            <span>Library fine · RTE</span>
            <StatusPill tone="success">Waived</StatusPill>
          </li>
        </ul>
      </Mock>
    </div>
  )
}
