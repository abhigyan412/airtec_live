// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { ArrowRight } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Mock } from '../parts'

export function ExcelImportSpot() {
  return (
    <div
      role="img"
      aria-label="A messy Excel timetable sheet imported into an AIRTEC review screen showing 16 sections, 27 teachers and 2 conflicts to review"
      className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <div className="w-48 shrink-0 overflow-hidden rounded-lg border bg-card shadow-sm">
        <div className="bg-success px-2 py-1 text-xs font-semibold text-success-foreground">timetable 2026 FINAL(2).xlsx</div>
        <div className="grid grid-cols-4 gap-px bg-border p-px text-[11px]">
          {['Day', 'P1', 'P2', 'P3', 'Mon', 'Maths-VK', 'eng', '', 'Tue', 'SCI', 'Maths -vk', 'Hindi', 'Wed', '', 'PT', 'sst'].map((c, i) => (
            <span key={i} className="truncate bg-card px-1 py-0.5">
              {c}
            </span>
          ))}
        </div>
      </div>
      <ArrowRight className="mv-grow-x h-5 w-5 rotate-90 text-muted-foreground sm:rotate-0" />
      <Mock label="" className="w-full max-w-[280px]">
        <p className="text-sm font-semibold">Review import</p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">16 sections · 27 teachers</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">2 conflicts to review</p>
        <div className="mt-1.5 flex flex-col gap-1.5">
          <span className="mv-fade w-fit" style={{ animationDelay: '200ms' }}>
            <StatusPill tone="warning">“Maths-VK” and “Maths -vk”: same teacher?</StatusPill>
          </span>
          <span className="mv-fade w-fit" style={{ animationDelay: '260ms' }}>
            <StatusPill tone="warning">Wed P1 is empty in 7-B</StatusPill>
          </span>
        </div>
        <span className="mt-3 block rounded-md bg-primary py-1.5 text-center text-xs font-medium text-primary-foreground">Save setup</span>
      </Mock>
    </div>
  )
}
