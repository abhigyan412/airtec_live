import Link from 'next/link'
import { ArrowRight, BadgeCheck, GitBranch, KeyRound, Contrast } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container, Section, SectionHeading } from '@/components/site/section'
import { BrowserFrame, PhoneFrame } from '@/components/site/frames'
import { CtaBand, DayTimeline, FaqList, ModuleGrid, faqJsonLd } from '@/components/site/blocks'
import { TrialBand } from '@/components/site/trial'
import { LazyShortLeadForm, RoleTabs } from '@/components/site/home-parts'
import { JsonLd } from '@/components/site/json-ld'
import {
  AttendanceMock,
  CoverMock,
  DashboardMock,
  FeeBalanceMock,
  FeeHoldMock,
  LibraryScanMock,
  PortalPhoneMock,
  ResultRulesMock,
  SeatLedgerMock,
} from '@/components/mockups'
import { POSITIONING, REPLACES } from '@/content/site'
import { SITE_URL } from '@/lib/utils'

const STANDOUTS = [
  {
    eyebrow: 'Admissions',
    title: 'Seats that can’t be oversold',
    body: 'A stored ledger per class: confirmed, reserved, frozen and available. The number on screen is the truth.',
    href: '/modules/admissions',
    mock: <SeatLedgerMock />,
  },
  {
    eyebrow: 'Admissions',
    title: 'Holds that release themselves',
    body: 'Unpaid seat holds expire on a clock, and the next waitlisted family is offered the seat automatically.',
    href: '/modules/admissions',
    mock: <FeeHoldMock />,
  },
  {
    eyebrow: 'Timetable',
    title: 'The 7 AM scramble, automated',
    body: 'Absences build themselves from leave and biometrics. Every uncovered period gets ranked, genuinely free substitutes.',
    href: '/modules/timetable',
    mock: <CoverMock />,
  },
  {
    eyebrow: 'Exams & Results',
    title: 'Your result rules, not a vendor’s',
    body: 'Best-of-N, grace, compartment and practical weightage, set per class and subject. Board presets are a starting point.',
    href: '/modules/exams',
    mock: <ResultRulesMock />,
  },
  {
    eyebrow: 'Fees',
    title: 'Balances the database guarantees',
    body: 'Paid and partial status kept by the database inside each payment. Overpayment is refused, whatever screen it comes from.',
    href: '/modules/fees',
    mock: <FeeBalanceMock />,
  },
  {
    eyebrow: 'Library',
    title: 'One scan, issue or return',
    body: 'The desk works out what a scan means. Reserved books are held for the next reader, and fines land on the fee bill.',
    href: '/modules/library',
    mock: <LibraryScanMock />,
  },
]

const ROLE_VISUALS: Record<string, React.ReactNode> = {
  principal: <CoverMock />,
  admin: <SeatLedgerMock />,
  accountant: <FeeBalanceMock />,
  teacher: <AttendanceMock />,
  parent: (
    <div className="mx-auto max-w-[260px] overflow-hidden rounded-xl border">
      <PortalPhoneMock />
    </div>
  ),
}

