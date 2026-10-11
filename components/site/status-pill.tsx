import { STATUS_PILL, cn, type PillTone } from '@/lib/utils'

/** The app's signature `bg-X/10 text-X` pill. Status colours appear only inside mock-ups (plan §3.1). */
export function StatusPill({ tone, children, className }: { tone: PillTone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium', STATUS_PILL[tone], className)}>
      {children}
    </span>
  )
}
