import { cn } from '@/lib/utils'

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)} {...props} />
}

/** A page chapter. `band` alternates in the faint accent tint (plan §3.4). */
export function Section({
  className,
  band,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { band?: boolean }) {
  return (
    <section className={cn('py-20 md:py-28', band && 'bg-band', className)} {...props}>
      <Container>{children}</Container>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div data-reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-lg text-muted-foreground md:text-xl">{lead}</p>}
    </div>
  )
}

/** Hero for inner pages: the same radial wash and dot grid as home, shorter. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute inset-0 bg-dot-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <Container className="relative pb-16 pt-14 md:pb-20 md:pt-20">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] md:text-5xl">{title}</h1>
          {lead && <p className="mt-5 text-lg text-muted-foreground md:text-xl">{lead}</p>}
        </div>
        {children}
      </Container>
    </section>
  )
}

/** Plain prose block for legal, about and similar pages. */
export function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-4 text-base leading-relaxed text-foreground/90 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5',
        className,
      )}
      {...props}
    />
  )
}
