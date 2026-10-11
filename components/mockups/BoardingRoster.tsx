import { Bus, MapPin } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Mock, MockTitle } from './parts'

/* ── Transport: boarding roster ─────────────────────────────────────── */

export function BoardingRosterMock({ className }: { className?: string }) {
  const rows = [
    { name: 'Ishaan', at: '07:12' },
    { name: 'Ananya', at: '07:15' },
    { name: 'Rohan', at: null },
  ]
  return (
    <Mock label="Route 4 morning trip roster: Ishaan boarded 07:12, Ananya boarded 07:15, Rohan not boarded; last location update 07:18" className={className}>
      <MockTitle right={<StatusPill tone="primary"><Bus className="h-3 w-3" />In progress</StatusPill>}>Route 4 · Morning trip</MockTitle>
      <ul className="divide-y">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between py-2">
            <span className="text-sm font-medium">{r.name}</span>
            {r.at ? (
              <StatusPill tone="success" className="font-mono tabular-nums">Boarded {r.at}</StatusPill>
            ) : (
              <StatusPill tone="warning">Not boarded</StatusPill>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-2 flex items-center gap-1.5 border-t pt-2.5 text-[11px] text-muted-foreground">
        <MapPin className="h-3 w-3" />
        Last location update · <span className="font-mono tabular-nums">07:18</span>
      </p>
    </Mock>
  )
}
