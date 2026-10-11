// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { StatusPill } from '@/components/site/status-pill'
import type { PillTone } from '@/lib/utils'
import { Mock } from '../parts'

const ROWS: { who: string; doc: string; left: string; tone: PillTone }[] = [
  { who: 'Bus 07', doc: 'Insurance', left: '12 days', tone: 'warning' },
  { who: 'Bus 02', doc: 'Fitness', left: '45 days', tone: 'success' },
  { who: 'Driver Suresh', doc: 'Licence', left: 'Expired', tone: 'destructive' },
]

export function ComplianceSpot() {
  return (
    <Mock label="Compliance table: Bus 07 insurance expires in 12 days, Bus 02 fitness in 45 days, driver Suresh's licence has expired" className="mx-auto w-full max-w-md">
      <p className="mb-2 text-sm font-semibold">Compliance · checked 06:00</p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th className="py-1.5 font-medium">Vehicle / driver</th>
            <th className="py-1.5 font-medium">Document</th>
            <th className="py-1.5 text-right font-medium">Expires</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr key={r.who} className="mv-fade border-b border-border/60" style={{ animationDelay: `${i * 60}ms` }}>
              <td className="py-2 font-medium">{r.who}</td>
              <td className="py-2 text-muted-foreground">{r.doc}</td>
              <td className="py-2 text-right">
                <StatusPill tone={r.tone}>{r.left}</StatusPill>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Mock>
  )
}
