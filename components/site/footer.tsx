import Link from 'next/link'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { MODULES } from '@/content/modules'
import { CONTACT_EMAIL } from '@/lib/utils'

const COMPANY = [
  { href: '/why-airtec', label: 'Why AIRTEC' },
  { href: '/platform', label: 'Platform' },
  { href: '/security', label: 'Security' },
  { href: '/free-trial', label: 'Free trial' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              One system for the entire school, from admissions to alumni.
            </p>
            <p className="mt-4 text-sm">
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline-offset-4 hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
            <ThemeToggle className="mt-6" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol title="Modules" links={MODULES.map((m) => ({ href: `/modules/${m.slug}`, label: m.name }))} />
            <FooterCol title="Company" links={COMPANY} />
            <FooterCol
              title="Legal"
              links={[
                { href: '/privacy', label: 'Privacy' },
                { href: '/terms', label: 'Terms' },
              ]}
            />
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} AIRTEC. All rights reserved.</p>
          <p>Made for Indian schools.</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  const cls = 'text-sm text-muted-foreground transition-colors [transition-duration:var(--duration-fast)] hover:text-foreground'
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            {l.external ? (
              <a href={l.href} className={cls}>
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className={cls}>
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
