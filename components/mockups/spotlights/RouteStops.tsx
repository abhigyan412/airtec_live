// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { School } from 'lucide-react'
import { Mock } from '../parts'

// A schematic, not a map, so it never suggests live GPS (plan.md §8).
const STOPS = [
  { s: 'Sector 9', t: '07:05', n: 6 },
  { s: 'Park Gate', t: '07:18', n: 9 },
  { s: 'Lake Road', t: '07:30', n: 5 },
]

export function RouteStopsSpot() {
  return (
    <Mock label="Route 4 schematic: Sector 9 at 07:05 with 6 students, Park Gate 07:18 with 9, Lake Road 07:30 with 5, School 07:45" className="mx-auto w-full max-w-sm">
      <p className="mb-4 text-sm font-semibold">Route 4 · Morning</p>
      <ol className="relative ml-3 border-l-2 border-primary/30 pl-6">
        {STOPS.map((st, i) => (
          <li key={st.s} className="mv-fade relative pb-5" style={{ animationDelay: `${i * 80}ms` }}>
            <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-medium">{st.s}</span>
              <span className="font-mono text-sm tabular-nums text-muted-foreground">{st.t}</span>
            </div>
            <span className="text-xs text-muted-foreground">{st.n} students</span>
          </li>
        ))}
        <li className="relative">
          <span className="absolute -left-[33px] top-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <School className="h-3 w-3" />
          </span>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-semibold">School</span>
            <span className="font-mono text-sm tabular-nums text-muted-foreground">07:45</span>
          </div>
        </li>
      </ol>
    </Mock>
  )
}
