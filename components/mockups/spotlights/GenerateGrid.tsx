// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Mock } from '../parts'

const SECTIONS = ['6-A', '6-B', '7-A', '7-B', '8-A', '8-B']
const SUBJ = ['bg-primary/70', 'bg-primary/40', 'bg-success/50', 'bg-warning/50', 'bg-primary/20', 'bg-muted-foreground/30']

export function GenerateSpot() {
  return (
    <Mock label="A generated master timetable of 6 sections by 8 periods filling in, with feasibility passed, zero conflicts, and Publish and Discard buttons" className="w-full">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="min-w-0 flex-1">
          <div className="grid gap-1" style={{ gridTemplateColumns: '2.25rem repeat(8, minmax(0, 1fr))' }}>
            <span />
            {Array.from({ length: 8 }, (_, p) => (
              <span key={p} className="text-center font-mono text-[11px] text-muted-foreground">
                {p + 1}
              </span>
            ))}
            {SECTIONS.map((s, r) => (
              <div key={s} className="contents">
                <span className="font-mono text-xs text-muted-foreground">{s}</span>
                {Array.from({ length: 8 }, (_, c) => (
                  <span
                    key={c}
                    className={cn('mv-fade h-5 rounded-sm', SUBJ[(r * 3 + c * 5) % SUBJ.length])}
                    style={{ animationDelay: `${Math.min((r * 8 + c) * 10, 470)}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:w-36">
          <div className="flex items-center justify-between rounded-md border bg-background px-2.5 py-1.5 text-xs">
            Feasibility <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
          </div>
          <div className="flex items-center justify-between rounded-md border bg-background px-2.5 py-1.5 text-xs">
            Conflicts <span className="font-mono font-semibold text-success">0</span>
          </div>
          <span className="mt-auto rounded-md bg-primary py-1.5 text-center text-xs font-medium text-primary-foreground">Publish</span>
          <span className="rounded-md border border-input py-1.5 text-center text-xs font-medium text-muted-foreground">Discard</span>
        </div>
      </div>
    </Mock>
  )
}
