// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { cn } from '@/lib/utils'
import { Mock } from '../parts'

const ROWS = [
  { k: 'Fees', on: true },
  { k: 'Homework', on: true },
  { k: 'Exams and results', on: true },
  { k: 'Library', on: false },
]

export function MuteSettingsSpot() {
  return (
    <Mock label="Notification settings: fees, homework and exams on, library muted by the parent" className="mx-auto w-full max-w-sm">
      <p className="mb-2 text-sm font-semibold">Notifications</p>
      <ul className="divide-y">
        {ROWS.map((r) => (
          <li key={r.k} className="flex items-center justify-between py-2.5">
            <span className="text-sm">
              {r.k}
              {!r.on && <span className="ml-2 text-xs text-muted-foreground">Muted by you</span>}
            </span>
            <span className={cn('relative inline-flex h-5 w-9 items-center rounded-full', r.on ? 'mv-track bg-primary' : 'bg-input/60')}>
              <span className={cn('absolute h-4 w-4 rounded-full bg-background shadow', r.on ? 'mv-knob left-[18px]' : 'left-0.5')} />
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">New notification types are switched on automatically.</p>
    </Mock>
  )
}
