import Link from 'next/link'
import { ArrowRight, Check, CircleCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MicroVisual } from '@/components/visuals'
import { StatusPill } from './status-pill'
import { SwipeRow } from './swipe-row'
import type { Feature, Module, Spotlight } from '@/content/modules'
import { cn } from '@/lib/utils'

// The module feature section (module-features-plan.md §3–4): outcome chips,
// a hero standout in a bento with two feature cards beside it, two alternating
// spotlight rows, grouped feature cards with a micro-visual each, a detail
// list for the long tail, and a closing CTA strip.

export function OutcomeChips({ outcomes }: { outcomes: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Outcomes">
      {outcomes.map((o) => (
        <li key={o} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
          <CircleCheck className="h-3.5 w-3.5" aria-hidden />
          {o}
        </li>
      ))}
    </ul>
  )
}

/** §4.2: spans 2×2 on desktop and the full width below it. */
export function HeroStandout({ hero, mockup }: { hero: Module['hero']; mockup: React.ReactNode }) {
  return (
    <article
      data-reveal
      className="flex flex-col rounded-xl border bg-card bg-[linear-gradient(135deg,hsl(var(--primary)/0.10),transparent_60%)] p-5 sm:col-span-2 md:p-8 lg:row-span-2"
    >
      <span className="inline-flex w-fit items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
        <Star className="h-3 w-3 fill-current" aria-hidden />
        Standout
      </span>
      <h2 className="mt-4 text-2xl font-bold tracking-[-0.02em]">{hero.title}</h2>
      <p className="mt-3 text-[15px] leading-6 text-muted-foreground">{hero.problem}</p>
      <p className="mt-1 text-[15px] leading-6 text-foreground">{hero.solution}</p>
      <div className="mt-6 flex flex-1 flex-col justify-center md:pt-4">{mockup}</div>
    </article>
  )
}

/**
 * §4.4: micro-visual on top, then icon, title, optional chip and the one-liner.
 * The reveal (and `data-inview`, which starts the visual's animation) lives on
 * the wrapper so its transform never fights the card's hover lift; hovering
 * the wrapper replays the animation.
 */
export function FeatureCard({ f, index, className }: { f: Feature; index: number; className?: string }) {
  return (
    <li data-reveal style={{ transitionDelay: `${Math.min(index, 8) * 40}ms` }} className={cn('h-full', className)}>
      <div className="flex h-full flex-col rounded-xl border bg-card p-4 transition-[transform,border-color] [transition-duration:var(--duration-fast)] ease-out hover:-translate-y-0.5 hover:border-primary/40 motion-reduce:hover:translate-y-0">
        <MicroVisual visual={f.visual} />
        <div className="mt-4 flex items-start gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <f.icon className="h-4 w-4" aria-hidden />
          </span>
          <h3 className="min-w-0 flex-1 pt-1 text-base font-semibold leading-snug text-foreground">{f.title}</h3>
          {f.chip && (
            <StatusPill tone={f.chip.tone} className="mt-1 shrink-0">
              {f.chip.label}
            </StatusPill>
          )}
        </div>
        <p className="mt-2 text-[15px] leading-6 text-muted-foreground">{f.line}</p>
      </div>
    </li>
  )
}

/** The two cards stacked beside the hero standout in the bento. */
export function BentoSide({ features }: { features: Feature[] }) {
  return (
    <ul className="grid gap-4 sm:col-span-2 sm:grid-cols-2 lg:col-span-1 lg:row-span-2 lg:grid-cols-1">
      {features.map((f, i) => (
        <FeatureCard key={f.title} f={f} index={i + 1} />
      ))}
    </ul>
  )
}

// Spans on a 12-column desktop grid, chosen so every row is full: 3 per row
// where the count divides by 3, otherwise 2 or 4 per row, and a 3 + 2 split
// for five. Literal class names so Tailwind generates them.
const LG_SPAN: Record<number, string> = { 3: 'lg:col-span-3', 4: 'lg:col-span-4', 6: 'lg:col-span-6', 12: 'lg:col-span-12' }

function lgSpan(n: number, i: number) {
  if (n === 1) return 12
  if (n % 3 === 0) return 4
  if (n === 2) return 6
  if (n === 4 || n === 8) return 3
  if (n === 5) return i < 3 ? 4 : 6
  return 4
}

/** A feature group: a swipe row on phones, an evenly filled grid from 640px. */
export function FeatureGroup({ features }: { features: Feature[] }) {
  const n = features.length
  return (
    <SwipeRow gridClassName="sm:grid-cols-2 lg:grid-cols-12">
      {features.map((f, i) => (
        <FeatureCard
          key={f.title}
          f={f}
          index={i}
          // On tablet's two columns an odd last card takes the whole row.
          className={cn(n % 2 === 1 && i === n - 1 && 'sm:col-span-2', LG_SPAN[lgSpan(n, i)])}
        />
      ))}
    </SwipeRow>
  )
}

/**
 * §4.3: full-width row, text 5/12 and visual 7/12, sides alternating. The
 * visual sits in a framed panel (~320px) with a faint grid.
 */
export function SpotlightRow({ s, mockup, flip }: { s: Spotlight; mockup: React.ReactNode; flip?: boolean }) {
  return (
    <article className="grid items-center gap-8 py-12 lg:grid-cols-12 lg:gap-12">
      <div data-reveal className={cn('lg:col-span-5', flip && 'lg:order-2')}>
        <p className="eyebrow">{s.eyebrow}</p>
        <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em]">{s.title}</h2>
        <p className="mt-3 text-[15px] leading-6 text-muted-foreground">{s.line}</p>
        <ul className="mt-5 space-y-2.5">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-[15px]">
              <Check className="h-4 w-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div
        data-reveal
        className={cn(
          'relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl border bg-accent/40 p-4 sm:p-8 lg:col-span-7',
          flip && 'lg:order-1',
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-dot-grid" aria-hidden />
        <div className="relative w-full">{mockup}</div>
      </div>
    </article>
  )
}

/** §4.7 group label: eyebrow with a rule running to the right. */
export function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-primary">{children}</h2>
      <span className="h-px flex-1 bg-border" aria-hidden />
    </div>
  )
}

/** §4.7: accent-tinted card of checkmark phrases for the long tail. */
export function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div data-reveal className="rounded-xl border bg-band p-5 md:p-8">
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-4 grid gap-x-8 gap-y-2.5 md:grid-cols-2">
        {items.map((it) => (
          <li key={it} className="flex items-center gap-2.5 text-[15px]">
            <Check className="h-4 w-4 shrink-0 text-success" strokeWidth={2.5} aria-hidden />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Closing strip (§3): "See it on your own data → Book a demo". */
export function CtaStrip({ module, name }: { module: string; name: string }) {
  return (
    <div data-reveal className="flex flex-col gap-4 rounded-xl border bg-card p-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-lg font-semibold">See it on your own data</p>
        <p className="mt-0.5 text-sm text-muted-foreground">Or pick {name} as your free trial module. No payment details needed.</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild size="lg" variant="outline">
          <Link href={`/free-trial?module=${module}`}>Try {name} free</Link>
        </Button>
        <Button asChild size="lg" className="shadow-glow-indigo">
          <Link href={`/contact?module=${module}`}>
            Book a demo <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </div>
  )
}
