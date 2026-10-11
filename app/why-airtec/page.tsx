import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Minus } from 'lucide-react'
import { PageHero, Section, SectionHeading } from '@/components/site/section'
import { CtaBand } from '@/components/site/blocks'
import { StatusPill } from '@/components/site/status-pill'
import { PhoneFrame } from '@/components/site/frames'
import {
  FeeBalanceMock,
  PortalPhoneMock,
  ResultRulesMock,
  SettingsPanelMock,
} from '@/components/mockups'
import { COMPARISON, DAY_TIMELINE, WHY_ITEMS } from '@/content/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Why AIRTEC',
  description:
    'Every rule a setting, scheduled jobs that run the school day, built for Indian schools, one connected system and numbers you can trust.',
}

const FLOWS = [
  { from: 'Library', to: 'Fees', label: 'Fines billed on the fee ledger' },
  { from: 'Library + Fees', to: 'Certificates', label: 'Unreturned books and unpaid fees block a TC' },
  { from: 'HR biometrics', to: 'Timetable', label: 'Missed check-ins become cover requests' },
  { from: 'Attendance', to: 'Exams', label: 'Attendance drives exam eligibility' },
  { from: 'Homework', to: 'Early warning', label: 'Missed homework flags a struggling student' },
  { from: 'Admissions', to: 'Students', label: 'Approval creates the student record' },
  { from: 'Seat release', to: 'Waitlist', label: 'A freed seat triggers the next offer' },
]

const INDIA_CHIPS = ['IST end to end', 'April–March FY', 'RTE', 'CBSE preset', 'ICSE preset', 'INR · Razorpay · UPI', 'Students without logins', 'Excel import']

function Visual({ id }: { id: string }) {
  switch (id) {
    case 'rules':
      return (
        <div className="space-y-4">
          <SettingsPanelMock />
          <ResultRulesMock />
        </div>
      )
    case 'runs':
      return (
        <div className="rounded-xl border bg-card p-4">
          <ul className="space-y-2">
            {DAY_TIMELINE.slice(0, 6).map((e) => (
              <li key={e.time + e.text} className="flex gap-3 text-sm">
                <span className="w-24 shrink-0 font-mono text-xs tabular-nums text-primary">{e.time}</span>
                <span className="text-muted-foreground">{e.text}</span>
              </li>
            ))}
          </ul>
          <Link href="/#day" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline">
            See the full day <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      )
    case 'india':
      return (
        <ul className="flex flex-wrap gap-2">
          {INDIA_CHIPS.map((c) => (
            <li key={c} className="rounded-full border bg-card px-3 py-1.5 text-sm font-medium">
              {c}
            </li>
          ))}
        </ul>
      )
    case 'connected':
      return (
        <ul className="space-y-2" aria-label="How modules feed each other">
          {FLOWS.map((f) => (
            <li key={f.label} className="rounded-xl border bg-card p-3">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">{f.from}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" aria-label="feeds" />
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">{f.to}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.label}</p>
            </li>
          ))}
        </ul>
      )
    case 'parents':
      return (
        <PhoneFrame className="mx-auto w-[220px]">
          <PortalPhoneMock />
        </PhoneFrame>
      )
    case 'numbers':
      return <FeeBalanceMock />
    case 'a11y':
      return (
        <div className="rounded-xl border bg-card p-5" role="img" aria-label="Status pills Paid, Partial, Overdue, Present and Absent, each measured to WCAG AA contrast">
          <div className="flex flex-wrap gap-2">
            <StatusPill tone="success">Paid</StatusPill>
            <StatusPill tone="warning">Partial</StatusPill>
            <StatusPill tone="destructive">Overdue</StatusPill>
            <StatusPill tone="success">Present</StatusPill>
            <StatusPill tone="destructive">Absent</StatusPill>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">Pill contrast 4.54–4.72 : 1 · text 5.19–5.42 : 1 (light)</p>
        </div>
      )
    default:
      return null
  }
}

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why AIRTEC"
        title={
          <>
            Modules are table stakes. <span className="text-gradient-primary">This is the difference.</span>
          </>
        }
        lead="Every school ERP lists Fees and Exams. These are the reasons schools choose AIRTEC, each one something we can show you in a demo."
      >
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {WHY_ITEMS.map((w) => (
            <a key={w.id} href={`#${w.id}`} className="rounded-full border bg-card px-3 py-1.5 text-sm font-medium transition-colors [transition-duration:var(--duration-fast)] hover:border-primary/40 hover:text-primary">
              {w.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {WHY_ITEMS.map((w, i) => (
        <Section key={w.id} id={w.id} band={i % 2 === 1} className="scroll-mt-16">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div data-reveal>
              <p className="eyebrow">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] md:text-4xl">{w.title}</h2>
              <p className="mt-5 text-sm font-medium text-foreground">The problem</p>
              <p className="mt-1 text-lg text-muted-foreground">{w.problem}</p>
              <p className="mt-6 text-sm font-medium text-foreground">How AIRTEC handles it</p>
              <ul className="mt-2 space-y-2">
                {w.how.map((h) => (
                  <li key={h} className="flex gap-3 text-muted-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              {w.proof && <p className="mt-6 rounded-lg border-l-2 border-primary bg-primary/5 px-4 py-3 text-sm">{w.proof}</p>}
            </div>
            <div data-reveal>
              <Visual id={w.id} />
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <SectionHeading eyebrow="Side by side" title="Typical school ERP vs AIRTEC" />
        <div data-reveal className="mt-10 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th scope="col" className="px-4 py-3 font-semibold">Area</th>
                <th scope="col" className="px-4 py-3 font-semibold text-muted-foreground">Typical school ERP</th>
                <th scope="col" className="px-4 py-3 font-semibold text-primary">AIRTEC</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((r, i) => (
                <tr key={r.area} className={cn(i < COMPARISON.length - 1 && 'border-b')}>
                  <th scope="row" className="px-4 py-3 font-medium">{r.area}</th>
                  <td className="px-4 py-3 text-muted-foreground">
                    <span className="flex gap-2">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      {r.typical}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                      {r.airtec}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
