// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { cn } from '@/lib/utils'
import { Mock } from '../parts'

const STUDENTS = [
  { n: 'Aditi Rao', s: '6-A', h: 'Raman', p: '98•••• 4410', sel: false },
  { n: 'Arjun Das', s: '6-A', h: 'Tagore', p: '97•••• 1182', sel: true },
  { n: 'Fatima Sheikh', s: '6-B', h: 'Tagore', p: '99•••• 7720', sel: true },
  { n: 'Kabir Shah', s: '6-A', h: 'Tagore', p: '90•••• 3391', sel: true },
  { n: 'Meera Joshi', s: '6-B', h: 'Bose', p: '98•••• 0057', sel: false },
]

export function BulkEditSpot() {
  return (
    <Mock label="A grid of five students with three selected and their house set to Tagore in one action" className="w-full overflow-x-auto">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-sm font-semibold">Class 6 · 3 selected</span>
        <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">Set house → Tagore</span>
      </div>
      <table className="w-full min-w-[420px] text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th className="w-6 py-1.5" />
            <th className="py-1.5 font-medium">Name</th>
            <th className="py-1.5 font-medium">Section</th>
            <th className="py-1.5 font-medium">House</th>
            <th className="py-1.5 font-medium">Phone</th>
          </tr>
        </thead>
        <tbody>
          {STUDENTS.map((r, i) => (
            <tr key={r.n} className={cn('border-b border-border/60', r.sel && 'bg-primary/5')}>
              <td className="py-1.5">
                <span className={cn('flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border', r.sel ? 'border-primary bg-primary' : 'border-input')} />
              </td>
              <td className="py-1.5 font-medium">{r.n}</td>
              <td className="py-1.5">{r.s}</td>
              <td className="py-1.5">
                <span
                  className={cn('rounded px-1.5 py-0.5', r.sel && 'mv-pop bg-success/10 font-medium text-success ring-1 ring-success/30')}
                  style={r.sel ? { animationDelay: `${200 + i * 60}ms` } : undefined}
                >
                  {r.h}
                </span>
              </td>
              <td className="py-1.5 font-mono text-xs tabular-nums text-muted-foreground">{r.p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Mock>
  )
}
