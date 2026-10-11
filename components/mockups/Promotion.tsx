import { Check } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Mock, MockTitle } from './parts'

/* ── Students: bulk promotion with clearance ────────────────────────── */

export function PromotionMock({ className }: { className?: string }) {
  const promoted = ['Aditi Rao', 'Arjun Das', 'Fatima Sheikh']
  const skipped = ['Neel Bhatt', 'Tara Menon']
  return (
    <Mock label="Promote Class 5-A to 6-A, 38 students: 36 promoted, 2 skipped because a library book is due" className={className}>
      <MockTitle right={<span className="font-mono text-xs tabular-nums text-muted-foreground">38 students</span>}>Promote Class 5-A → 6-A</MockTitle>
      <ul className="divide-y">
        {promoted.map((n) => (
          <li key={n} className="flex items-center justify-between py-2">
            <span className="text-sm">{n}</span>
            <StatusPill tone="success"><Check className="h-3 w-3" />Promoted</StatusPill>
          </li>
        ))}
        <li className="py-1.5 text-center text-[11px] text-muted-foreground">+ 33 more promoted</li>
        {skipped.map((n) => (
          <li key={n} className="flex items-center justify-between gap-2 py-2">
            <span className="text-sm">{n}</span>
            <StatusPill tone="warning">Library book due · skipped</StatusPill>
          </li>
        ))}
      </ul>
    </Mock>
  )
}
