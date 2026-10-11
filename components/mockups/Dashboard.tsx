import { AlertTriangle, IndianRupee, Lock, UserCheck, Users } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { cn, formatAmount } from '@/lib/utils'

/* ── Staff dashboard for the home hero ──────────────────────────────── */

export function DashboardMock() {
  const stats = [
    { label: 'Students', value: '1,248', icon: Users },
    { label: 'Staff present', value: '86/91', icon: UserCheck },
    { label: 'Collected today', value: formatAmount(184500), icon: IndianRupee, rupee: true },
    { label: 'Uncovered periods', value: '2', icon: AlertTriangle },
  ]
  const nav = ['Dashboard', 'Admissions', 'Students', 'Fees', 'Timetable', 'Exams', 'Library']
  return (
    <div
      role="img"
      aria-label="AIRTEC staff dashboard: students, staff present, fees collected today, uncovered periods, and today's cover and admissions"
      className="flex select-none text-foreground"
    >
      <aside className="hidden w-36 shrink-0 border-r bg-sidebar p-2 sm:block">
        {nav.map((n, i) => (
          <div
            key={n}
            className={cn('rounded-md px-2 py-1.5 text-[11px] font-medium', i === 0 ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-muted-foreground')}
          >
            {n}
          </div>
        ))}
      </aside>
      <div className="min-w-0 flex-1 bg-background p-3">
        <p className="text-xs font-semibold">Good morning, Principal</p>
        <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border bg-card p-2">
              <div className="flex items-center justify-between">
                <p className="truncate text-[10px] text-muted-foreground">{s.label}</p>
                <s.icon className="h-3 w-3 text-primary" />
              </div>
              <p className={cn('mt-0.5 font-mono text-sm font-semibold tabular-nums', s.rupee && 'rupee')}>{s.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-2 lg:grid-cols-2">
          <div className="rounded-lg border bg-card p-2">
            <p className="text-[11px] font-semibold">Today’s cover</p>
            <ul className="mt-1 space-y-1 text-[10px]">
              <li className="flex items-center justify-between">
                <span>P-III · VII-A · Maths</span>
                <StatusPill tone="success" className="px-1.5 text-[10px]">Ms. Rao</StatusPill>
              </li>
              <li className="flex items-center justify-between">
                <span>P-V · IX-C · Science</span>
                <StatusPill tone="destructive" className="px-1.5 text-[10px]">Uncovered</StatusPill>
              </li>
              <li className="flex items-center justify-between">
                <span>P-VI · VI-B · English</span>
                <StatusPill tone="warning" className="px-1.5 text-[10px]">Awaiting ack</StatusPill>
              </li>
            </ul>
          </div>
          <div className="rounded-lg border bg-card p-2">
            <p className="text-[11px] font-semibold">Admissions</p>
            <ul className="mt-1 space-y-1 text-[10px]">
              <li className="flex items-center justify-between">
                <span>Nursery</span>
                <span className="font-mono tabular-nums text-muted-foreground">38/40</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Class I</span>
                <span className="font-mono tabular-nums text-muted-foreground">36/40</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Class XI</span>
                <StatusPill tone="muted" className="px-1.5 text-[10px]">
                  <Lock className="h-2.5 w-2.5" />
                  Locked
                </StatusPill>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
