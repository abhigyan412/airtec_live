'use client'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import { CONTACT_EMAIL, cn } from '@/lib/utils'

// Pieces shared by the full and short lead forms. Kept apart from both so the
// short form on the home page doesn't pull in the full form's Radix Select.

export type Status = 'idle' | 'sent' | 'error' | 'rate_limited'

export function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id}>
        {label}
        {required ? <span className="text-destructive"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

/** Visually hidden field that only bots fill (plan §9.2). */
export function Honeypot({ register }: { register: ReturnType<typeof useForm>['register'] }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </label>
    </div>
  )
}

export function Sent({ compact, children }: { compact?: boolean; children?: React.ReactNode }) {
  return (
    <Alert variant="success" title="Thanks, we’ve got it." className={compact ? undefined : 'p-5'}>
      {children ?? 'We’ll call you within one working day to set up a demo.'}
    </Alert>
  )
}

export function SendError({ status }: { status: Status }) {
  if (status !== 'error' && status !== 'rate_limited') return null
  return (
    <Alert variant="destructive" title="That didn’t go through.">
      {status === 'rate_limited' ? 'Too many attempts from this connection. Please wait a few minutes and try again, or ' : 'Please try again in a moment, or '}
      email us at{' '}
      <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium underline underline-offset-4">
        {CONTACT_EMAIL}
      </a>
      .
    </Alert>
  )
}

