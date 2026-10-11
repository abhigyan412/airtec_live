// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { StatusPill } from '@/components/site/status-pill'
import { Mock } from '../parts'

export function StudentProfileSpot() {
  return (
    <Mock label="Student profile for Meera Joshi, 6-A, roll 21, Tagore house: attendance 94 percent, fees paid, one library book out" className="mx-auto w-full max-w-md">
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">MJ</span>
        <div>
          <p className="text-lg font-semibold">Meera Joshi</p>
          <p className="text-sm text-muted-foreground">6-A · Roll 21 · House Tagore</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { k: 'Attendance', v: <span className="font-mono text-base font-semibold tabular-nums">94%</span> },
          { k: 'Fees', v: <StatusPill tone="success">Paid</StatusPill> },
          { k: 'Library', v: <StatusPill tone="warning">1 book out</StatusPill> },
        ].map((t, i) => (
          <div key={t.k} className="mv-fade rounded-lg border bg-background p-2.5" style={{ animationDelay: `${i * 60}ms` }}>
            <p className="text-xs text-muted-foreground">{t.k}</p>
            <div className="mt-1">{t.v}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-1.5 text-sm">
        <div className="flex justify-between border-b pb-1.5"><span className="text-muted-foreground">Guardian</span><span>Anil Joshi · Father</span></div>
        <div className="flex justify-between border-b pb-1.5"><span className="text-muted-foreground">Documents</span><span>Birth certificate, TC, Photo</span></div>
      </div>
    </Mock>
  )
}
