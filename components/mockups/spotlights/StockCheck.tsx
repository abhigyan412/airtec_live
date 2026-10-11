// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { StatusPill } from '@/components/site/status-pill'
import { Mock } from '../parts'

export function StockCheckSpot() {
  const pct = 4812 / 5000
  const r = 42
  const c = 2 * Math.PI * r
  return (
    <Mock label="Stock check: 4,812 of 5,000 copies scanned, with three copies listed missing by accession number" className="mx-auto w-full max-w-md">
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 100 100" className="h-28 w-28 shrink-0 -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
          <circle cx="50" cy="50" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
        </svg>
        <div>
          <p className="font-mono text-2xl font-semibold tabular-nums">4,812</p>
          <p className="text-sm text-muted-foreground">of 5,000 scanned</p>
        </div>
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Not scanned</p>
      <ul className="mt-1.5 divide-y text-sm">
        {[
          { a: 'ACC-01482', t: 'Panchatantra' },
          { a: 'ACC-02219', t: 'Swami and Friends' },
          { a: 'ACC-03075', t: 'The Blue Umbrella' },
        ].map((b, i) => (
          <li key={b.a} className="mv-fade flex items-center justify-between py-1.5" style={{ animationDelay: `${i * 60}ms` }}>
            <span>{b.t}</span>
            <StatusPill tone="warning" className="font-mono">{b.a}</StatusPill>
          </li>
        ))}
      </ul>
    </Mock>
  )
}
