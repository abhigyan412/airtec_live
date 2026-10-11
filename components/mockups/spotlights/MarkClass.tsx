// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { cn } from '@/lib/utils'
import { Mock } from '../parts'

const KIDS = [
  { n: 'Aditi', a: false },
  { n: 'Rohan', a: true },
  { n: 'Zoya', a: false },
  { n: 'Kian', a: false },
  { n: 'Sana', a: true },
  { n: 'Dev', a: false },
]

export function MarkClassSpot() {
  return (
    <Mock label="Marking attendance for 7-B: everyone present by default and two students tapped absent; 36 present, 2 absent" className="mx-auto w-full max-w-md">
      <p className="mb-3 text-sm font-semibold">7-B · Today</p>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {KIDS.map((k, i) => (
          <li
            key={k.n}
            className={cn(
              'flex items-center justify-between rounded-lg border px-3 py-2.5',
              k.a ? 'mv-pop border-destructive/40 bg-destructive/10' : 'bg-background',
            )}
            style={k.a ? { animationDelay: `${200 + i * 40}ms` } : undefined}
          >
            <span className="text-sm font-medium">{k.n}</span>
            <span
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-bold',
                k.a ? 'bg-destructive text-destructive-foreground' : 'bg-success/15 text-success',
              )}
            >
              {k.a ? 'A' : 'P'}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-sm">
          <span className="font-mono font-semibold tabular-nums text-success">36</span> present ·{' '}
          <span className="font-mono font-semibold tabular-nums text-destructive">2</span> absent
        </span>
        <span className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">Save</span>
      </div>
    </Mock>
  )
}
