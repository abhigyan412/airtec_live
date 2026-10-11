'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MODULES, modulesByGroup } from '@/content/modules'
import { ROLES, submitLead, trialSchema, type TrialInput } from '@/lib/lead-schema'
import { cn } from '@/lib/utils'
import { Field, Honeypot, SendError, Sent, type Status } from './lead-form-parts'

/**
 * Free-trial request: step 1 picks exactly one module (radio cards), step 2 is
 * a short contact form. Module pages link here with ?module=<slug>.
 */
export function TrialForm() {
  const params = useSearchParams()
  const preselected = params.get('module')
  const valid = (slug: string | null) => !!slug && MODULES.some((m) => m.slug === slug)
  const [status, setStatus] = useState<Status>('idle')
  const [sentModule, setSentModule] = useState<string>()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TrialInput>({
    resolver: zodResolver(trialSchema),
    defaultValues: { trial_module: valid(preselected) ? preselected! : '', phone: '+91 ', rendered_at: Date.now() },
  })

  useEffect(() => {
    if (valid(preselected)) setValue('trial_module', preselected!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselected, setValue])

  const picked = watch('trial_module')
  const pickedModule = MODULES.find((m) => m.slug === picked)

  const onSubmit = async (data: TrialInput) => {
    try {
      await submitLead('trial', { ...data, modules: [data.trial_module] })
      setSentModule(MODULES.find((m) => m.slug === data.trial_module)?.name)
      setStatus('sent')
    } catch (e) {
      setStatus((e as Error).message === 'rate_limited' ? 'rate_limited' : 'error')
    }
  }

  if (status === 'sent') {
    return (
      <Sent>
        We’ll call you within one working day to set up your free trial{sentModule ? ` of ${sentModule}` : ''}.
      </Sent>
    )
  }

  const aria = (name: keyof TrialInput) =>
    errors[name] ? { 'aria-invalid': true as const, 'aria-describedby': `${name}-error` } : {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-10">
      <Honeypot register={register as never} />

      {/* Step 1: pick one module */}
      <fieldset aria-describedby={errors.trial_module ? 'trial_module-error' : undefined}>
        <legend className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
          Pick your module
        </legend>
        <div className="mt-5 space-y-6">
          {modulesByGroup().map(({ group, modules }) => (
            <div key={group}>
              <p className="eyebrow mb-2">{group}</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((m) => {
                  const on = picked === m.slug
                  return (
                    <label
                      key={m.slug}
                      className={cn(
                        'relative flex cursor-pointer items-start gap-3 rounded-xl border bg-card p-3.5 transition-[border-color,background-color] [transition-duration:var(--duration-fast)] ease-out hover:border-primary/40 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring',
                        on && 'border-primary bg-sidebar-accent ring-1 ring-primary',
                      )}
                    >
                      <input type="radio" value={m.slug} className="sr-only" {...register('trial_module')} />
                      <span
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                          on ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary',
                        )}
                      >
                        <m.icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={cn('block text-sm font-semibold', on && 'text-sidebar-accent-foreground')}>{m.name}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{m.short}</span>
                      </span>
                      {on && <Check className="absolute right-3 top-3 h-4 w-4 text-primary" strokeWidth={3} aria-hidden />}
                    </label>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        {errors.trial_module && (
          <p id="trial_module-error" className="mt-3 text-sm text-destructive">
            {errors.trial_module.message}
          </p>
        )}
      </fieldset>

      {/* Step 2: about your school */}
      <fieldset>
        <legend className="flex items-center gap-2 text-lg font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">2</span>
          Tell us about your school
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
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
          <Field id="school_name" label="School name" required error={errors.school_name?.message}>
            <Input id="school_name" autoComplete="organization" className="h-10" {...register('school_name')} {...aria('school_name')} />
          </Field>
          <Field id="city" label="City" required error={errors.city?.message}>
            <Input id="city" autoComplete="address-level2" className="h-10" {...register('city')} {...aria('city')} />
          </Field>
          <Field id="phone" label="Mobile" required error={errors.phone?.message}>
            <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" className="h-10 font-mono" {...register('phone')} {...aria('phone')} />
          </Field>
          <Field id="email" label="Email" error={errors.email?.message}>
            <Input id="email" type="email" autoComplete="email" className="h-10" {...register('email')} {...aria('email')} />
          </Field>
        </div>
      </fieldset>

      <div className="space-y-5">
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

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" disabled={isSubmitting} className="shadow-glow-indigo">
            {isSubmitting ? <Loader2 className="animate-spin" aria-hidden /> : null}
            {pickedModule ? `Start my free ${pickedModule.name} trial` : 'Start my free trial'}
          </Button>
          <p className="text-sm text-muted-foreground">No payment details needed.</p>
        </div>
      </div>
    </form>
  )
}
