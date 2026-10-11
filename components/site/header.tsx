'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, Gift, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from './logo'
import { modulesByGroup } from '@/content/modules'
import { cn } from '@/lib/utils'

const NAV: { href: string; label: string; flash?: boolean }[] = [
  { href: '/why-airtec', label: 'Why AIRTEC' },
  // `flash` draws the eye to the free-trial offer (see .nav-flash in globals.css).
  { href: '/free-trial', label: 'Free trial', flash: true },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

type MenuId = 'modules' | null

/** Closes an open menu on Escape (returning focus to its trigger) or an outside click. */
function useDismiss(open: MenuId, close: () => void, refs: Record<string, React.RefObject<HTMLElement>>) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const trigger = refs[open]?.current?.querySelector<HTMLElement>('[aria-expanded]')
      close()
      trigger?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      const root = refs[open]?.current
      if (root && !root.contains(e.target as Node)) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open, close, refs])
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState<MenuId>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const modulesRef = useRef<HTMLDivElement>(null)
  const refs = useRef({ modules: modulesRef }).current

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenu(null)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const close = useRef(() => setMenu(null)).current
  useDismiss(menu, close, refs)

  const groups = modulesByGroup()
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-[background-color,border-color,backdrop-filter] [transition-duration:var(--duration-base)] ease-out',
        scrolled || mobileOpen
          ? 'glass rounded-none border-x-0 border-t-0 !border-b-border'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <div ref={modulesRef} className="relative">
            <button
              type="button"
              aria-expanded={menu === 'modules'}
              aria-controls="modules-menu"
              onClick={() => setMenu(menu === 'modules' ? null : 'modules')}
              className={cn(
                'inline-flex h-9 items-center gap-1 rounded-lg px-3 text-sm font-medium transition-colors [transition-duration:var(--duration-fast)] ease-out hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isActive('/modules') ? 'text-primary' : 'text-foreground/80',
              )}
            >
              Modules
              <ChevronDown
                className={cn('h-4 w-4 transition-transform [transition-duration:var(--duration-fast)] ease-out', menu === 'modules' && 'rotate-180')}
                aria-hidden
              />
            </button>
            {menu === 'modules' && (
              <div
                id="modules-menu"
                className="absolute left-1/2 top-full mt-2 w-[min(860px,calc(100vw-2rem))] -translate-x-1/2 rounded-xl border bg-popover p-5 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 [animation-duration:var(--duration-base)]"
              >
                <div className="grid grid-cols-4 gap-5">
                  {groups.map(({ group, modules }) => (
                    <div key={group}>
                      <p className="eyebrow mb-2 px-2">{group}</p>
                      <ul className="space-y-0.5">
                        {modules.map((m) => (
                          <li key={m.slug}>
                            <Link
                              href={`/modules/${m.slug}`}
                              className="group flex items-start gap-2.5 rounded-lg px-2 py-2 transition-colors [transition-duration:var(--duration-fast)] ease-out hover:bg-sidebar-accent focus-visible:bg-sidebar-accent focus-visible:outline-none"
                            >
                              <m.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                              <span className="min-w-0">
                                <span className="block text-sm font-medium group-hover:text-sidebar-accent-foreground">{m.name}</span>
                                <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{m.short}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <p className="text-sm text-muted-foreground">12 modules, one record per student and per staff member.</p>
                  <Link href="/modules" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4">
                    All modules <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            )}
          </div>
          {NAV.map((item) =>
            item.flash ? (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className="nav-flash relative mx-1 inline-flex h-8 items-center gap-1.5 rounded-full bg-primary/10 px-3 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/30 transition-colors [transition-duration:var(--duration-fast)] ease-out hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="nav-flash-sweep" aria-hidden />
                <Gift className="h-3.5 w-3.5" aria-hidden />
                {item.label}
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5" aria-hidden>
                  <span className="nav-flash-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                </span>
              </Link>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'inline-flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors [transition-duration:var(--duration-fast)] ease-out hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive(item.href) ? 'text-primary' : 'text-foreground/80',
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild className="shadow-glow-indigo">
            <Link href="/contact">Book a demo</Link>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t bg-background px-4 pb-10 pt-4 lg:hidden">
          {groups.map(({ group, modules }) => (
            <div key={group} className="mb-5">
              <p className="eyebrow mb-1.5">{group}</p>
              <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                {modules.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/modules/${m.slug}`} className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent">
                      <m.icon className="h-4 w-4 text-primary" aria-hidden />
                      {m.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-0.5 border-t pt-4">
            {[{ href: '/modules', label: 'All modules' }, ...NAV].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium hover:bg-accent',
                  'flash' in item && item.flash && 'nav-flash relative w-fit bg-primary/10 px-3 font-semibold text-primary',
                )}
              >
                {'flash' in item && item.flash && (
                  <>
                    <span className="nav-flash-sweep" aria-hidden />
                    <Gift className="h-3.5 w-3.5" aria-hidden />
                  </>
                )}
                {item.label}
              </Link>
            ))}
          </div>
          <Button asChild size="lg" className="mt-6 w-full shadow-glow-indigo">
            <Link href="/contact">Book a demo</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
