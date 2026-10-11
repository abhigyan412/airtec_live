import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero, Prose, Section } from '@/components/site/section'
import { CONTACT_EMAIL, DOMAIN } from '@/lib/utils'

// Written for the Digital Personal Data Protection Act, 2023 and its 2025
// Rules. AIRTEC is not yet a registered company: when it is, put its legal
// name and registered office in "Who we are" and bump LAST_UPDATED.

const LAST_UPDATED = '12 October 2025'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How AIRTEC handles the information you share through this website, and the school data it holds on behalf of schools.',
}

function Mail() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline-offset-4 hover:underline">
      {CONTACT_EMAIL}
    </a>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" lead={`Last updated ${LAST_UPDATED}`} />
      <Section className="pt-10 md:pt-12">
        <Prose>
          <p>
            This policy explains what personal data AIRTEC collects, why, and what you can do about it. It covers two
            things: this website ({DOMAIN}), and the AIRTEC school management system that schools use for their staff,
            students and parents.
          </p>

          <h2>Who we are</h2>
          <p>
            AIRTEC (“we”, “us”) makes school management software for Indian schools. For anything in this policy, write
            to <Mail />.
          </p>

          <h2>Part 1: this website</h2>
          <p>
            For data you give us through this website, we decide why and how it is used, so we are the Data Fiduciary
            under the Digital Personal Data Protection Act, 2023.
          </p>

          <h2>What we collect</h2>
          <p>When you request a demo, a free trial or a callback, we collect what you type into the form:</p>
          <ul>
            <li>your name, role, school, city and state, and your phone number;</li>
            <li>
              if you choose to give them: your email, the school’s student strength and board, the modules you are
              interested in, the module you want to trial, and your message.
            </li>
          </ul>
          <p>
            We also record the page you sent the form from, any campaign tags in the link you followed (such as
            “utm_source”), and the time you agreed to be contacted.
          </p>
          <p>
            This website does not use advertising or analytics cookies. It stores one setting in your browser, your
            choice of light or dark theme, which never leaves your device. If we add analytics in the future, we will
            update this policy first.
          </p>

          <h2>Why we use it</h2>
          <p>Only to respond to your request: to call or write to you about AIRTEC, arrange a demo, and set up a trial you asked for. Your consent, given when you tick the box on the form, is the basis for this.</p>
          <p>We do not sell your data, rent it, or add it to lists for other companies.</p>

          <h2>Who can see it</h2>
          <p>
            Only the AIRTEC team. We use a few service providers to run the website, who handle the data only on our
            instructions:
          </p>
          <ul>
            <li>Vercel, which hosts this website;</li>
            <li>Supabase, the database where enquiries are stored;</li>
            <li>Discord, which we use to alert our team that a new enquiry has arrived.</li>
          </ul>
          <p>
            Some of these providers may store or process data outside India. We only use providers with appropriate
            security, and we do not transfer data to any country the Government of India has restricted.
          </p>
          <p>We may also disclose data where the law requires it, for example in response to a valid order from a court or government authority.</p>

          <h2>How long we keep it</h2>
          <p>
            We keep an enquiry while we are in conversation with you. If you become a customer, it becomes part of
            your school’s account. Otherwise, we delete it when it is no longer needed, and at the latest two years
            after our last contact with you. If you withdraw consent, we delete it sooner (see below).
          </p>

          <h2>Part 2: data schools keep in AIRTEC</h2>
          <p>
            Schools use AIRTEC to manage records about their students, parents and staff: for example admissions,
            attendance, marks, fees, timetables and staff records. For this data:
          </p>
          <ul>
            <li>
              <strong>The school is the Data Fiduciary.</strong> It decides what is collected and why, and it is
              responsible for getting any consent needed, including verifiable consent from a parent or guardian for a
              child’s data.
            </li>
            <li>
              <strong>AIRTEC is the Data Processor.</strong> We process this data only to provide the service to the
              school, on the school’s instructions and under our agreement with it.
            </li>
            <li>
              We never sell school data, never use it for advertising, and never track or profile children for
              targeted advertising.
            </li>
            <li>
              Access inside a school is limited by role: staff see only what their role allows, a teacher sees only
              their own classes, and a parent sees only their own child. Read more on our{' '}
              <Link href="/security" className="font-medium text-primary underline-offset-4 hover:underline">
                security page
              </Link>
              .
            </li>
            <li>
              When a school stops using AIRTEC, it can export its data, after which we delete it as set out in our
              agreement with the school.
            </li>
          </ul>
          <p>
            If you are a parent, student or staff member and want to see, correct or delete your data in AIRTEC, please
            contact your school first, since it controls that data. We will help the school respond. You can also write
            to us and we will pass your request to the school.
          </p>

          <h2>Keeping data safe</h2>
          <p>
            We use reasonable security safeguards to protect personal data, including encrypted connections, access
            limited to people who need it, and separation of each school’s data. If a personal data breach happens, we
            will inform the affected schools, people and the Data Protection Board of India as the law requires.
          </p>

          <h2>Your rights</h2>
          <p>Under the Digital Personal Data Protection Act, 2023, you can:</p>
          <ul>
            <li>ask what personal data we hold about you and how we use it;</li>
            <li>ask us to correct, complete or update it;</li>
            <li>withdraw your consent and ask us to erase it (this does not affect anything we did before you withdrew);</li>
            <li>nominate someone to exercise these rights for you if you die or are unable to;</li>
            <li>raise a grievance with us, as described below.</li>
          </ul>
          <p>
            To use any of these rights, email <Mail /> from the phone number’s owner or the email you gave us, so we can
            confirm it is you.
          </p>

          <h2>Grievance Officer</h2>
          <p>
            If you have a concern about how we handle your data, write to our Grievance Officer at <Mail /> with
            “Privacy” in the subject line. We will acknowledge it within 2 working days and aim to resolve it within 30
            days. If you are not satisfied with our response, you can complain to the Data Protection Board of India.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change this policy, we will post the new version here and update the date at the top. If a change
            significantly affects how we use data you have already given us, we will tell you before it takes effect.
          </p>
        </Prose>
      </Section>
    </>
  )
}
