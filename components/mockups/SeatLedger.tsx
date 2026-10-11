import { Clock } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { cn } from '@/lib/utils'
import { Mock, MockTitle } from './parts'

/* ── Admissions: seat ledger ─────────────────────────────────────────── */

const LEDGER = [
  { label: 'Confirmed', value: 96, cls: 'bg-primary' },
  { label: 'Reserved', value: 14, cls: 'bg-primary/50' },
  { label: 'Frozen', value: 4, cls: 'bg-muted-foreground/40' },
  { label: 'Available', value: 6, cls: 'bg-border' },
]

export function SeatLedgerMock({ className }: { className?: string }) {
  const capacity = LEDGER.reduce((s, x) => s + x.value, 0)
  return (
    <Mock
      label="Seat ledger for Class 1 with 120 seats: 96 confirmed, 14 reserved, 4 frozen, 6 available; Riya M.'s seat is held with 3 days left"
      className={className}
    >
      <MockTitle right={<span className="font-mono text-xs text-muted-foreground">{capacity} seats</span>}>Class 1</MockTitle>
      <div className="flex h-3 overflow-hidden rounded-full bg-muted">
        {LEDGER.map((s) => (
          <div key={s.label} className={s.cls} style={{ width: `${(s.value / capacity) * 100}%` }} />
        ))}
      </div>
      <dl className="mt-4 grid grid-cols-4 gap-2">
        {LEDGER.map((s) => (
          <div key={s.label} className="min-w-0">
            <dt className="flex items-center gap-1.5 truncate text-[11px] text-muted-foreground">
              <span className={cn('h-2 w-2 shrink-0 rounded-full', s.cls)} />
              {s.label}
            </dt>
            <dd className="mt-0.5 font-mono text-lg font-semibold tabular-nums">{s.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
        <span className="text-sm font-medium">Riya M.</span>
        <StatusPill tone="warning">
          <Clock className="h-3 w-3" />
          Seat held · 3 days left
        </StatusPill>
      </div>
    </Mock>
  )
}
