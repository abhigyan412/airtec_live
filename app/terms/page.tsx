import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero, Prose, Section } from '@/components/site/section'
import { CONTACT_EMAIL, DOMAIN } from '@/lib/utils'

// AIRTEC is not yet a registered company: when it is, name it in the first
// section and bump LAST_UPDATED.

const LAST_UPDATED = '12 October 2025'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for the AIRTEC website and free trial.',
}

const link = 'font-medium text-primary underline-offset-4 hover:underline'

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of use" lead={`Last updated ${LAST_UPDATED}`} />
      <Section className="pt-10 md:pt-12">
        <Prose>
          <h2>About these terms</h2>
          <p>
            These terms apply to your use of this website ({DOMAIN}) and to a free trial you request through it. By
            using the website you agree to them. “AIRTEC”, “we” and “us” mean the team that makes the AIRTEC school
            management system.
          </p>
          <p>
            A school’s paid use of AIRTEC is governed by a separate agreement signed with that school. If that agreement
            and these terms disagree, the agreement wins.
          </p>

          <h2>What this website is</h2>
          <p>
            This website describes AIRTEC and lets schools contact us. Product screens shown here are illustrations
            built with sample data; the names, numbers and schools in them are not real. We keep improving AIRTEC, so
            features may change, and anything on this website is a description, not a promise of a particular feature,
            price or result. Prices, where shown, are indicative until confirmed in writing.
          </p>

          <h2>Requests you send us</h2>
          <p>
            When you fill in a form, please give accurate details and only submit a request on behalf of a school you
            are allowed to represent. How we use what you send is explained in our{' '}
            <Link href="/privacy" className={link}>
              privacy policy
            </Link>
            .
          </p>

          <h2>Free trial</h2>
          <ul>
            <li>A school can try one AIRTEC module free of charge for a limited period, which we confirm when we set the trial up.</li>
            <li>No payment details are needed, and the trial does not turn into a paid plan automatically.</li>
            <li>
              Trials are for schools in India and are offered at our discretion. We may decline a request, or end a
              trial early if it is misused.
            </li>
            <li>
              Please use realistic but limited data during a trial. Before the trial ends we will tell you how to keep
              your data if you continue, or export it if you don’t. Trial data is deleted after the trial if you don’t
              continue.
            </li>
          </ul>

          <h2>Acceptable use</h2>
          <p>You must not:</p>
          <ul>
            <li>try to break into, overload or disrupt the website or AIRTEC;</li>
            <li>copy the website in bulk with automated tools, or submit forms automatically;</li>
            <li>send false, misleading or someone else’s details;</li>
            <li>use the website for anything unlawful.</li>
          </ul>

          <h2>Our content</h2>
          <p>
            The AIRTEC name, logo, website content and product designs belong to us. You may share links to this
            website and quote it fairly, but not copy it to promote another product.
          </p>

          <h2>Other websites</h2>
          <p>This website may link to other websites, such as app stores or payment providers. We are not responsible for their content or practices.</p>

          <h2>Our responsibility</h2>
          <p>
            We work to keep this website accurate and available, but it is provided “as is”, and we can’t promise it
            will always be error-free or uninterrupted. To the extent the law allows, we are not liable for any indirect
            or consequential loss arising from use of this website or a free trial. Nothing in these terms limits any
            liability that cannot be limited under Indian law.
          </p>

          <h2>Law</h2>
          <p>These terms are governed by the laws of India.</p>

          <h2>Changes and contact</h2>
          <p>
            We may update these terms and will post the new version here with a new date at the top. Questions? Write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className={link}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Prose>
      </Section>
    </>
  )
}
