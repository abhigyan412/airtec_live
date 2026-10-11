import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/site/section'

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page isn’t here" lead="It may have moved. The modules and the demo form are a click away.">
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="shadow-glow-indigo">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/modules">Explore modules</Link>
        </Button>
      </div>
    </PageHero>
  )
}
