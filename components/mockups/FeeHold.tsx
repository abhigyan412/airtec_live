import { Clock } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Mock, MockTitle } from './parts'

/* ── Admissions: fee-hold clock and waitlist (home tile) ────────────── */

export function FeeHoldMock({ className }: { className?: string }) {
  const rows = [
    { name: 'Aarav Mehta', pill: <StatusPill tone="warning"><Clock className="h-3 w-3" />Seat held · 3 days left</StatusPill> },
    { name: 'Diya Nair', pill: <StatusPill tone="success">Paid</StatusPill> },
    { name: 'Kabir Singh', pill: <StatusPill tone="primary">Reserved</StatusPill> },
    { name: 'Ira Kulkarni', pill: <StatusPill tone="muted">Waitlisted · #1</StatusPill> },
  ]
  return (
    <Mock label="Applications with a fee-hold countdown: one seat held with 3 days left, one paid, one reserved, one waitlisted first" className={className}>
      <MockTitle right={<span className="text-[11px] text-muted-foreground">Hold: 7 days</span>}>Fee holds · Class 1</MockTitle>
      <ul className="divide-y">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-2 py-2">
            <span className="truncate text-sm font-medium">{r.name}</span>
            {r.pill}
          </li>
        ))}
      </ul>
    </Mock>
  )
}
