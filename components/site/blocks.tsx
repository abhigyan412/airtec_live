import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DAY_TIMELINE, FAQS, type Faq } from '@/content/site'
import { modulesByGroup, type Module } from '@/content/modules'
import { Container } from './section'
import { cn } from '@/lib/utils'

// Server-rendered building blocks shared by home and inner pages.

export function ModuleCard({ m }: { m: Module }) {
  return (
    <Link
      href={`/modules/${m.slug}`}
      data-reveal
      className="group flex h-full flex-col rounded-xl border bg-card p-5 transition-[border-color,background-color] [transition-duration:var(--duration-fast)] ease-out hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <m.icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="mt-4 font-semibold">{m.name}</span>
      <span className="mt-1.5 flex-1 text-sm text-muted-foreground">{m.short}</span>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Explore
        <ArrowRight className="h-4 w-4 transition-transform [transition-duration:var(--duration-fast)] ease-out group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  )
}

export function ModuleGrid() {
  const groups = modulesByGroup()
  const row = (g: (typeof groups)[number], cols: string) => (
    <div key={g.group}>
      <p className="eyebrow mb-4">{g.group}</p>
      <div className={cn('grid gap-4 sm:grid-cols-2', cols)}>
        {g.modules.map((m) => (
          <ModuleCard key={m.slug} m={m} />
        ))}
      </div>
    </div>
  )
  // Rows sized to their groups (4 · 5 · 2+1) so no group leaves an orphan card.
  const [front, academics, operations, everyone] = groups
  return (
    <div className="space-y-10">
      {row(front, 'lg:grid-cols-4')}
      {row(academics, 'lg:grid-cols-3 xl:grid-cols-5')}
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-4">
        <div className="lg:col-span-2">{row(operations, 'lg:grid-cols-2')}</div>
        {row(everyone, 'sm:grid-cols-1')}
      </div>
    </div>
  )
}

/** "A day at school": every row is a real scheduled job (plan §5.5). */
export function DayTimeline() {
  return (
    <ol className="relative mt-12 border-l-2 border-primary/20 pl-6 md:pl-8">
      {DAY_TIMELINE.map((e, i) => (
        <li
          key={e.time + e.text}
          data-reveal
          style={{ transitionDelay: `${Math.min(i, 6) * 40}ms` }}
          className="relative pb-7 last:pb-0"
        >
          <span
            className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background md:-left-[39px]"
            aria-hidden
          />
          <div className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
            <p className="font-mono text-sm font-medium tabular-nums text-primary">{e.time}</p>
            <div>
              <p className="text-foreground">{e.text}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{e.area}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function FaqList({ faqs = FAQS }: { faqs?: Faq[] }) {
  return (
    <div className="mt-10 divide-y rounded-xl border bg-card">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
            {f.q}
            <ChevronDown
              className="h-4 w-4 shrink-0 text-muted-foreground transition-transform [transition-duration:var(--duration-fast)] ease-out group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <p className="pb-5 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function faqJsonLd(faqs: Faq[] = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/**
 * Final CTA. Pass `children` to replace the buttons with a form (the home page
 * passes the short lead form, so other pages never bundle form code).
 */
export function CtaBand({
  title = 'See AIRTEC run your school',
  lead = 'A 30-minute demo on a seeded school, shaped around the modules you care about.',
  module,
  children,
}: {
  title?: string
  lead?: string
  module?: string
  children?: React.ReactNode
}) {
  const form = !!children
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div data-reveal className="relative overflow-hidden rounded-xl border bg-hero p-6 sm:p-10 md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden />
          <div className={cn('relative', !form && 'flex flex-col gap-8 md:flex-row md:items-end md:justify-between')}>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-4xl">{title}</h2>
              <p className="mt-3 text-lg text-muted-foreground">{lead}</p>
            </div>
            {form ? (
              <div className="mt-8">{children}</div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="shadow-glow-indigo">
                  <Link href={module ? `/contact?module=${module}` : '/contact'}>
                    Book a demo <ArrowRight aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/modules">Explore modules</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

