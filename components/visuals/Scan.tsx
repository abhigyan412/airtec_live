import type { Visual } from '@/content/modules'
import { Pill } from './parts'

type V = Extract<Visual, { type: 'scan' }>

// Deterministic patterns so the picture never changes between renders.
const BARS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2]
const QR = [
  '1110101', '1010001', '1110111', '0001010', '1011101', '0100011', '1101011',
]

function Code({ kind }: { kind: V['kind'] }) {
  if (kind === 'qr') {
    return (
      <svg viewBox="0 0 7 7" className="h-14 w-14 text-foreground" shapeRendering="crispEdges">
        {QR.flatMap((row, y) =>
          row.split('').map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null)),
        )}
      </svg>
    )
  }
  let x = 0
  return (
    <svg viewBox="0 0 40 20" className="h-12 w-24 text-foreground" preserveAspectRatio="none" shapeRendering="crispEdges">
      {BARS.map((w, i) => {
        const rect = i % 2 === 0 ? <rect key={i} x={x} y="0" width={w * 0.7} height="20" fill="currentColor" /> : null
        x += w * 0.7
        return rect
      })}
    </svg>
  )
}

/** V11 · a barcode or QR with a scan line. The line sweeps, then the result pill appears. */
export function ScanVisual({ v }: { v: V }) {
  return (
    <div className="flex h-full items-center justify-center gap-3">
      <div className="relative rounded-md border bg-card p-1.5">
        <Code kind={v.kind} />
        <span className="mv-sweep absolute inset-x-0 h-0.5 bg-primary opacity-0 shadow-[0_0_8px_hsl(var(--primary))]" style={{ top: '100%' }} />
      </div>
      <span className="mv-pop" style={{ animationDelay: '400ms' }}>
        <Pill label={v.result.label} tone={v.result.tone} />
      </span>
    </div>
  )
}
