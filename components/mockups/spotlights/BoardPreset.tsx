// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Mock } from '../parts'

const PRESETS = ['CBSE', 'ICSE', 'Generic']
const RULES = [
  { k: 'Grade scale', v: 'A1 – E' },
  { k: 'Pass mark', v: '33%', edit: '35%' },
  { k: 'Grace marks', v: 'Up to 5' },
]

export function BoardPresetSpot() {
  return (
    <div
      role="img"
      aria-label="Three board presets with CBSE selected, applied to a rule list of grade scale A1 to E, pass mark being edited from 33 to 35 percent, and grace up to 5"
      className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <div className="flex gap-2 sm:flex-col">
        {PRESETS.map((p, i) => (
          <div
            key={p}
            className={cn(
              'flex w-24 items-center justify-between rounded-lg border bg-card px-3 py-2 text-sm font-semibold',
              i === 0 ? 'border-primary ring-1 ring-primary' : 'text-muted-foreground',
            )}
          >
            {p}
            {i === 0 && <Check className="h-4 w-4 text-primary" strokeWidth={3} />}
          </div>
        ))}
      </div>
      <ArrowRight className="mv-grow-x h-5 w-5 rotate-90 text-muted-foreground sm:rotate-0" />
      <Mock label="" className="w-full max-w-[260px]">
        <p className="mb-2 text-sm font-semibold">Rules · Class 10</p>
        <ul className="divide-y text-sm">
          {RULES.map((r) => (
            <li key={r.k} className="flex items-center justify-between gap-2 py-2">
              <span className="text-muted-foreground">{r.k}</span>
              {r.edit ? (
                <span className="flex items-center gap-1.5 font-mono tabular-nums">
                  <span className="text-muted-foreground line-through">{r.v}</span>
                  <span className="mv-pop rounded-md border border-primary bg-background px-1.5 py-0.5 text-primary ring-2 ring-primary/20" style={{ animationDelay: '300ms' }}>
                    {r.edit}
                  </span>
                </span>
              ) : (
                <span className="font-mono">{r.v}</span>
              )}
            </li>
          ))}
        </ul>
      </Mock>
    </div>
  )
}
