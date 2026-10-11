import type { Metadata } from 'next'
import { BellRing, FileSpreadsheet, Fingerprint, Globe, IndianRupee, Smartphone } from 'lucide-react'
import { PageHero, Section, SectionHeading } from '@/components/site/section'
import { CtaBand } from '@/components/site/blocks'

export const metadata: Metadata = {
  title: 'Platform',
  description: 'A staff mobile app and web app, a family portal with mobile apps, push notifications, Razorpay payments, biometric sync and Excel import.',
}

const ITEMS = [
  {
    icon: Globe,
    title: 'Staff mobile app and browser',
    body: 'Teachers, office staff and leadership have their own mobile app, separate from the parents’ one, and can also use AIRTEC in any modern browser, on a desktop at the counter or a laptop at home.',
  },
  {
    icon: Smartphone,
    title: 'Family portal and mobile apps',
    body: 'Parents and students have their own portal on its own login and address, with apps for Android and iOS.',
  },
  {
    icon: BellRing,
    title: 'Push notifications',
    body: 'Web Push to browsers and push to the mobile app, from one delivery queue. Each person can mute notification types, and the same event never notifies the same person twice in a day.',
  },
  {
    icon: IndianRupee,
    title: 'Online payments',
    body: 'Fees are paid through Razorpay. A payment is confirmed by a signed webhook from the gateway, not by the browser.',
  },
  {
    icon: Fingerprint,
    title: 'Biometric attendance',
    body: 'Staff attendance syncs from your biometric device, with device-to-staff mapping, and feeds timetable cover automatically.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Excel in, Excel out',
    body: 'Import timetables, syllabus, vehicles, drivers, stops and fee slabs from Excel. Timetable export uses the same format, so the file round-trips.',
  },
]

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="Works where your school already works"
        lead="Browsers for staff, phones for families, and imports from the spreadsheets you already have."
      />
      <Section className="pt-12 md:pt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <div key={it.title} data-reveal className="rounded-xl border bg-card p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <it.icon className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-semibold">{it.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section band>
        <SectionHeading
          eyebrow="Hosting"
          title="Hosted for you"
          lead="AIRTEC runs in the cloud, so there is nothing to install or maintain at school. Staff and families each reach it at their own address."
        />
      </Section>
      <CtaBand />
    </>
  )
}
