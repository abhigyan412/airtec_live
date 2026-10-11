import type { Metadata } from 'next'
import { PageHero, Prose, Section } from '@/components/site/section'
import { CtaBand } from '@/components/site/blocks'

export const metadata: Metadata = {
  title: 'About',
  description: 'Why we built AIRTEC: one system for how Indian schools actually work.',
}

// Team and story copy to be supplied; the structure is ready for it.
export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title="Built for how Indian schools actually work" />
      <Section className="pt-12 md:pt-16">
        <Prose>
          <p>
            Most schools run on a patchwork: paper registers, an Excel timetable, a fee receipt book, a WhatsApp group
            for parents and separate software for the biometric device. Each tool works on its own, and none of them talk
            to each other.
          </p>
          <p>
            AIRTEC replaces that patchwork with one system. A seat released in admissions offers the next family on the
            waitlist. A teacher who hasn’t checked in becomes a cover request before the first bell. A library fine lands
            on the same bill as tuition. And because every school’s rules are different, every rule is a setting rather
            than code.
          </p>
          <h2>Our approach</h2>
          <ul>
            <li>Make the number on screen the truth: seats, balances and results the system guarantees.</li>
            <li>Automate the jobs someone has to remember every morning.</li>
            <li>Start from how the school already works, including its spreadsheets.</li>
            <li>Build for every user, including accessible colours and reduced motion.</li>
          </ul>
        </Prose>
      </Section>
      <CtaBand />
    </>
  )
}
