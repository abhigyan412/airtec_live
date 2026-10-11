import { StatusPill } from '@/components/site/status-pill'
import { Mock, MockTitle } from './parts'

/* ── Attendance: class marking (home role tab) ──────────────────────── */

export function AttendanceMock({ className }: { className?: string }) {
  const rows = [
    { name: 'Aditi', s: 'Present' },
    { name: 'Rohan', s: 'Present' },
    { name: 'Zoya', s: 'Absent' },
    { name: 'Kian', s: 'Present' },
  ]
  return (
    <Mock label="Class attendance for VII-A: 38 of 40 present" className={className}>
      <MockTitle right={<span className="font-mono text-xs tabular-nums text-muted-foreground">38 / 40</span>}>VII-A · Today</MockTitle>
      <ul className="grid grid-cols-2 gap-1.5">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between rounded-lg border px-2.5 py-1.5">
            <span className="text-sm">{r.name}</span>
            <StatusPill tone={r.s === 'Present' ? 'success' : 'destructive'}>{r.s}</StatusPill>
          </li>
        ))}
      </ul>
    </Mock>
  )
}
