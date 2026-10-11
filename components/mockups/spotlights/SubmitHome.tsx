// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { Check } from 'lucide-react'
import { PhoneFrame } from '@/components/site/frames'

export function SubmitHomeSpot() {
  return (
    <div
      role="img"
      aria-label="On a phone, a student uploads worksheet.jpg for a Science assignment and later sees it graded 18 out of 20 with the comment Neat work, check Q4"
      className="flex w-full justify-center gap-4"
    >
      <PhoneFrame className="w-44">
        <div className="space-y-2 bg-background p-3 text-xs">
          <p className="text-sm font-semibold">Science · Ch 4 worksheet</p>
          <p className="text-muted-foreground">Due today · 7-B</p>
          <div className="flex items-center justify-between rounded-md border border-dashed border-input px-2 py-2">
            <span className="font-mono">worksheet.jpg</span>
            <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
          </div>
          <div className="rounded-md bg-primary py-1.5 text-center font-medium text-primary-foreground">Submitted</div>
        </div>
      </PhoneFrame>
      <PhoneFrame className="mv-pop w-44" >
        <div className="space-y-2 bg-background p-3 text-xs">
          <p className="text-sm font-semibold">Science · Ch 4 worksheet</p>
          <p className="font-mono text-2xl font-semibold tabular-nums text-success">18 / 20</p>
          <p className="rounded-md bg-muted p-2 italic">“Neat work, check Q4”</p>
          <p className="text-muted-foreground">Ms. Rao · graded</p>
        </div>
      </PhoneFrame>
    </div>
  )
}
