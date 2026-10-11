import Link from 'next/link'
import { ArrowRight, Gift } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TRIAL } from '@/content/site'
import { Container } from './section'

/** Slim site-wide strip above the header announcing the free-trial offer. */
export function TrialBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <Container className="flex items-center justify-center gap-x-3 gap-y-1 py-2 text-center text-sm max-sm:flex-col">
        <span className="inline-flex items-center gap-1.5">
          <Gift className="h-4 w-4 shrink-0" aria-hidden />
          <span>{TRIAL.banner}</span>
        </span>
        <Link
          href="/free-trial"
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
        >
          Pick your module <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </Container>
    </div>
  )
}

/** Home and inner-page band: the offer, its three points and the CTA. */
export function TrialBand() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <div
          data-reveal
          className="flex flex-col gap-6 rounded-xl border border-primary/30 bg-card bg-[linear-gradient(135deg,hsl(var(--primary)/0.12),transparent_60%)] p-6 sm:p-10 md:flex-row md:items-center md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              <Gift className="h-3.5 w-3.5" aria-hidden />
              {TRIAL.badge}
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.02em] md:text-4xl">{TRIAL.headline}</h2>
            <p className="mt-3 text-lg text-muted-foreground">{TRIAL.lead}</p>
          </div>
          <Button asChild size="lg" className="h-11 shrink-0 shadow-glow-indigo">
            <Link href="/free-trial">
              Pick your module <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