const TRUST = [
  { icon: KeyRound, title: 'Role-based access', body: 'Built-in roles plus your own custom roles, enforced on the server.' },
  { icon: GitBranch, title: 'Approval workflows', body: 'One approval engine, with a recorded actor and reason for every override.' },
  { icon: BadgeCheck, title: 'Verifiable certificates', body: 'Any receiving school can check a TC number online.' },
  { icon: Contrast, title: 'Accessible colours', body: 'Status colours measured to WCAG AA in light and dark.' },
]

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Organization', name: 'AIRTEC', url: SITE_URL, logo: `${SITE_URL}/icon-192.png` },
            {
              '@type': 'SoftwareApplication',
              name: 'AIRTEC',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web, Android, iOS',
              description: 'School management software for Indian schools.',
            },
          ],
        }}
      />
      <JsonLd data={faqJsonLd()} />

      {/* 1 · Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" aria-hidden />
        <Container className="relative grid items-center gap-12 pb-20 pt-12 md:pt-20 lg:grid-cols-[1fr_1.05fr] lg:pb-28">
          <div>
            <p className="eyebrow">School ERP for India</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {POSITIONING.headlineLead}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              {POSITIONING.headlineRest}
              <span className="text-gradient-primary font-semibold">{POSITIONING.headlineAccent}</span>
              {POSITIONING.headlineTail}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 shadow-glow-indigo">
                <Link href="/contact">
                  Book a demo <ArrowRight aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11">
                <Link href="/modules">Explore modules</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Or{' '}
              <Link href="/free-trial" className="font-medium text-primary underline-offset-4 hover:underline">
                pick one module and try it free
              </Link>
              . No payment details needed.
            </p>
          </div>
          <div className="relative pb-10 sm:pb-0 sm:pr-10">
            <BrowserFrame url="app.airtec.in/dashboard">
              <DashboardMock />
            </BrowserFrame>
            <PhoneFrame className="absolute -bottom-2 right-0 w-[188px] sm:-bottom-10 sm:w-[196px]">
              <PortalPhoneMock />
            </PhoneFrame>
          </div>
        </Container>
      </section>

      {/* 2 · Replaces strip */}
      <section className="border-y bg-card/60">
        <Container className="flex flex-col items-start gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-muted-foreground">What schools juggle today</p>
          <ul className="flex flex-wrap items-center gap-2">
            {REPLACES.map((r) => (
              <li key={r} className="rounded-full border px-3 py-1 text-sm text-muted-foreground line-through decoration-muted-foreground/50">
                {r}
              </li>
            ))}
            <li className="flex items-center gap-2 pl-1 text-sm font-semibold text-primary">
              <ArrowRight className="h-4 w-4" aria-hidden />
              One system
            </li>
          </ul>
        </Container>
      </section>

      {/* 3 · Module grid */}
      <Section>
        <SectionHeading
          eyebrow="Modules"
          title="Everything the school runs on, connected"
          lead="Twelve modules sharing one record per student and per staff member, so nothing is typed twice."
        />
        <div className="mt-12">
          <ModuleGrid />
        </div>
      </Section>

      {/* Free-trial offer: pick one module */}
      <TrialBand />

      {/* 4 · Standout features */}
      <Section band>
        <SectionHeading
          eyebrow="What sets it apart"
          title="Built around the problems schools actually have"
          lead="Every ERP lists Fees and Exams. These are the parts that make AIRTEC different."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STANDOUTS.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              data-reveal
              className="group flex flex-col rounded-xl border bg-card p-5 transition-[border-color] [transition-duration:var(--duration-fast)] ease-out hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="rounded-lg bg-muted/50 p-3">{s.mock}</div>
              <p className="eyebrow mt-5">{s.eyebrow}</p>
              <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{s.body}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform [transition-duration:var(--duration-fast)] ease-out group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="outline">
            <Link href="/why-airtec">
              Why schools choose AIRTEC <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </Section>

      {/* 5 · A day at school */}
      <Section id="day" className="scroll-mt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="A day at school"
              title="It runs while you’re not looking"
              lead="What AIRTEC does without being asked. Every line is a real scheduled job, with a manual “run now” for administrators."
            />
          </div>
          <DayTimeline />
        </div>
      </Section>

      {/* 6 · Role tabs */}
      <Section band>
        <SectionHeading eyebrow="One system, every seat" title="The same school, seen from each desk" />
        <RoleTabs visuals={ROLE_VISUALS} />
      </Section>

      {/* 7 · Trust band */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            eyebrow="Trust"
            title="Numbers you can rely on, access you control"
            lead={
              <>
                Concrete safeguards, not badges.{' '}
                <Link href="/security" className="font-medium text-primary underline-offset-4 hover:underline">
                  How we handle your data
                </Link>
              </>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {TRUST.map((t) => (
              <div key={t.title} data-reveal className="rounded-xl border bg-card p-5">
                <t.icon className="h-5 w-5 text-primary" aria-hidden />
                <h3 className="mt-3 font-semibold">{t.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 8 · Testimonials: omitted until there is a real, consenting quote (plan §5.8, Q6). */}

      {/* 9 · FAQ */}
      <Section band>
        <SectionHeading eyebrow="FAQ" title="Questions schools ask us" align="center" />
        <div className="mx-auto max-w-3xl">
          <FaqList />
        </div>
      </Section>

      {/* 10 · Final CTA */}
      <CtaBand title="Book a demo" lead="Leave your number and we’ll call within one working day to set it up.">
        <LazyShortLeadForm />
      </CtaBand>
    </>
  )
}
