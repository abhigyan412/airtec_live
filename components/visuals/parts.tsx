import type { Tone } from '@/content/modules'
import { StatusPill } from '@/components/site/status-pill'
import { cn } from '@/lib/utils'

// Shared pieces for the micro-visuals (module-features-plan.md §4.5). Text is
// never under 12px, numbers are tabular, and colour comes only from tokens.

/** Renders "₹6,200" with the app's `.rupee` glyph so ₹ looks identical everywhere. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/₹\s?([\d,.]+(?:Cr|L|K)?)/)
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className="rupee tabular-nums">
            {p}
          </span>
        ) : (
          p
        ),
      )}
    </>
  )
}

export function Pill({ label, tone, className, style }: { label: string; tone: Tone; className?: string; style?: React.CSSProperties }) {
  return (
    <StatusPill tone={tone} className={cn('text-xs', className)}>
      <span style={style}>
        <Rich text={label} />
      </span>
    </StatusPill>
  )
}

export const TONE_TEXT: Record<Tone, string> = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  destructive: 'text-destructive',
  muted: 'text-muted-foreground',
}

/** A small box: neutral by default, tinted when it carries a tone. */
export const TONE_BOX: Record<Tone, string> = {
  primary: 'border-primary/40 bg-primary/10 text-primary',
  success: 'border-success/40 bg-success/10 text-success',
  warning: 'border-warning/40 bg-warning/10 text-warning',
  destructive: 'border-destructive/40 bg-destructive/10 text-destructive',
  muted: 'border-border bg-muted text-muted-foreground',
}

export const TONE_FILL: Record<Tone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  destructive: 'bg-destructive',
  muted: 'bg-muted-foreground/40',
}

/** Staggered delay for the n-th animated item. */
export const delay = (ms: number): React.CSSProperties => ({ animationDelay: `${ms}ms` })

/** A disabled-looking button inside a picture: decorative, never focusable. */
export function GhostButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex h-6 items-center rounded-md border border-input bg-background px-2 text-xs font-medium text-muted-foreground opacity-70', className)}>
      {children}
    </span>
  )
}

export function SolidButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex h-6 items-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground', className)}>
      {children}
    </span>
  )
}
