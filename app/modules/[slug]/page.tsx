import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Container } from '@/components/site/section'
import {
  BentoSide,
  CtaStrip,
  DetailList,
  FeatureGroup,
  GroupLabel,
  HeroStandout,
  OutcomeChips,
  SpotlightRow,
} from '@/components/site/module-features'
import {
  BiometricChainMock,
  BoardingRosterMock,
  CoverMock,
  FeeBalanceMock,
  HomeworkCompletionMock,
  LibraryScanMock,
  LowAttendanceMock,
  NotificationsPhoneMock,
  PromotionMock,
  ResultRulesMock,
  SeatLedgerMock,
  VerifyMock,
} from '@/components/mockups'
import {
  AgingBarsSpot,
  BoardPresetSpot,
  BulkEditSpot,
  ComplianceSpot,
  ExcelImportSpot,
  FineToFeesSpot,
  GenerateSpot,
  HiringKanbanSpot,
  MarkClassSpot,
  MuteSettingsSpot,
  OnlinePaymentSpot,
  PayrollRunSpot,
  PortalHomeSpot,
  PrintSheetSpot,
  QrApplySpot,
  ReportCardSpot,
  RouteStopsSpot,
  SchoolAttendanceSpot,
  StockCheckSpot,
  StudentProfileSpot,
  SubmitHomeSpot,
  SyllabusProgressSpot,
  TemplateEditorSpot,
  WaitlistSpot,
} from '@/components/mockups/spotlights'
import { MODULES, getModule, lintModuleCopy, publishedGroups, type HeroMockup, type SpotlightMockup } from '@/content/modules'
import { cn } from '@/lib/utils'

// Hero standout mock-up per module (module-features-plan.md §5).
const HERO_MOCKUPS: Record<HeroMockup, React.ReactNode> = {
  'result-rules': <ResultRulesMock />,
  'seat-ledger': <SeatLedgerMock />,
  promotion: <PromotionMock />,
  'fee-balance': <FeeBalanceMock />,
  cover: <CoverMock />,
  'low-attendance': <LowAttendanceMock />,
  'homework-completion': <HomeworkCompletionMock />,
  'library-scan': <LibraryScanMock />,
  'boarding-roster': <BoardingRosterMock />,
  'biometric-chain': <BiometricChainMock />,
  verify: <VerifyMock />,
  notifications: <NotificationsPhoneMock />,
}

// Large mock-up per spotlight (module-features-plan.md §4.3, §5).
const SPOTLIGHT_MOCKUPS: Record<SpotlightMockup, React.ReactNode> = {
  'report-card': <ReportCardSpot />,
  'board-preset': <BoardPresetSpot />,
  'qr-apply': <QrApplySpot />,
  waitlist: <WaitlistSpot />,
  'bulk-edit': <BulkEditSpot />,
  'student-profile': <StudentProfileSpot />,
  'aging-bars': <AgingBarsSpot />,
  'online-payment': <OnlinePaymentSpot />,
  generate: <GenerateSpot />,
  'excel-import': <ExcelImportSpot />,
  'mark-class': <MarkClassSpot />,
  'school-attendance': <SchoolAttendanceSpot />,
  'syllabus-progress': <SyllabusProgressSpot />,
  'submit-home': <SubmitHomeSpot />,
  'fine-to-fees': <FineToFeesSpot />,
  'stock-check': <StockCheckSpot />,
  'route-stops': <RouteStopsSpot />,
  compliance: <ComplianceSpot />,
  'payroll-run': <PayrollRunSpot />,
  'hiring-kanban': <HiringKanbanSpot />,
  'template-editor': <TemplateEditorSpot />,
  'print-sheet': <PrintSheetSpot />,
  'portal-home': <PortalHomeSpot />,
  'mute-settings': <MuteSettingsSpot />,
}

export function generateStaticParams() {
  // Fails the build on copy that breaks the one-line rules (§6).
  lintModuleCopy()
  return MODULES.map((m) => ({ slug: m.slug }))
}

export const dynamicParams = false

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const m = getModule(params.slug)
  if (!m) return {}
  return {
    title: m.name,
    description: `${m.headline} ${m.lead}`,
    openGraph: { title: `${m.name} · AIRTEC`, description: m.headline },
  }
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug)
  if (!m) notFound()

  // Two features sit beside the hero in the bento. They come from the first
  // group that isn't left with a lone card afterwards (a single card would
  // stretch a whole row); the rest of that group follows under its label.
  const groups = publishedGroups(m)
  const donor = Math.max(0, groups.findIndex((g) => g.features.length >= 2 && g.features.length !== 3))
  const bento = groups[donor].features.slice(0, 2)
  const rest = groups
    .map((g, i) => (i === donor ? { ...g, features: g.features.slice(2) } : g))
    .filter((g) => g.features.length > 0)

  return (
    <>
      {/* Headline → lead → outcome chips */}
      <section className="relative overflow-hidden bg-hero">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
        <Container className="relative pb-10 pt-10 md:pb-14 md:pt-14">
          <ModuleSubnav active={m.slug} />
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow flex items-center gap-2">
              <m.icon className="h-4 w-4" aria-hidden />
              {m.name}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-5xl">{m.headline}</h1>
            <p className="mt-5 text-lg text-muted-foreground md:text-xl">{m.lead}</p>
            <div className="mt-6">
              <OutcomeChips outcomes={m.outcomes} />
            </div>
          </div>
        </Container>
      </section>

      {/* Hero standout + two features (bento) → spotlights → groups → detail list → CTA strip */}
      <section className="pb-20 pt-4 md:pb-28 md:pt-8">
        <Container className="space-y-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <HeroStandout hero={m.hero} mockup={HERO_MOCKUPS[m.hero.mockup]} />
            <BentoSide features={bento} />
          </div>

          <div className="divide-y border-y">
            {m.spotlights.map((s, i) => (
              <SpotlightRow key={s.title} s={s} mockup={SPOTLIGHT_MOCKUPS[s.mockup]} flip={i % 2 === 1} />
            ))}
          </div>

          {rest.map((g) => (
            <div key={g.label}>
              <GroupLabel>{g.label}</GroupLabel>
              <FeatureGroup features={g.features} />
            </div>
          ))}

          {m.detailList && <DetailList title={m.detailList.title} items={m.detailList.items} />}

          <CtaStrip module={m.slug} name={m.name} />
        </Container>
      </section>
    </>
  )
}

/** Echoes the app's sidebar: the active item uses the sidebar-accent fill (plan.md §3.6). */
function ModuleSubnav({ active }: { active: string }) {
  return (
    <nav aria-label="Modules" className="-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-1 rounded-xl border bg-card/80 p-1 backdrop-blur-sm">
        {MODULES.map((x) => {
          const on = x.slug === active
          return (
            <li key={x.slug}>
              <Link
                href={`/modules/${x.slug}`}
                aria-current={on ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors [transition-duration:var(--duration-fast)] ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  on ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <x.icon className="h-3.5 w-3.5" aria-hidden />
                {x.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
