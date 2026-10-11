import { ArrowDown, ArrowRight, CalendarDays, Fingerprint, UserX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Mock } from './parts'

/* ── HR: biometric to cover chain ───────────────────────────────────── */

export function BiometricChainMock({ className }: { className?: string }) {
  const steps = [
    { icon: Fingerprint, k: 'Biometric', v: 'No check-in 07:40' },
    { icon: UserX, k: 'Absence proposed', v: 'Mr. Verma' },
    { icon: CalendarDays, k: '3 periods', v: 'Sent to cover' },
  ]
  return (
    <Mock label="Biometric shows no check-in at 07:40, an absence is proposed for Mr. Verma, and his 3 periods are sent to cover" className={className}>
      <ol className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:items-center">
        {steps.map((s, i) => (
          <li key={s.k} className="flex flex-col items-center gap-1.5 sm:flex-1 sm:flex-row">
            <div className={cn('w-full rounded-lg border p-3', i === 2 ? 'border-primary/40 bg-sidebar-accent' : 'bg-background')}>
              <s.icon className={cn('h-4 w-4', i === 2 ? 'text-sidebar-accent-foreground' : 'text-primary')} />
              <p className={cn('mt-2 text-xs font-semibold', i === 2 && 'text-sidebar-accent-foreground')}>{s.k}</p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{s.v}</p>
            </div>
            {i < steps.length - 1 && (
              <>
                <ArrowDown className="h-4 w-4 shrink-0 text-muted-foreground sm:hidden" />
                <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
              </>
            )}
          </li>
        ))}
      </ol>
    </Mock>
  )
}
