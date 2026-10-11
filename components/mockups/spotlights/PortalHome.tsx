// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { ChevronDown } from 'lucide-react'
import { PhoneFrame } from '@/components/site/frames'
import { StatusPill } from '@/components/site/status-pill'

export function PortalHomeSpot() {
  return (
    <div role="img" aria-label="Family portal home on a phone for Meera, 6-A: attendance 96 percent, no fees due, 2 homework pending, bus boarded at 07:12" className="flex w-full justify-center">
      <PhoneFrame className="w-56">
        <div className="space-y-2.5 bg-background p-3">
          <div className="flex items-center justify-between rounded-lg border bg-card px-2.5 py-1.5 text-sm font-semibold">
            Meera · 6-A
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { k: 'Attendance', v: <span className="font-mono text-lg font-semibold tabular-nums">96%</span> },
              { k: 'Fees', v: <StatusPill tone="success"><span className="rupee">0</span>&nbsp;due</StatusPill> },
              { k: 'Homework', v: <StatusPill tone="warning">2 pending</StatusPill> },
              { k: 'Bus', v: <StatusPill tone="success">Boarded 07:12</StatusPill> },
            ].map((t, i) => (
              <div key={t.k} className="mv-fade rounded-lg border bg-card p-2" style={{ animationDelay: `${i * 60}ms` }}>
                <p className="text-[11px] text-muted-foreground">{t.k}</p>
                <div className="mt-1">{t.v}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg border bg-card p-2 text-xs">
            <p className="text-[11px] text-muted-foreground">Today</p>
            <p className="font-medium">Maths · Science · Hindi · PT</p>
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}
