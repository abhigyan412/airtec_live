// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { Printer } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Mock, MockTitle } from '../parts'

const SUBJECTS = [
  { s: 'Mathematics', m: 92, g: 'A1' },
  { s: 'Science', m: 88, g: 'A2' },
  { s: 'English', m: 79, g: 'B1' },
]

export function ReportCardSpot() {
  return (
    <div className="relative mx-auto w-full max-w-md pt-6">
      <span className="absolute right-2 top-0 inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow">
        <Printer className="h-3.5 w-3.5" />
        Print class (38)
      </span>
      <Mock label="Report card for Ananya R. of 8-A: Mathematics 92 A1, Science 88 A2, English 79 B1, with an automatic remark" className="relative shadow-sm">
        <MockTitle right={<span className="font-mono text-xs text-muted-foreground">Term 1</span>}>Ananya R. · 8-A</MockTitle>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="py-1.5 font-medium">Subject</th>
              <th className="py-1.5 text-right font-medium">Marks</th>
              <th className="py-1.5 text-right font-medium">Grade</th>
            </tr>
          </thead>
          <tbody>
            {SUBJECTS.map((r, i) => (
              <tr key={r.s} className="mv-fade border-b border-border/60" style={{ animationDelay: `${i * 60}ms` }}>
                <td className="py-1.5">{r.s}</td>
                <td className="py-1.5 text-right font-mono tabular-nums">{r.m}</td>
                <td className="py-1.5 text-right font-mono">{r.g}</td>
              </tr>
            ))}
            <tr className="font-semibold">
              <td className="py-1.5">Total</td>
              <td className="py-1.5 text-right font-mono tabular-nums">259 / 300</td>
              <td className="py-1.5 text-right font-mono">A2</td>
            </tr>
          </tbody>
        </table>
        <div className="mv-pop mt-3 flex items-start justify-between gap-2 rounded-lg border border-primary/30 bg-primary/5 p-2.5" style={{ animationDelay: '240ms' }}>
          <p className="text-sm italic">“Consistent performer, excellent in Mathematics”</p>
          <StatusPill tone="success">Auto</StatusPill>
        </div>
      </Mock>
    </div>
  )
}
