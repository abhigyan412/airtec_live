// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { PhoneFrame } from '@/components/site/frames'
import { StatusPill } from '@/components/site/status-pill'
import { cn, formatAmount } from '@/lib/utils'
import { Mock } from '../parts'

export function OnlinePaymentSpot() {
  return (
    <div
      role="img"
      aria-label="A parent pays 6,200 rupees on the phone and gets receipt R-2026-1184, and the same payment appears as a new row in the staff day book"
      className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <PhoneFrame className="w-44 shrink-0">
        <div className="space-y-2 bg-background p-3 text-xs">
          <p className="text-muted-foreground">Dues · Term 2</p>
          <p className="rupee font-mono text-xl font-semibold tabular-nums">{formatAmount(6200)}</p>
          <div className="rounded-md bg-primary py-1.5 text-center font-medium text-primary-foreground">Pay</div>
          <div className="mv-pop flex items-start gap-1.5 rounded-md bg-success/10 p-2 text-success" style={{ animationDelay: '250ms' }}>
            <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0" />
            <span>
              <span className="block font-semibold">Paid</span>
              <span className="font-mono">Receipt R-2026-1184</span>
            </span>
          </div>
        </div>
      </PhoneFrame>
      <ArrowRight className="mv-grow-x h-5 w-5 rotate-90 text-muted-foreground sm:rotate-0" style={{ animationDelay: '300ms' }} />
      <Mock label="" className="w-full max-w-[280px]">
        <p className="mb-2 text-sm font-semibold">Day book · today</p>
        <ul className="divide-y text-xs">
          {[
            { r: 'R-2026-1184', a: 6200, m: 'Online', fresh: true },
            { r: 'R-2026-1183', a: 4500, m: 'Cash' },
            { r: 'R-2026-1182', a: 12000, m: 'UPI' },
          ].map((row) => (
            <li
              key={row.r}
              className={cn('flex items-center justify-between gap-2 py-2', row.fresh && 'mv-pop -mx-2 rounded-md bg-success/10 px-2')}
              style={row.fresh ? { animationDelay: '420ms' } : undefined}
            >
              <span className="font-mono">{row.r}</span>
              <span className="rupee font-mono tabular-nums">{formatAmount(row.a)}</span>
              {row.fresh ? <StatusPill tone="success">New</StatusPill> : <span className="text-muted-foreground">{row.m}</span>}
            </li>
          ))}
        </ul>
      </Mock>
    </div>
  )
}
