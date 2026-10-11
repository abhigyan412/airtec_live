import { z } from 'zod'

// Shape of POST /api/public/leads (plan §9). Written so the backend route can
// import the same schema; the server re-validates and is the authority.

export const ROLES = ['Owner/Trustee', 'Principal', 'Administrator', 'Accountant', 'Teacher', 'Other'] as const
export const STRENGTHS = ['<300', '300–800', '800–1500', '1500+'] as const
export const BOARDS = ['CBSE', 'ICSE', 'State', 'IB/Cambridge', 'Other'] as const

/** Indian mobile: optional +91 / 0 prefix, then 10 digits starting 6–9. */
const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/

const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ''))
  .refine((v) => INDIAN_MOBILE.test(v), 'Enter a 10-digit Indian mobile number')

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined))

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name').max(120),
  role: z.enum(ROLES, { errorMap: () => ({ message: 'Choose your role' }) }),
  school_name: z.string().trim().min(2, 'Enter your school’s name').max(200),
  city: z.string().trim().min(2, 'Enter your city').max(120),
  state: optionalText(120),
  phone,
  email: z
    .string()
    .trim()
    .max(200)
    .optional()
    .refine((v) => !v || z.string().email().safeParse(v).success, 'Enter a valid email or leave it blank'),
  student_strength: z.enum(STRENGTHS).optional(),
  board: z.enum(BOARDS).optional(),
  modules: z.array(z.string()).max(20).default([]),
  message: optionalText(2000),
  consent: z.literal(true, { errorMap: () => ({ message: 'Please agree so we can contact you' }) }),
  // Spam guards (plan §9.2): a hidden field humans never fill, and the time the
  // form was rendered so the server can reject sub-3-second submissions.
  website: z.string().max(0).optional(),
  rendered_at: z.number(),
})

export type LeadInput = z.input<typeof leadSchema>

/** The short inline form on the home page CTA band (name, school, phone). */
export const shortLeadSchema = leadSchema.pick({
  name: true,
  school_name: true,
  phone: true,
  consent: true,
  website: true,
  rendered_at: true,
})

/**
 * Free-trial request from /free-trial: the school picks exactly one module to
 * try free for a short period. `trial_module` is a module slug from
 * content/modules.ts.
 */
export const trialSchema = leadSchema
  .pick({
    name: true,
    role: true,
    school_name: true,
    city: true,
    phone: true,
    email: true,
    consent: true,
    website: true,
    rendered_at: true,
  })
  .extend({
    trial_module: z.string({ required_error: 'Pick the module you want to try' }).min(1, 'Pick the module you want to try'),
  })

export type TrialInput = z.input<typeof trialSchema>

/**
 * What the endpoint accepts: `form` tells the server which shape it got. A
 * short lead has no role or city, so the backend stores those columns as null
 * for `form: 'short'` and the sales call fills them in. A trial lead stores
 * `trial_module` (store it in `modules` as a one-item array plus a trial flag).
 */
export const leadRequestSchema = z.discriminatedUnion('form', [
  leadSchema.extend({ form: z.literal('full') }),
  shortLeadSchema.extend({ form: z.literal('short') }),
  trialSchema.extend({ form: z.literal('trial') }),
])

export type ShortLeadInput = z.input<typeof shortLeadSchema>

/** Fields the page adds at submit time: where the form was and any UTM tags. */
export function submissionContext() {
  const params = new URLSearchParams(window.location.search)
  const utm: Record<string, string> = {}
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
    const v = params.get(key)
    if (v) utm[key] = v
  }
  return { source_path: window.location.pathname, utm: Object.keys(utm).length ? utm : undefined }
}

export async function submitLead(form: 'full' | 'short' | 'trial', body: Record<string, unknown>) {
  const res = await fetch('/api/public/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...body, form, ...submissionContext() }),
  })
  if (!res.ok) throw new Error(res.status === 429 ? 'rate_limited' : 'failed')
}
