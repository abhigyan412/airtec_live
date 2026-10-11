import type { Metadata } from 'next'
import { BadgeCheck, Eye, GitBranch, KeyRound, ServerCog, ShieldCheck } from 'lucide-react'
import { PageHero, Section, SectionHeading } from '@/components/site/section'
import { CtaBand } from '@/components/site/blocks'

// Concrete facts only. No certifications, "bank-grade" or DPDP claims until
// they exist and legal has reviewed them (plan §8, Q5).

export const metadata: Metadata = {
  title: 'Security',
  description: 'Role-based access with custom roles, server-side scoping, approval records and verifiable certificates.',
}

const FACTS = [
  {
    icon: KeyRound,
    title: 'Roles and permissions',
    body: 'Built-in roles plus school-defined custom roles, such as Timetable Manager, Transport Manager or Librarian, with per-permission control.',
  },
  {
    icon: Eye,
    title: 'Scoped on the server',
    body: 'A teacher sees only their own classes and a parent sees only their own child. This is enforced on the server, not just hidden in the screen.',
  },
  {
    icon: ServerCog,
    title: 'Per-school data',
    body: 'Every school’s records are kept separate, and every request is scoped to the school of the person making it.',
  },
  {
    icon: GitBranch,
    title: 'One approval engine',
    body: 'Admissions, TCs, leave, comp-off, HR exits, fines and library acquisitions share one approval engine, so every decision has a recorded actor.',
  },
  {
    icon: ShieldCheck,
    title: 'Overrides leave a trail',
    body: 'Document-gate overrides, fee-hold extensions and waivers record who made them and why.',
  },
  {
    icon: BadgeCheck,
    title: 'Verifiable certificates',
    body: 'Any receiving school can check a TC or certificate number on a public verification page.',
  },
]

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Your school’s data, with access you control"
        lead="Safeguards we can show you in the product, rather than badges."
      />
      <Section className="pt-12 md:pt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.title} data-reveal className="rounded-xl border bg-card p-6">
              <f.icon className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="mt-4 font-semibold">{f.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section band>
        <SectionHeading
          eyebrow="Your data"
          title="It belongs to your school"
          lead="Have a question about hosting, backups or data handling? Ask us on the demo call and we’ll walk your IT person through it."
        />
      </Section>
      <CtaBand title="Questions about data?" lead="Bring your IT person to the demo. We’ll answer in detail." />
    </>
  )
}
