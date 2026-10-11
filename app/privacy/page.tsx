import type { Metadata } from 'next'
import { Alert } from '@/components/ui/alert'
import { PageHero, Prose, Section } from '@/components/site/section'
import { CONTACT_EMAIL } from '@/lib/utils'

// DRAFT. The contact form must not go live until this page has been written and
// reviewed for real (plan §15, Q5).

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How AIRTEC handles the information you share with us through this website.',
  robots: { index: false },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <Section className="pt-10 md:pt-12">
        <Alert variant="warning" title="Draft" className="mb-8 max-w-3xl">
          This policy is a placeholder pending legal review.
        </Alert>
        <Prose>
          <h2>What we collect on this website</h2>
          <p>
            When you request a demo or ask a question, we collect what you type into the form: your name, role, school,
            city and state, phone number, and optionally your email, student strength, board, modules of interest and
            message. We also record the page you submitted from and any campaign tags in the link you followed.
          </p>
          <h2>Why we collect it</h2>
          <p>Only to contact you about AIRTEC, as you agreed when you submitted the form.</p>
          <h2>Who can see it</h2>
          <p>Only the AIRTEC team. We do not sell or share it.</p>
          <h2>Your choices</h2>
          <p>
            To see, correct or delete what we hold about you, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Prose>
      </Section>
    </>
  )
}
