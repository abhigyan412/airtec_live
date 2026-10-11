'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MODULES } from '@/content/modules'
import {
  BOARDS,
  ROLES,
  STRENGTHS,
  leadSchema,
  submitLead,
  type LeadInput,
} from '@/lib/lead-schema'
import { cn } from '@/lib/utils'
import { Field, Honeypot, SendError, Sent, type Status } from './lead-form-parts'

/* ── Full form: /contact ─────────────────────────────────────────────── */

export function LeadForm() {
  const params = useSearchParams()
  const preselected = params.get('module')
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      modules: preselected && MODULES.some((m) => m.slug === preselected) ? [preselected] : [],
      phone: '+91 ',
      rendered_at: Date.now(),
    },
  })

  // Module pages link here with ?module=<slug>; honour it on client navigation too.
  useEffect(() => {
    if (preselected && MODULES.some((m) => m.slug === preselected)) setValue('modules', [preselected])
  }, [preselected, setValue])

  const onSubmit = async (data: LeadInput) => {
    try {
      await submitLead('full', data)
      setStatus('sent')
    } catch (e) {
      setStatus((e as Error).message === 'rate_limited' ? 'rate_limited' : 'error')
    }
  }

  if (status === 'sent') return <Sent />

  const aria = (name: keyof LeadInput) =>
    errors[name] ? { 'aria-invalid': true as const, 'aria-describedby': `${name}-error` } : {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      <Honeypot register={register as never} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required error={errors.name?.message}>
          <Input id="name" autoComplete="name" className="h-10" {...register('name')} {...aria('name')} />
        </Field>
        <Field id="role" label="Your role" required error={errors.role?.message}>
          <Controller
            control={control}
            name="role"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="role" className="h-10" {...aria('role')}>
                  <SelectValue placeholder="Choose…" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field id="school_name" label="School name" required error={errors.school_name?.message} className="sm:col-span-2">
          <Input id="school_name" autoComplete="organization" className="h-10" {...register('school_name')} {...aria('school_name')} />
        </Field>
        <Field id="city" label="City" required error={errors.city?.message}>
          <Input id="city" autoComplete="address-level2" className="h-10" {...register('city')} {...aria('city')} />
        </Field>
        <Field id="state" label="State" error={errors.state?.message}>
          <Input id="state" autoComplete="address-level1" className="h-10" {...register('state')} />
        </Field>
        <Field id="phone" label="Mobile" required error={errors.phone?.message}>
          <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" className="h-10 font-mono" {...register('phone')} {...aria('phone')} />
        </Field>
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" className="h-10" {...register('email')} {...aria('email')} />
        </Field>
        <Field id="student_strength" label="Student strength">
          <Controller
            control={control}
            name="student_strength"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="student_strength" className="h-10">
                  <SelectValue placeholder="Choose…" />
                </SelectTrigger>
                <SelectContent>
                  {STRENGTHS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s} students
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
        <Field id="board" label="Board">
          <Controller
            control={control}
            name="board"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="board" className="h-10">
                  <SelectValue placeholder="Choose…" />
                </SelectTrigger>
                <SelectContent>
                  {BOARDS.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <fieldset>
        <legend className="text-sm font-medium leading-none">
          Modules you’re interested in <span className="font-normal text-muted-foreground">(optional)</span>
        </legend>
        <Controller
          control={control}
          name="modules"
          render={({ field }) => {
            const value = field.value ?? []
            return (
              <div className="mt-2.5 flex flex-wrap gap-2">
                {MODULES.map((m) => {
                  const on = value.includes(m.slug)
                  return (
                    <button
                      key={m.slug}
                      type="button"
                      aria-pressed={on}
                      onClick={() => field.onChange(on ? value.filter((v) => v !== m.slug) : [...value, m.slug])}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-[background-color,color,border-color,transform] [transition-duration:var(--duration-press)] ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:active:scale-100',
                        on ? 'border-primary bg-primary/10 text-primary' : 'border-input bg-background text-foreground hover:bg-accent',
                      )}
                    >
                      <m.icon className="h-3.5 w-3.5" aria-hidden />
                      {m.name}
                    </button>
                  )
                })}
              </div>
            )
          }}
        />
      </fieldset>

      <Field id="message" label="Your question" error={errors.message?.message}>
        <Textarea id="message" rows={4} maxLength={2000} placeholder="What would you like to know, or see in the demo?" {...register('message')} />
      </Field>

      <div>
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-2.5 text-sm">
              <span className="mt-0.5">
                <Checkbox
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked ? true : undefined)}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? 'consent-error' : undefined}
                />
              </span>
              <span>
                We may contact you about AIRTEC. See our{' '}
                <Link href="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
                  privacy policy
                </Link>
                .<span className="text-destructive"> *</span>
              </span>
            </label>
          )}
        />
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 text-xs text-destructive">
            {errors.consent.message}
          </p>
        )}
      </div>

      <SendError status={status} />

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full shadow-glow-indigo sm:w-auto">
        {isSubmitting ? <Loader2 className="animate-spin" aria-hidden /> : null}
        Book a demo
      </Button>
    </form>
  )
}
