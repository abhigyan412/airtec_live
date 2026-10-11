'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { shortLeadSchema, submitLead, type ShortLeadInput } from '@/lib/lead-schema'
import { cn } from '@/lib/utils'
import { Honeypot, SendError, Sent, type Status } from './lead-form-parts'

/* ── Short form: home CTA band ──────────────────────────────────────── */

export function ShortLeadForm() {
  const [status, setStatus] = useState<Status>('idle')
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShortLeadInput>({
    resolver: zodResolver(shortLeadSchema),
    defaultValues: { phone: '+91 ', rendered_at: Date.now() },
  })

  const onSubmit = async (data: ShortLeadInput) => {
    try {
      await submitLead('short', data)
      setStatus('sent')
    } catch (e) {
      setStatus((e as Error).message === 'rate_limited' ? 'rate_limited' : 'error')
    }
  }

  if (status === 'sent') return <Sent compact />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-3">
      <Honeypot register={register as never} />
      <div className="grid gap-3 sm:grid-cols-3">
        {(
          [
            { name: 'name', label: 'Your name', auto: 'name' },
            { name: 'school_name', label: 'School name', auto: 'organization' },
            { name: 'phone', label: 'Mobile', auto: 'tel' },
          ] as const
        ).map((f) => (
          <div key={f.name} className="space-y-1.5">
            <Label htmlFor={`short-${f.name}`} className="sr-only">
              {f.label}
            </Label>
            <Input
              id={`short-${f.name}`}
              placeholder={f.label}
              autoComplete={f.auto}
              type={f.name === 'phone' ? 'tel' : 'text'}
              className={cn('h-11 bg-card', f.name === 'phone' && 'font-mono')}
              aria-invalid={errors[f.name] ? true : undefined}
              aria-describedby={errors[f.name] ? `short-${f.name}-error` : undefined}
              {...register(f.name)}
            />
            {errors[f.name] && (
              <p id={`short-${f.name}-error`} className="text-xs text-destructive">
                {errors[f.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>
      <SendError status={status} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <label className="flex cursor-pointer items-start gap-2 text-xs text-muted-foreground">
                <span className="mt-px">
                  <Checkbox
                    checked={!!field.value}
                    onChange={(e) => field.onChange(e.target.checked ? true : undefined)}
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={errors.consent ? 'short-consent-error' : undefined}
                  />
                </span>
                <span>
                  We may contact you about AIRTEC.{' '}
                  <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                    Privacy
                  </Link>
                </span>
              </label>
            )}
          />
          {errors.consent && (
            <p id="short-consent-error" className="mt-1 text-xs text-destructive">
              {errors.consent.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link href="/contact" className="text-center text-sm font-medium text-primary underline-offset-4 hover:underline">
            Full form
          </Link>
          <Button type="submit" size="lg" disabled={isSubmitting} className="shadow-glow-indigo">
            {isSubmitting ? <Loader2 className="animate-spin" aria-hidden /> : null}
            Book a demo
            {!isSubmitting && <ArrowRight aria-hidden />}
          </Button>
        </div>
      </div>
    </form>
  )
}
