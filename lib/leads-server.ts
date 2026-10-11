import { z } from 'zod'
import { MODULES } from '@/content/modules'
import { BOARDS, ROLES, STRENGTHS } from '@/lib/lead-schema'

// Server side of lead capture (plan §9). The site runs on Vercel, which can't
// reach the private AIRTEC backend, so it writes to Supabase itself:
// - with the public anon key plus LEADS_INSERT_SECRET, which a database
//   policy requires for every insert (supabase migration
//   20261011010000_marketing_leads_site_insert.sql). The anon key alone can
//   neither add nor read leads, and the service-role key never leaves the
//   backend.
// - then a one-line ping to LEADS_WEBHOOK_URL (Discord, Slack or Google Chat).
// Same rules as the backend's shared/utils/marketingLeads.ts.

const MODULE_SLUGS = MODULES.map((m) => m.slug) as [string, ...string[]]

/** Indian mobile: optional +91 / 0 prefix, then 10 digits starting 6–9. */
const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/

/** Submissions faster than this after the form rendered are treated as bots. */
export const MIN_FILL_MS = 3000

const text = (max: number) => z.string().trim().min(1).max(max)
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined))

// Stored as +91XXXXXXXXXX whatever was typed, so the team can search and dial one format.
const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, ''))
  .refine((v) => INDIAN_MOBILE.test(v), 'Enter a 10-digit Indian mobile number')
  .transform((v) => `+91${v.slice(-10)}`)

const email = z
  .string()
  .trim()
  .max(200)
  .optional()
  .transform((v) => (v ? v : undefined))
  .refine((v) => !v || z.string().email().safeParse(v).success, 'Invalid email')

const moduleSlug = z.enum(MODULE_SLUGS)

const common = {
  name: text(120),
  school_name: text(200),
  phone,
  consent: z.literal(true),
  website: z.string().max(500).optional(), // honeypot
  rendered_at: z.number().int().positive(),
  source_path: z.string().max(200).optional(),
  utm: z.record(z.string().max(200)).optional(),
}

export const LeadRequestSchema = z.discriminatedUnion('form', [
  z.object({
    form: z.literal('full'),
    ...common,
    role: z.enum(ROLES),
    city: text(120),
    state: optionalText(120),
    email,
    student_strength: z.enum(STRENGTHS).optional(),
    board: z.enum(BOARDS).optional(),
    modules: z.array(moduleSlug).max(MODULE_SLUGS.length).default([]),
    message: optionalText(2000),
  }),
  z.object({ form: z.literal('short'), ...common }),
  z.object({
    form: z.literal('trial'),
    ...common,
    role: z.enum(ROLES),
    city: text(120),
    email,
    trial_module: moduleSlug,
  }),
])

export type LeadRequest = z.infer<typeof LeadRequestSchema>

export type LeadRow = {
  form: LeadRequest['form']
  name: string
  role: string | null
  school_name: string
  city: string | null
  state: string | null
  phone: string
  email: string | null
  student_strength: string | null
  board: string | null
  modules: string[]
  trial_module: string | null
  message: string | null
  source_path: string | null
  utm: Record<string, string> | null
  consent_at: string
}

export function isSpam(lead: LeadRequest, now: number): boolean {
  if (lead.website && lead.website.trim()) return true
  return now - lead.rendered_at < MIN_FILL_MS
}

export function toLeadRow(lead: LeadRequest, now: Date): LeadRow {
  const base: LeadRow = {
    form: lead.form,
    name: lead.name,
    school_name: lead.school_name,
    phone: lead.phone,
    source_path: lead.source_path || null,
    utm: lead.utm && Object.keys(lead.utm).length ? lead.utm : null,
    consent_at: now.toISOString(),
    role: null,
    city: null,
    state: null,
    email: null,
    student_strength: null,
    board: null,
    modules: [],
    trial_module: null,
    message: null,
  }
  switch (lead.form) {
    case 'full':
      return {
        ...base,
        role: lead.role,
        city: lead.city,
        state: lead.state ?? null,
        email: lead.email ?? null,
        student_strength: lead.student_strength ?? null,
        board: lead.board ?? null,
        modules: lead.modules,
        message: lead.message ?? null,
      }
    case 'trial':
      return { ...base, role: lead.role, city: lead.city, email: lead.email ?? null, modules: [lead.trial_module], trial_module: lead.trial_module }
    case 'short':
      return base
  }
}

export function leadMessage(row: LeadRow): string {
  const kind =
    row.form === 'trial' ? `New free-trial request (${row.trial_module})` : row.form === 'short' ? 'New demo request (short form)' : 'New demo request'
  const who = [row.name, row.role].filter(Boolean).join(', ')
  const where = [row.school_name, row.city, row.state].filter(Boolean).join(', ')
  const parts = [`${kind}: ${who} · ${where}`, `Phone ${row.phone}`]
  if (row.email) parts.push(row.email)
  if (row.form === 'full' && row.modules.length) parts.push(`Modules: ${row.modules.join(', ')}`)
  if (row.student_strength) parts.push(`Students ${row.student_strength}`)
  if (row.board) parts.push(row.board)
  if (row.message) parts.push(`“${row.message.length > 280 ? row.message.slice(0, 277) + '…' : row.message}”`)
  if (row.source_path) parts.push(`from ${row.source_path}`)
  return parts.join(' · ')
}

async function withTimeout(url: string, init: RequestInit, ms: number) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...init, signal: controller.signal, cache: 'no-store' })
  } finally {
    clearTimeout(timer)
  }
}

export class LeadConfigError extends Error {}
export class LeadInsertError extends Error {}

/** Adds the row through the Supabase REST API with the anon key and the add-only secret. */
export async function insertLead(row: LeadRow) {
  const url = process.env.SUPABASE_URL
  const anon = process.env.SUPABASE_ANON_KEY
  const secret = process.env.LEADS_INSERT_SECRET
  if (!url || !anon || !secret) throw new LeadConfigError('SUPABASE_URL, SUPABASE_ANON_KEY and LEADS_INSERT_SECRET must be set')
  const res = await withTimeout(
    `${url.replace(/\/$/, '')}/rest/v1/marketing_leads`,
    {
      method: 'POST',
      headers: {
        apikey: anon,
        Authorization: `Bearer ${anon}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
        'x-leads-secret': secret,
      },
      body: JSON.stringify(row),
    },
    8000,
  )
  if (!res.ok) throw new LeadInsertError(`Supabase insert failed: ${res.status} ${await res.text().catch(() => '')}`)
}

/**
 * Posts the lead to the team chat. `text` is read by Slack and Google Chat,
 * `content` by Discord. Never throws: a failed ping is logged and the lead
 * stays saved.
 */
export async function pingLeadWebhook(row: LeadRow): Promise<boolean> {
  const url = process.env.LEADS_WEBHOOK_URL
  if (!url) return false
  const message = leadMessage(row)
  try {
    const res = await withTimeout(
      url,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: message, content: message }) },
      5000,
    )
    if (!res.ok) console.error(`[leads] webhook responded ${res.status}; the lead is saved but the team was not pinged`)
    return res.ok
  } catch (err) {
    console.error('[leads] webhook failed; the lead is saved but the team was not pinged:', err)
    return false
  }
}
