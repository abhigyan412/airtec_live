import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { cn } from '@/lib/utils'

// The staff app's sidebar brand mark, unchanged.
export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow-indigo">
        <GraduationCap className="h-5 w-5 text-white" aria-hidden />
      </span>
      <span className="text-base font-bold tracking-tight text-foreground">AIRTEC</span>
    </Link>
  )
}
