import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// The subset of frontend/lib/utils.ts @ d66bccd4 the site needs.

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Whole-rupee Indian grouping, without the symbol: pair it with `.rupee`. */
export function formatAmount(n: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)
}

// The app's status pill: `bg-X/10 text-X`, used ~275 times there. Labels match
// what the app shows (plan §3.3).
export const STATUS_PILL = {
  success: 'bg-success/10 text-success ring-1 ring-inset ring-success/20',
  warning: 'bg-warning/10 text-warning ring-1 ring-inset ring-warning/20',
  destructive: 'bg-destructive/10 text-destructive ring-1 ring-inset ring-destructive/20',
  primary: 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20',
  muted: 'bg-muted text-muted-foreground ring-1 ring-inset ring-border',
} as const

export type PillTone = keyof typeof STATUS_PILL

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://airtec.in'
export const STAFF_APP_URL = process.env.NEXT_PUBLIC_STAFF_APP_URL || 'https://app.airtec.in'
export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://parents.airtec.in'
export const CONTACT_EMAIL = 'hello@airtec.in'
