import { StatusPill } from '@/components/site/status-pill'
import { Mock, MockTitle } from './parts'

/* ── Exams: result rule panel ───────────────────────────────────────── */

export function ResultRulesMock({ className }: { className?: string }) {
  const chips = ['Pass 33%', 'Theory 80 / Practical 20', 'Grace up to 5', 'Best of 5']
  return (
    <Mock label="Class 10 Mathematics rules: pass 33 percent, theory 80 practical 20, grace up to 5, best of 5. Aarav S. scores 31 plus 2 grace and passes" className={className}>
      <MockTitle right={<StatusPill tone="primary">CBSE preset · edited</StatusPill>}>Class 10 · Mathematics</MockTitle>
      <div className="flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <span key={c} className="rounded-full border bg-background px-2.5 py-1 text-xs font-medium">
            {c}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 rounded-lg border bg-background px-3 py-2.5">
        <span className="min-w-0 text-sm">
          <span className="font-medium">Aarav S.</span>{' '}
          <span className="font-mono text-xs tabular-nums text-muted-foreground">31 + 2 grace →</span>
        </span>
        <StatusPill tone="success">Pass</StatusPill>
      </div>
    </Mock>
  )
}
