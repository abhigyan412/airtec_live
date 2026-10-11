// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { Check, FileSpreadsheet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Mock } from '../parts'

const STEPS = [
  { k: 'Generated', done: true },
  { k: 'Approved', done: true },
  { k: 'Bank file', done: false },
]

export function PayrollRunSpot() {
  return (
    <Mock label="Payroll run for October 2026: 64 staff, 28.6 lakh rupees, generated and approved, with the bank export file ready" className="mx-auto w-full max-w-md">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold">October 2026 · 64 staff</p>
        <p className="font-mono text-xl font-semibold tabular-nums">
          <span className="rupee">28.6L</span>
        </p>
      </div>
      <ol className="mt-5 flex items-center">
        {STEPS.map((s, i) => (
          <li key={s.k} className="flex flex-1 items-center last:flex-none">
            <span className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                  s.done ? 'bg-success text-success-foreground' : 'mv-pop border-2 border-primary text-primary',
                )}
                style={!s.done ? { animationDelay: '300ms' } : undefined}
              >
                {s.done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className="text-xs">{s.k}</span>
            </span>
            {i < STEPS.length - 1 && <span className="mv-grow-x mx-2 mb-5 h-0.5 flex-1 bg-success" style={{ animationDelay: `${i * 120}ms` }} />}
          </li>
        ))}
      </ol>
      <div className="mt-5 flex items-center justify-between rounded-lg border bg-background px-3 py-2">
        <span className="flex items-center gap-2 font-mono text-sm">
          <FileSpreadsheet className="h-4 w-4 text-success" />
          bank-export-oct.csv
        </span>
        <span className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">Download</span>
      </div>
    </Mock>
  )
}
