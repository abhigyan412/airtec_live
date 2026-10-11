import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Clock, Mail, MonitorPlay } from 'lucide-react'
import { Container } from '@/components/site/section'
import { LeadForm } from '@/components/site/lead-form'
import { CONTACT_EMAIL } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Book a demo',
  description: 'Ask a question or book a 30-minute AIRTEC demo. We’ll call you within one working day.',
}

const STEPS = [
  { icon: Clock, title: 'We call within one working day', body: 'To understand your school and which modules matter most.' },
  { icon: MonitorPlay, title: 'A 30-minute demo', body: 'On a seeded demo school, shaped around your questions.' },
  { icon: Mail, title: 'A clear quote', body: 'Based on your student strength and the modules you choose.' },
]

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" aria-hidden />
      <Container className="relative grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">Book a demo or ask a question</h1>
          <p className="mt-5 text-lg text-muted-foreground">Tell us a little about your school. Only the starred fields are required.</p>
          <ol className="mt-10 space-y-6">
            {STEPS.map((s) => (
              <li key={s.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">{s.title}</span>
                  <span className="block text-sm text-muted-foreground">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-muted-foreground">
            Prefer email?{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5 sm:p-8">
          <Suspense fallback={<div className="h-[640px]" />}>
            <LeadForm />
          </Suspense>
        </div>
      </Container>
    </section>
  )
}
