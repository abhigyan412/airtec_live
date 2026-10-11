// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { ArrowRight } from 'lucide-react'
import { Mock } from '../parts'

function Field({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-primary/15 px-1 font-mono text-[12px] text-primary">{children}</span>
}

export function TemplateEditorSpot() {
  return (
    <div
      role="img"
      aria-label="A bonafide certificate template with placeholders for student name and class, and the filled certificate for Meera Joshi of 6-A with number BC/2026/0088"
      className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <Mock label="" className="w-full max-w-[230px]">
        <p className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">Template · Bonafide</p>
        <p className="mt-2 text-sm leading-relaxed">
          This is to certify that <Field>{'{student_name}'}</Field> is a bonafide student of class <Field>{'{class}'}</Field> for the
          session <Field>{'{session}'}</Field>.
        </p>
      </Mock>
      <ArrowRight className="mv-grow-x h-5 w-5 shrink-0 rotate-90 text-muted-foreground sm:rotate-0" />
      <Mock label="" className="relative w-full max-w-[230px] shadow-sm">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.08em] text-primary">Greenfield Public School</p>
        <p className="mt-1 text-center text-sm font-bold">Bonafide Certificate</p>
        <p className="mt-2 text-sm leading-relaxed">
          This is to certify that <strong>Meera Joshi</strong> is a bonafide student of class <strong>6-A</strong> for the session{' '}
          <strong>2026–27</strong>.
        </p>
        <span className="mv-stamp mt-3 inline-block rounded border border-primary/50 bg-primary/10 px-1.5 font-mono text-xs font-semibold text-primary" style={{ animationDelay: '250ms' }}>
          BC/2026/0088
        </span>
      </Mock>
    </div>
  )
}
