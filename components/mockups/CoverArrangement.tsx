import { StatusPill } from '@/components/site/status-pill'
import { cn } from '@/lib/utils'
import { Mock, Label, FakeButton } from './parts'

/* ── Timetable: cover arrangement ───────────────────────────────────── */

export function CoverMock({ className }: { className?: string }) {
  const rows = [
    { name: 'Ms. Rao', detail: 'Free · Same subject', pill: <StatusPill tone="success">Best match</StatusPill>, best: true },
    { name: 'Mr. Khan', detail: 'Free · 4 periods today' },
    { name: 'Ms. Iyer', detail: 'At daily limit', pill: <StatusPill tone="warning">At limit</StatusPill>, off: true },
  ]
  return (
    <Mock label="Cover for period 3, VII-A Maths, Mr. Verma absent: Ms. Rao suggested first as free and same subject, Mr. Khan free, Ms. Iyer at her daily limit" className={className}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold">P-III · VII-A · Maths</p>
          <p className="text-[11px] text-muted-foreground">Mr. Verma absent</p>
        </div>
        <StatusPill tone="destructive">Uncovered</StatusPill>
      </div>
      <div className="mt-3">
        <Label>Suggested</Label>
      </div>
      <ul className="mt-1.5 space-y-1.5">
        {rows.map((r) => (
          <li
            key={r.name}
            className={cn(
              'flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2',
              r.best && 'border-primary/40 bg-sidebar-accent',
              r.off && 'opacity-60',
            )}
          >
            <span className="min-w-0">
              <span className={cn('block text-sm font-medium', r.best && 'text-sidebar-accent-foreground')}>{r.name}</span>
              <span className="block truncate text-[11px] text-muted-foreground">{r.detail}</span>
            </span>
            {r.pill}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-end">
        <FakeButton>Assign Ms. Rao</FakeButton>
      </div>
    </Mock>
  )
}
