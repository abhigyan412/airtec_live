// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { CheckCircle2 } from 'lucide-react'
import { PhoneFrame } from '@/components/site/frames'

const QR = ['1110101', '1010001', '1110111', '0001010', '1011101', '0100011', '1101011']

export function QrApplySpot() {
  return (
    <div
      role="img"
      aria-label="An A4 poster reading Admissions open 2027 to 28 with a QR code, and a phone showing the apply form half filled for Aditi, Class 1, then Application received"
      className="flex w-full items-end justify-center gap-5"
    >
      <div className="flex w-44 flex-col items-center rounded-lg border bg-card p-4 shadow-sm">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">Greenfield Public School</p>
        <p className="mt-1 text-center text-base font-bold leading-tight">Admissions open 2027–28</p>
        <svg viewBox="0 0 7 7" className="mt-3 h-24 w-24 text-foreground" shapeRendering="crispEdges" aria-hidden>
          {QR.flatMap((row, y) => row.split('').map((c, x) => (c === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null)))}
        </svg>
        <p className="mt-2 text-xs text-muted-foreground">Scan to apply</p>
      </div>
      <PhoneFrame className="w-44">
        <div className="space-y-2 bg-background p-3 text-xs">
          <p className="text-sm font-semibold">Apply online</p>
          <div>
            <p className="text-muted-foreground">Child’s name</p>
            <p className="rounded-md border border-input px-2 py-1 font-medium">Aditi</p>
          </div>
          <div>
            <p className="text-muted-foreground">Class</p>
            <p className="rounded-md border border-input px-2 py-1 font-medium">1</p>
          </div>
          <div>
            <p className="text-muted-foreground">Birth certificate</p>
            <p className="rounded-md border border-dashed border-input px-2 py-1 text-muted-foreground">photo.jpg ✓</p>
          </div>
          <div className="mv-pop flex items-center gap-1.5 rounded-md bg-success/10 p-2 font-medium text-success" style={{ animationDelay: '300ms' }}>
            <CheckCircle2 className="h-3.5 w-3.5" />
            Application received · Track status
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}
