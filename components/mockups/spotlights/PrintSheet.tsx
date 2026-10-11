// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { Printer } from 'lucide-react'

export function PrintSheetSpot() {
  return (
    <div
      role="img"
      aria-label="A print preview of an A4 sheet with 8 student ID cards for class 6-A, and a Print 6-A (38) button"
      className="flex w-full flex-col items-center gap-3"
    >
      <div className="grid w-full max-w-[300px] grid-cols-2 gap-2 rounded-md border bg-card p-3 shadow-sm">
        {['Aditi R.', 'Arjun D.', 'Fatima S.', 'Kabir S.', 'Meera J.', 'Neel B.', 'Riya M.', 'Sana K.'].map((n, i) => (
          <div key={n} className="mv-fade flex items-center gap-2 rounded border p-1.5" style={{ animationDelay: `${i * 40}ms` }}>
            <span className="h-7 w-6 shrink-0 rounded-sm bg-muted" />
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-semibold">{n}</span>
              <span className="block text-[10px] text-muted-foreground">6-A · Roll {i + 1}</span>
            </span>
          </div>
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
        <Printer className="h-3.5 w-3.5" />
        Print 6-A (38)
      </span>
    </div>
  )
}
