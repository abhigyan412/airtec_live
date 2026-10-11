import { Check } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { formatAmount } from '@/lib/utils'

/* ── Family portal home on a phone (hero, role tab) ─────────────────── */

// Sized for a phone frame as narrow as ~170px: numbers use Inter tabular
// figures rather than the wider mono face, every text cell can shrink and
// truncate, and pills never wrap into their labels.
export function PortalPhoneMock() {
  return (
    <div role="img" aria-label="Family portal on a phone: attendance, fees due with a pay button, and homework" className="select-none bg-background p-2.5 text-foreground">
      <p className="text-[10px] text-muted-foreground">Good morning</p>
      <p className="truncate text-[13px] font-bold tracking-tight">Diya · Class I-A</p>
      <div className="mt-2.5 grid grid-cols-2 gap-1.5">
        <div className="min-w-0 rounded-lg border bg-card px-2 py-1.5">
          <p className="truncate text-[10px] text-muted-foreground">Attendance</p>
          <p className="text-sm font-semibold tabular-nums">96%</p>
        </div>
        <div className="min-w-0 rounded-lg border bg-card px-2 py-1.5">
          <p className="truncate text-[10px] text-muted-foreground">Fees due</p>
          <p className="rupee truncate text-sm font-semibold tabular-nums">{formatAmount(6500)}</p>
        </div>
      </div>
      <div className="mt-2 rounded-lg bg-primary py-1.5 text-center text-[11px] font-medium text-primary-foreground">Pay now</div>
      <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">Homework</p>
      <ul className="mt-1 space-y-1">
        <li className="flex items-center gap-1.5 rounded-md border bg-card px-2 py-1.5 text-[11px]">
          <span className="min-w-0 flex-1 truncate">EVS worksheet</span>
          <StatusPill tone="success" className="shrink-0 gap-0.5 px-1.5 py-px text-[10px]">
            <Check className="h-2.5 w-2.5" />
            Done
          </StatusPill>
        </li>
        <li className="flex items-center gap-1.5 rounded-md border bg-card px-2 py-1.5 text-[11px]">
          <span className="min-w-0 flex-1 truncate">Hindi reading</span>
          <StatusPill tone="warning" className="shrink-0 px-1.5 py-px text-[10px]">
            Today
          </StatusPill>
        </li>
      </ul>
    </div>
  )
}
