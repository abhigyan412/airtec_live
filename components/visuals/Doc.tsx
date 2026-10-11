import { Download } from 'lucide-react'
import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { Rich } from './parts'

type V = Extract<Visual, { type: 'doc' }>

function Sheet({ v, className, top }: { v: V; className?: string; top?: boolean }) {
  if (v.kind === 'id') {
    return (
      <div className={cn('flex h-[72px] w-[60px] flex-col items-center rounded-md border bg-card p-1.5 shadow-sm', className)}>
        <div className="h-2 w-full rounded-sm bg-primary/70" />
        <div className="mt-1 h-5 w-5 rounded-full bg-muted" />
        {top && (
          <>
            <span className="mt-1 w-full truncate text-center text-[11px] font-semibold leading-tight">{v.heading.split(' ')[0]}</span>
            {v.sub && <span className="w-full truncate text-center text-[10px] leading-tight text-muted-foreground">{v.sub.split(' · ')[0]}</span>}
          </>
        )}
      </div>
    )
  }
  return (
    <div className={cn('relative flex h-[76px] w-[112px] flex-col rounded-md border bg-card p-1.5 shadow-sm', v.kind === 'card' && 'h-[64px] w-[124px]', className)}>
      <div className="flex items-center gap-1">
        <span className="h-2.5 w-2.5 rounded-sm bg-primary/70" />
        <span className="truncate text-[11px] font-semibold leading-none text-foreground">{top ? v.heading : ''}</span>
      </div>
      {top && v.sub ? (
        <span className="mt-1.5 truncate text-xs text-foreground">
          <Rich text={v.sub} />
        </span>
      ) : (
        <span className="mt-1.5 h-1 w-4/5 rounded-full bg-muted" />
      )}
      <span className="mt-1 h-1 w-3/5 rounded-full bg-muted" />
      <span className="mt-1 h-1 w-2/3 rounded-full bg-muted" />
      {top && v.number && (
        <span className="mv-stamp absolute bottom-1 right-1 rounded border border-primary/50 bg-primary/10 px-1 font-mono text-[11px] font-semibold text-primary" style={{ animationDelay: '200ms' }}>
          <Rich text={v.number} />
        </span>
      )}
      {top && v.tag && (
        <span className="absolute bottom-1 right-1 inline-flex items-center gap-0.5 rounded bg-muted px-1 text-[11px] text-muted-foreground">
          {v.tag === 'Download' && <Download className="h-2.5 w-2.5" />}
          {v.tag}
        </span>
      )}
    </div>
  )
}

/** V9 · a mini document: header, skeleton lines, a stamped number. Stacks fan out; the number stamps in. */
export function DocVisual({ v }: { v: V }) {
  const stack = Math.min(v.stack ?? 1, 3)
  if (v.kind === 'id' && stack > 1) {
    return (
      <div className="flex h-full items-center justify-center gap-2">
        <Sheet v={v} top />
        <Sheet v={{ ...v, heading: 'Kabir Shah', sub: '6-A · Roll 22' }} top />
      </div>
    )
  }
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative">
        {stack > 2 && <Sheet v={v} className="absolute left-0 top-0 -translate-x-5 -rotate-6 opacity-60" />}
        {stack > 1 && <Sheet v={v} className="absolute left-0 top-0 translate-x-5 rotate-6 opacity-80" />}
        <Sheet v={v} top className="relative" />
      </div>
    </div>
  )
}
