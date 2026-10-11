import { BellRing } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Progress } from '@/components/ui/progress'
import { Mock, MockTitle, FakeButton } from './parts'

/* ── Homework: completion ───────────────────────────────────────────── */

export function HomeworkCompletionMock({ className }: { className?: string }) {
  return (
    <Mock label="Science chapter 4 worksheet for 7-B: 31 of 38 submitted, 28 on time, 3 late, 7 missing, with a button to remind the 7" className={className}>
      <MockTitle>Science · Chapter 4 worksheet · 7-B</MockTitle>
      <div className="flex items-baseline justify-between">
        <span className="text-xs text-muted-foreground">Submitted</span>
        <span className="font-mono text-sm font-semibold tabular-nums">31 / 38</span>
      </div>
      <Progress value={(31 / 38) * 100} className="mt-1.5" />
      <div className="mt-3 flex flex-wrap gap-1.5">
        <StatusPill tone="success">Submitted 28</StatusPill>
        <StatusPill tone="warning">Late 3</StatusPill>
        <StatusPill tone="destructive">Missing 7</StatusPill>
      </div>
      <div className="mt-4 flex justify-end">
        <FakeButton>
          <BellRing className="h-3.5 w-3.5" />
          Remind 7
        </FakeButton>
      </div>
    </Mock>
  )
}
