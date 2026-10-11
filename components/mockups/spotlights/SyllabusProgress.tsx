// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { StatusPill } from '@/components/site/status-pill'
import { Progress } from '@/components/ui/progress'
import { Mock } from '../parts'

export function SyllabusProgressSpot() {
  return (
    <Mock label="Maths 8-A syllabus: chapters 1 to 4 done, chapter 5 in progress, chapter 6 due 20 October and behind; 62 percent of the term plan" className="mx-auto w-full max-w-md">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold">Maths · 8-A</p>
        <p className="font-mono text-xs text-muted-foreground">62% of term plan</p>
      </div>
      <Progress value={62} className="mt-2" />
      <ul className="mt-4 divide-y text-sm">
        {[1, 2, 3, 4].map((c) => (
          <li key={c} className="flex items-center justify-between py-1.5">
            <span>Chapter {c}</span>
            <StatusPill tone="success">Done</StatusPill>
          </li>
        ))}
        <li className="flex items-center justify-between py-1.5">
          <span>Chapter 5</span>
          <StatusPill tone="primary">In progress</StatusPill>
        </li>
        <li className="mv-pop flex items-center justify-between py-1.5" style={{ animationDelay: '250ms' }}>
          <span className="font-medium">Chapter 6</span>
          <StatusPill tone="warning">Due 20 Oct · Behind</StatusPill>
        </li>
      </ul>
    </Mock>
  )
}
