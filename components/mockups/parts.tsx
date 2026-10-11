import { cn } from '@/lib/utils'

// Static mock-ups of product UI, made of the app's own primitives so they look
// like the app, switch theme with the page and never go stale the way
// screenshots do (plan.md §3.6). Data follows module-features-plan.md §5;
// names and numbers are invented.

export function Mock({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div role="img" aria-label={label} className={cn('select-none rounded-xl border bg-card p-4 text-card-foreground', className)}>
      {children}
    </div>
  )
}

export function MockTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <p className="min-w-0 truncate text-sm font-semibold">{children}</p>
      {right}
    </div>
  )
}

export function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{children}</p>
}

/** Looks like the app's primary button, but is part of a picture, not a control. */
export function FakeButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex h-8 items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow', className)}>
      {children}
    </span>
  )
}

