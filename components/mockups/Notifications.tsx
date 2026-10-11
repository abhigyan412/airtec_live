import { FileText, GraduationCap, IndianRupee } from 'lucide-react'
import { PhoneFrame } from '@/components/site/frames'
import { cn, formatAmount } from '@/lib/utils'

/* ── Family portal: notifications on a phone ────────────────────────── */

export function NotificationsPhoneMock({ className }: { className?: string }) {
  const items = [
    { icon: IndianRupee, title: 'Fee due', body: <><span className="rupee">{formatAmount(6200)}</span> by 10 Oct</> },
    { icon: FileText, title: 'Homework graded', body: 'Science · 18/20' },
    { icon: GraduationCap, title: 'Results published', body: 'Term 1' },
  ]
  return (
    <div
      role="img"
      aria-label="A phone showing three notifications: fee due 6,200 rupees by 10 October, homework graded Science 18 out of 20, results published for Term 1"
      className={cn('select-none', className)}
    >
      <PhoneFrame className="mx-auto w-[230px]">
        <div className="bg-gradient-to-b from-primary/15 to-background px-3 pb-6 pt-4">
          <p className="text-center font-mono text-2xl font-semibold tabular-nums">07:05</p>
          <p className="text-center text-[10px] text-muted-foreground">Friday, 3 October</p>
          <ul className="mt-4 space-y-2">
            {items.map((n) => (
              <li key={n.title} className="flex items-start gap-2 rounded-xl border bg-card/95 p-2.5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <n.icon className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold">AIRTEC</span>
                    <span className="text-[9px] text-muted-foreground">now</span>
                  </span>
                  <span className="block text-[11px] font-medium">{n.title}</span>
                  <span className="block text-[10px] text-muted-foreground">{n.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PhoneFrame>
    </div>
  )
}
