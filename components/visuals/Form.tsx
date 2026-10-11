import { Check } from 'lucide-react'
import type { Visual } from '@/content/modules'
import { Pill } from './parts'

type V = Extract<Visual, { type: 'form' }>

/** V14 · a mini input or upload field with a value and a check. The value types in, then the check appears. */
export function FormVisual({ v }: { v: V }) {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      <span className="flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
        {v.field}
        {v.tag && <Pill label={v.tag} tone="success" className="px-1.5 py-0" />}
      </span>
      <div className="flex items-center gap-2 rounded-md border border-input bg-background px-2 py-1.5">
        <span className="mv-type min-w-0 truncate font-mono text-xs text-foreground">{v.value}</span>
        <Check className="mv-pop ml-auto h-3.5 w-3.5 shrink-0 text-success" strokeWidth={3} style={{ animationDelay: '420ms' }} />
      </div>
      {v.result && (
        <span className="mv-fade text-xs font-medium text-success" style={{ animationDelay: '420ms' }}>
          {v.result}
        </span>
      )}
    </div>
  )
}
