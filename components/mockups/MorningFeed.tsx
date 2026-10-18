import { BellRing } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import type { PillTone } from '@/lib/utils'
import { formatAmount } from '@/lib/utils'

/* ── Home hero: one school morning, done by the scheduled jobs ──────── */

// Every line is a real job from DAY_TIMELINE (06:45 absences, 07:00 fee
// reminders, cover chasing, 08:00 uncovered alert); names and counts are
// invented. Rows fade in one after another when the card is in view.
const EVENTS: { time: string; text: string; pill: string; tone: PillTone }[] = [
  { time: '06:45', text: '3 teachers absent: 2 on leave, 1 no biometric check-in', pill: 'Absences built', tone: 'primary' },
  { time: '06:46', text: '11 periods need cover, free substitutes ranked', pill: 'Ranked', tone: 'primary' },
  { time: '07:00', text: 'Fee reminders sent to 184 families, RTE seats excluded', pill: 'Sent', tone: 'success' },
  { time: '07:12', text: 'Ms. Rao accepted P-III · VII-A · Maths', pill: 'Covered', tone: 'success' },
  { time: '07:30', text: 'Mr. Iyer hasn’t acknowledged P-V cover', pill: 'Reminded', tone: 'warning' },
  { time: '08:00', text: '1 period still uncovered, principal alerted', pill: 'Needs you', tone: 'destructive' },
]

export function MorningFeedMock() {
  return (
    <div
      role="img"
      aria-label="A school morning in AIRTEC: absences built at 6:45, substitutes ranked, fee reminders sent at 7:00, covers accepted and chased, and the principal alerted at 8:00 about the one period still uncovered"
      className="select-none bg-background p-3 text-foreground sm:p-4"
    >
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-sm font-semibold">Before the first bell</p>
        <p className="font-mono text-[11px] tabular-nums text-muted-foreground">Today · 08:00</p>
      </div>
      <p className="text-[11px] text-muted-foreground">Done by AIRTEC, without anyone asking</p>
      <ol className="mt-3 space-y-1.5">
        {EVENTS.map((e, i) => (
          <li
            key={e.time}
            className="mv-fade flex items-center gap-2.5 rounded-lg border bg-card px-2.5 py-2"
            style={{ animationDelay: `${150 + i * 260}ms` }}
          >
            <span className="w-10 shrink-0 font-mono text-[11px] font-medium tabular-nums text-primary">{e.time}</span>
            <span className="min-w-0 flex-1 text-[11.5px] leading-snug">{e.text}</span>
            <StatusPill tone={e.tone} className="shrink-0 px-1.5 text-[10px]">
              {e.pill}
            </StatusPill>
          </li>
        ))}
      </ol>
      <p className="mv-fade mt-3 pb-1 text-[11px] font-medium text-muted-foreground sm:pr-52" style={{ animationDelay: `${150 + EVENTS.length * 260}ms` }}>
        Nobody had to remember any of it.
      </p>
    </div>
  )
}

/** The parent's side of the 07:00 job: a push notification on their phone. */
export function FeePushMock() {
  return (
    <div
      role="img"
      aria-label={`Push notification on a parent's phone: fee reminder of ${formatAmount(6500)} rupees for Diya, pay in the app`}
      className="flex select-none items-start gap-2.5 rounded-2xl border bg-card/95 p-3 text-card-foreground shadow-lg backdrop-blur"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
        <BellRing className="h-4 w-4 text-white" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
          <span className="font-semibold uppercase tracking-[0.06em]">AIRTEC · Parents</span>
          <span>07:00</span>
        </p>
        <p className="text-[12px] font-semibold leading-snug">
          Fee due for Diya: <span className="rupee">{formatAmount(6500)}</span>
        </p>
        <p className="text-[11px] leading-snug text-muted-foreground">Tap to pay in the app. The receipt appears there too.</p>
      </div>
    </div>
  )
}
