// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { StatusPill } from '@/components/site/status-pill'
import { cn, formatAmount } from '@/lib/utils'
import { Mock } from '../parts'

const BUCKETS = [
  { k: '0–30', v: '2.4L', h: 100 },
  { k: '31–60', v: '1.1L', h: 46 },
  { k: '61–90', v: '62K', h: 26 },
  { k: '90+', v: '38K', h: 16, bad: true },
]

export function AgingBarsSpot() {
  return (
    <Mock label="Aging report: 2.4 lakh rupees due 0 to 30 days, 1.1 lakh 31 to 60, 62 thousand 61 to 90 and 38 thousand over 90 days, with three defaulters and a Remind all button" className="mx-auto w-full max-w-md">
      <p className="mb-3 text-sm font-semibold">Dues by age</p>
      <div className="flex h-32 items-end gap-3">
        {BUCKETS.map((b, i) => (
          <div key={b.k} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className={cn('font-mono text-xs font-semibold tabular-nums', b.bad ? 'text-destructive' : 'text-foreground')}>
              <span className="rupee">{b.v}</span>
            </span>
            <div
              className={cn('mv-grow-y w-full rounded-t-md', b.bad ? 'bg-destructive/70' : 'bg-primary/70')}
              style={{ height: `${b.h}%`, animationDelay: `${i * 60}ms` }}
            />
            <span className="text-xs text-muted-foreground">{b.k}</span>
          </div>
        ))}
      </div>
      <ul className="mt-4 divide-y border-t text-sm">
        {[
          { n: 'Arjun K. · 7-B', a: 8200 },
          { n: 'Sara P. · 5-A', a: 6400 },
          { n: 'Neel B. · 9-C', a: 4100 },
        ].map((r) => (
          <li key={r.n} className="flex items-center justify-between py-2">
            <span>{r.n}</span>
            <span className="flex items-center gap-2">
              <span className="rupee font-mono tabular-nums">{formatAmount(r.a)}</span>
              <StatusPill tone="destructive">90+</StatusPill>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-end">
        <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Remind all</span>
      </div>
    </Mock>
  )
}
