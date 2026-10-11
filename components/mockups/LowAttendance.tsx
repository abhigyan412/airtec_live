import { StatusPill } from '@/components/site/status-pill'
import { cn } from '@/lib/utils'
import { Mock, MockTitle } from './parts'

/* ── Attendance: below threshold ────────────────────────────────────── */

function Sparkline({ points, className }: { points: number[]; className?: string }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const d = points
    .map((p, i) => `${(i / (points.length - 1)) * 48},${14 - ((p - min) / (max - min || 1)) * 12}`)
    .join(' ')
  return (
    <svg viewBox="0 0 48 16" className={cn('h-4 w-12', className)} aria-hidden>
      <polyline points={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LowAttendanceMock({ className }: { className?: string }) {
  const rows = [
    { name: 'Kabir', pct: 71, tone: 'warning' as const, trend: [86, 84, 80, 77, 74, 71] },
    { name: 'Sana', pct: 68, tone: 'destructive' as const, trend: [82, 79, 75, 73, 70, 68] },
    { name: 'Dev', pct: 62, tone: 'destructive' as const, trend: [78, 74, 71, 66, 64, 62] },
  ]
  return (
    <Mock label="Students below 75 percent attendance this term: Kabir 71, Sana 68, Dev 62, each trending down" className={className}>
      <MockTitle right={<span className="text-[11px] text-muted-foreground">Exam rule: 75%</span>}>Below 75% this term</MockTitle>
      <ul className="divide-y">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-3 py-2.5">
            <span className="text-sm font-medium">{r.name}</span>
            <span className="flex items-center gap-3">
              <Sparkline points={r.trend} className={r.tone === 'warning' ? 'text-warning' : 'text-destructive'} />
              <StatusPill tone={r.tone} className="w-12 justify-center font-mono tabular-nums">
                {r.pct}%
              </StatusPill>
            </span>
          </li>
        ))}
      </ul>
    </Mock>
  )
}
