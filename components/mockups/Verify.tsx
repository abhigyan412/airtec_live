import { ShieldCheck } from 'lucide-react'
import { StatusPill } from '@/components/site/status-pill'
import { Mock, MockTitle, FakeButton } from './parts'

/* ── Certificates: public verification ──────────────────────────────── */

export function VerifyMock({ className }: { className?: string }) {
  return (
    <Mock label="Public verification of TC/2026/0142: valid, issued 12 April 2026 by Greenfield Public School" className={className}>
      <MockTitle>Verify a certificate</MockTitle>
      <div className="flex gap-2">
        <div className="flex-1 rounded-lg border border-input bg-background px-3 py-2 font-mono text-xs">TC/2026/0142</div>
        <FakeButton className="h-auto">Verify</FakeButton>
      </div>
      <div className="mt-3 rounded-lg border bg-background p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-success" />
            Transfer certificate
          </span>
          <StatusPill tone="success">Valid</StatusPill>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">Issued 12 Apr 2026 · Greenfield Public School</p>
      </div>
    </Mock>
  )
}
