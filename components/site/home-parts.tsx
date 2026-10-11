'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ROLE_TABS } from '@/content/site'
import { BrowserFrame } from './frames'
import { Check } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

// The short form is the last thing on the page, so its form and validation
// code loads after first paint instead of counting against the home page's JS
// budget (plan §11). The placeholder holds the same height and still offers
// the full form, so nothing shifts and nothing is lost without JS.
export const LazyShortLeadForm = dynamic(() => import('./short-lead-form').then((m) => m.ShortLeadForm), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[132px] items-center">
      <Link href="/contact" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Open the demo request form
      </Link>
    </div>
  ),
})

// Each role tab shows the same system from a different seat (plan §5.6). The
// visuals are rendered on the server and passed in, so they ship as HTML only.
export function RoleTabs({ visuals }: { visuals: Record<string, React.ReactNode> }) {
  return (
    <Tabs defaultValue="principal" className="mt-10">
      <TabsList className="h-auto flex-wrap justify-start gap-1 sm:flex-nowrap">
        {ROLE_TABS.map((r) => (
          <TabsTrigger key={r.id} value={r.id} className="px-3.5 py-1.5">
            For the {r.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {ROLE_TABS.map((r) => (
        <TabsContent key={r.id} value={r.id} className="mt-6">
          <div className="grid items-start gap-8 rounded-xl border bg-card p-5 md:grid-cols-2 md:p-8">
            <div>
              <h3 className="text-2xl font-bold tracking-[-0.02em]">{r.title}</h3>
              <ul className="mt-5 space-y-3">
                {r.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-muted-foreground">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <BrowserFrame url={r.id === 'parent' ? 'parents.airtec.in' : 'app.airtec.in'} className="bg-muted/40">
              <div className="p-4">{visuals[r.id]}</div>
            </BrowserFrame>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
