import type { Metadata } from 'next'
import { Alert } from '@/components/ui/alert'
import { PageHero, Prose, Section } from '@/components/site/section'

// DRAFT pending legal review (plan §15, Q5).

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for the AIRTEC website.',
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" />
      <Section className="pt-10 md:pt-12">
        <Alert variant="warning" title="Draft" className="mb-8 max-w-3xl">
          These terms are a placeholder pending legal review.
        </Alert>
        <Prose>
          <h2>This website</h2>
          <p>
            This website describes AIRTEC and lets schools contact us. Product screens shown here are illustrations built
            with sample data; names and numbers are not real.
          </p>
          <h2>Using AIRTEC</h2>
          <p>Use of the AIRTEC product itself is governed by the agreement signed with each school.</p>
        </Prose>
      </Section>
    </>
  )
}
