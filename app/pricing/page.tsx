import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero, Section } from '@/components/site/section'
import { FaqList } from '@/components/site/blocks'
import { FAQS } from '@/content/site'
import { cn } from '@/lib/utils'

// Plan shapes and "Talk to us", no numbers: the default for open question Q1.

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'AIRTEC pricing is shaped around your school’s size and the modules you use. Talk to us for a quote.',
}

const PLANS = [
  {
    name: 'Core',
    for: 'Front office first',
    items: ['Admissions', 'Students', 'Fees', 'Certificates & Documents', 'Family Portal & Notifications'],
  },
  {
    name: 'Complete',
    for: 'The whole school',
    featured: true,
    items: ['Everything in Core', 'Timetable and daily cover', 'Exams & Results', 'Attendance', 'Homework & Syllabus', 'Library'],
  },
  {
    name: 'Complete + Operations',
    for: 'Campus, fleet and staff',
    items: ['Everything in Complete', 'Transport', 'HR & Payroll', 'Biometric attendance sync'],
  },
]

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Priced for your school, not a generic tier"
        lead="Cost depends on student strength and the modules you switch on. Tell us about your school and we’ll send a clear quote."
      />
      <Section className="pt-12 md:pt-16">
        <div className="mb-8 flex flex-col gap-3 rounded-xl border border-primary/30 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px]">
            <span className="font-semibold">Not ready to choose a plan?</span> Pick any one module and try it free. No payment details needed.
          </p>
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/free-trial">Pick your module</Link>
          </Button>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.name}
              data-reveal
              className={cn('flex flex-col rounded-xl border bg-card p-6', p.featured && 'border-primary ring-1 ring-primary')}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{p.name}</h2>
                {p.featured && <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">Most schools</span>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.for}</p>
              <p className="mt-6 text-2xl font-bold tracking-[-0.02em]">Talk to us</p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.items.map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {it}
                  </li>
                ))}
              </ul>
              <Button asChild className={cn('mt-8', p.featured && 'shadow-glow-indigo')} variant={p.featured ? 'default' : 'outline'}>
                <Link href="/contact">
                  Get a quote <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Every plan includes the family portal and push notifications.
        </p>
      </Section>
      <Section band>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-3xl font-bold tracking-[-0.02em]">Common questions</h2>
          <FaqList faqs={FAQS.slice(0, 3)} />
        </div>
      </Section>
    </>
  )
}
