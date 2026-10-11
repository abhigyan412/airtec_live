import { BookOpen, ScanLine } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Mock } from './parts'

/* ── Library: scan queue ────────────────────────────────────────────── */

export function LibraryScanMock({ className }: { className?: string }) {
  const log = [
    { title: 'The Jungle Book', who: 'Issued to Meera, 6-A', kind: 'Issued', tone: 'primary' as const },
    { title: 'Wings of Fire', who: 'Back on the shelf', kind: 'Returned', tone: 'success' as const },
    { title: 'Malgudi Days', who: 'Returned → held for reservation', kind: 'Held', tone: 'warning' as const },
  ]
  return (
    <Mock label="Library scan queue: The Jungle Book issued to Meera of 6-A, Wings of Fire returned, Malgudi Days returned and held for a reservation" className={className}>
      <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2">
        <ScanLine className="h-4 w-4 text-primary" />
        <span className="font-mono text-xs text-muted-foreground">Scan a copy…</span>
      </div>
      <ul className="mt-3 divide-y">
        {log.map((l) => (
          <li key={l.title} className="flex items-center justify-between gap-2 py-2">
            <span className="flex min-w-0 items-center gap-2">
              <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{l.title}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{l.who}</span>
              </span>
            </span>
            <StatusPill tone={l.tone}>{l.kind}</StatusPill>
          </li>
        ))}
      </ul>
    </Mock>
  )
}
