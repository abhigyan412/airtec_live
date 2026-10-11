import { XCircle } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Progress } from '@/components/ui/progress'
import { formatAmount } from '@/lib/utils'
import { Mock, MockTitle } from './parts'

/* ── Fees: balance the database guarantees ──────────────────────────── */

export function FeeBalanceMock({ className }: { className?: string }) {
  return (
    <Mock
      label="Term 2 invoice for 18,500 rupees, paid in full by 10,000 at the counter and 8,500 by UPI; a further 2,000 payment refused because it exceeds the balance"
      className={className}
    >
      <MockTitle right={<StatusPill tone="success">Paid</StatusPill>}>
        Term 2 · <span className="rupee font-mono tabular-nums">{formatAmount(18500)}</span>
      </MockTitle>
      <ul className="divide-y text-sm">
        {[
          { amt: 10000, how: 'Counter' },
          { amt: 8500, how: 'UPI' },
        ].map((p) => (
          <li key={p.how} className="flex items-center justify-between py-2">
            <span className="rupee font-mono tabular-nums">{formatAmount(p.amt)}</span>
            <span className="text-xs text-muted-foreground">{p.how}</span>
          </li>
        ))}
        <li className="flex items-center justify-between gap-2 py-2 opacity-70">
          <span className="rupee font-mono tabular-nums line-through">{formatAmount(2000)}</span>
          <StatusPill tone="destructive">
            <XCircle className="h-3 w-3" />
            Refused: exceeds balance
          </StatusPill>
        </li>
      </ul>
      <Progress value={100} className="mt-2" />
    </Mock>
  )
}
