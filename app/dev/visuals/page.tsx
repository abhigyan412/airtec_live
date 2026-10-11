import type { Metadata } from 'next'
import { Container } from '@/components/site/section'
import { MicroVisual } from '@/components/visuals'
import { MODULES, type Visual } from '@/content/modules'

// Build check for the micro-visuals (module-features-plan.md §6): every type,
// with every instance the content file uses, side by side in the current theme
// and in dark. Switch the site to light to compare light against dark. Not
// linked from anywhere, not indexed, and blocked in robots.txt.

export const metadata: Metadata = {
  title: 'Micro-visuals',
  robots: { index: false, follow: false },
}

const ORDER: Visual['type'][] = [
  'pills',
  'bar',
  'rows',
  'flow',
  'stat',
  'settings',
  'grid',
  'month',
  'phone',
  'doc',
  'chart',
  'scan',
  'compare',
  'clock',
  'form',
]

export default function VisualsPage() {
  const all = MODULES.flatMap((m) => m.groups.flatMap((g) => g.features.map((f) => ({ module: m.name, f }))))
  return (
    <Container className="py-12">
      <h1 className="text-3xl font-bold tracking-[-0.02em]">Micro-visuals</h1>
      <p className="mt-2 text-muted-foreground">
        {all.length} feature visuals across {ORDER.length} types. Left: current theme. Right: dark. Hover a card to replay its animation.
      </p>
      {ORDER.map((type) => {
        const items = all.filter((x) => x.f.visual.type === type)
        return (
          <section key={type} className="mt-12">
            <h2 className="font-mono text-sm font-semibold text-primary">
              {type} · {items.length}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {items.map(({ module, f }) => (
                <div key={module + f.title} className="contents">
                  {[false, true].map((dark) => (
                    <div key={String(dark)} className={dark ? 'dark' : undefined}>
                      <div data-reveal data-inview className="rounded-xl border bg-card p-4 text-card-foreground">
                        <MicroVisual visual={f.visual} />
                        <p className="mt-3 text-sm font-semibold">{f.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {module}
                          {f.gated && ' · gated, hidden on the site'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </Container>
  )
}
