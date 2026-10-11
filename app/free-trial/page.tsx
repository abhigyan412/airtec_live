import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CircleCheck } from 'lucide-react'
import { Container } from '@/components/site/section'
import { TrialForm } from '@/components/site/trial-form'
import { TRIAL } from '@/content/site'

export const metadata: Metadata = {
  title: 'Free trial',
  description: 'Pick any one AIRTEC module and try it free for a short trial, set up on your own school. No payment details needed.',
}

export default function FreeTrialPage() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:linear-gradient(to_bottom,black,transparent_50%)]" aria-hidden />
      <Container className="relative py-14 md:py-20">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">{TRIAL.badge}</span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">{TRIAL.headline}</h1>
          <p className="mt-5 text-lg text-muted-foreground md:text-xl">{TRIAL.lead}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {TRIAL.points.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                <CircleCheck className="h-3.5 w-3.5" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {TRIAL.steps.map((s, i) => (
            <li key={s.title} className="flex gap-3 rounded-xl border bg-card p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-mono text-sm font-semibold text-primary">{i + 1}</span>
              <span>
                <span className="block font-semibold">{s.title}</span>
                <span className="mt-1 block text-[15px] leading-6 text-muted-foreground">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 rounded-xl border bg-card p-5 sm:p-8">
          <Suspense fallback={<div className="h-[900px]" />}>
            <TrialForm />
          </Suspense>
        </div>
      </Container>
    </section>
  )
}
