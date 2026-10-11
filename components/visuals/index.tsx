import type { Visual } from '@/content/modules'
import { cn } from '@/lib/utils'
import { BarVisual } from './Bar'
import { ChartVisual } from './Chart'
import { ClockVisual } from './Clock'
import { CompareVisual } from './Compare'
import { DocVisual } from './Doc'
import { FlowVisual } from './Flow'
import { FormVisual } from './Form'
import { GridVisual, MonthVisual } from './Grid'
import { PhoneVisual } from './Phone'
import { PillsVisual } from './Pills'
import { RowsVisual } from './Rows'
import { ScanVisual } from './Scan'
import { SettingsVisual } from './Settings'
import { StatVisual } from './Stat'

function Inner({ v }: { v: Visual }) {
  switch (v.type) {
    case 'pills':
      return <PillsVisual v={v} />
    case 'bar':
      return <BarVisual v={v} />
    case 'rows':
      return <RowsVisual v={v} />
    case 'flow':
      return <FlowVisual v={v} />
    case 'stat':
      return <StatVisual v={v} />
    case 'settings':
      return <SettingsVisual v={v} />
    case 'grid':
      return <GridVisual v={v} />
    case 'month':
      return <MonthVisual v={v} />
    case 'phone':
      return <PhoneVisual v={v} />
    case 'doc':
      return <DocVisual v={v} />
    case 'chart':
      return <ChartVisual v={v} />
    case 'scan':
      return <ScanVisual v={v} />
    case 'compare':
      return <CompareVisual v={v} />
    case 'clock':
      return <ClockVisual v={v} />
    case 'form':
      return <FormVisual v={v} />
  }
}

/**
 * The micro-visual panel on every feature card (module-features-plan.md §4.4):
 * fixed 112px height, accent tint, decorative to screen readers because the
 * card's title and line carry the meaning. Server-rendered, CSS-only motion.
 */
export function MicroVisual({ visual, className }: { visual: Visual; className?: string }) {
  return (
    <div aria-hidden className={cn('h-28 select-none overflow-hidden rounded-lg border bg-accent/40 p-3', className)}>
      <Inner v={visual} />
    </div>
  )
}
