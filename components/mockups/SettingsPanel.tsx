import { cn } from '@/lib/utils'
import { Mock, MockTitle } from './parts'

/* ── /why-airtec: settings panel ────────────────────────────────────── */

export function SettingsPanelMock({ className }: { className?: string }) {
  const settings = [
    { k: 'Admission fee hold', v: '7 days' },
    { k: 'Waitlist response time', v: '3 days' },
    { k: 'Late homework submission', v: 'Allowed', on: true },
    { k: 'Resubmission', v: 'Off', on: false },
    { k: 'Max periods per teacher / day', v: '7' },
  ]
  return (
    <Mock
      label="School settings panel: fee hold 7 days, waitlist response 3 days, late homework allowed, resubmission off, max 7 periods per teacher per day"
      className={className}
    >
      <MockTitle right={<span className="text-[11px] text-muted-foreground">Safe defaults</span>}>School settings</MockTitle>
      <ul className="divide-y">
        {settings.map((s) => (
          <li key={s.k} className="flex items-center justify-between gap-3 py-2">
            <span className="text-sm">{s.k}</span>
            {s.on === undefined ? (
              <span className="rounded-md border border-input bg-background px-2 py-0.5 font-mono text-xs">{s.v}</span>
            ) : (
              <span className={cn('relative inline-flex h-5 w-9 shrink-0 items-center rounded-full', s.on ? 'bg-primary' : 'bg-input/60')}>
                <span className={cn('absolute h-4 w-4 rounded-full bg-background shadow', s.on ? 'left-[18px]' : 'left-0.5')} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </Mock>
  )
}
