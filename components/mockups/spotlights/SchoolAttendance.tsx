// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { cn } from '@/lib/utils'
import { Mock } from '../parts'

const TILES = [
  { c: '6-A', v: '97%' },
  { c: '6-B', v: '92%' },
  { c: '7-A', v: null },
  { c: '7-B', v: '95%' },
  { c: '8-A', v: '89%' },
  { c: '8-B', v: '96%' },
  { c: '9-A', v: '93%' },
  { c: '9-B', v: '94%' },
]

export function SchoolAttendanceSpot() {
  return (
    <Mock label="Whole-school attendance today: 94.2 percent, with class tiles, and 7-A not yet marked" className="mx-auto w-full max-w-md">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold">Today · whole school</p>
        <p className="font-mono text-2xl font-semibold tabular-nums text-primary">94.2%</p>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {TILES.map((t, i) => (
          <div
            key={t.c}
            className={cn('mv-fade rounded-lg border p-2.5', t.v ? 'bg-background' : 'border-warning/40 bg-warning/10')}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <p className="text-xs text-muted-foreground">{t.c}</p>
            <p className={cn('mt-0.5 font-mono text-sm font-semibold tabular-nums', !t.v && 'text-warning')}>{t.v ?? 'Not marked'}</p>
          </div>
        ))}
      </div>
    </Mock>
  )
}
