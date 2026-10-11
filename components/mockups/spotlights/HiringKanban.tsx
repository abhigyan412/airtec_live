// Spotlight mock-up (module-features-plan.md §5). Invented demo data only.
import { QrCode } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Mock } from '../parts'

const COLS = [
  { k: 'Applied', n: 12, cards: [{ who: 'Priya N.', role: 'PGT Physics', qr: true }, { who: 'Rahul T.', role: 'TGT English' }] },
  { k: 'Offer sent', n: 2, cards: [{ who: 'Sneha V.', role: 'PRT' }] },
  { k: 'Joined', n: 1, cards: [{ who: 'Imran A.', role: 'PET' }] },
]

export function HiringKanbanSpot() {
  return (
    <Mock label="Hiring pipeline: 12 applied, 2 offers sent, 1 joined; one applicant came from the QR code" className="w-full">
      <div className="grid grid-cols-3 gap-2">
        {COLS.map((c, ci) => (
          <div key={c.k} className="rounded-lg bg-muted/60 p-2">
            <p className="mb-2 flex items-center justify-between text-xs font-semibold">
              {c.k}
              <span className="font-mono text-muted-foreground">{c.n}</span>
            </p>
            <ul className="space-y-1.5">
              {c.cards.map((card, i) => (
                <li key={card.who} className="mv-fade rounded-md border bg-card p-2" style={{ animationDelay: `${ci * 100 + i * 60}ms` }}>
                  <p className="truncate text-xs font-medium">{card.who}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{card.role}</p>
                  {card.qr && (
                    <StatusPill tone="primary" className="mt-1 text-[11px]">
                      <QrCode className="h-3 w-3" />
                      QR Code
                    </StatusPill>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Mock>
  )
}
