import { cn } from '@/lib/utils'

export function BrowserFrame({ url, children, className }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border bg-card shadow-sm', className)}>
      <div className="flex items-center gap-3 border-b bg-muted/60 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="min-w-0 flex-1 truncate rounded-md bg-background px-2.5 py-1 text-center font-mono text-[11px] text-muted-foreground">
          {url}
        </div>
      </div>
      {children}
    </div>
  )
}

export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-[2rem] border-[6px] border-foreground/90 bg-background shadow-lg dark:border-border', className)}>
      <div className="mx-auto mt-1.5 h-1.5 w-14 rounded-full bg-foreground/20" aria-hidden />
      <div className="overflow-hidden rounded-b-[1.6rem]">{children}</div>
    </div>
  )
}
