import type { Metadata } from 'next'
import { PageHero, Section } from '@/components/site/section'
import { CtaBand, ModuleGrid } from '@/components/site/blocks'

export const metadata: Metadata = {
  title: 'Modules',
  description:
    'Admissions, students, fees, certificates, timetable, exams, attendance, homework, library, transport, HR & payroll and a family portal, in one connected school ERP.',
}

export default function ModulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Modules"
        title="Twelve modules. One record per student."
        lead="Pick the one you care about most. Each page shows how it works, what makes it different, and how it connects to the rest."
      />
      <Section className="pt-12 md:pt-16">
        <ModuleGrid />
      </Section>
      <CtaBand />
    </>
  )
}
