import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { LeadConfigError, LeadRequestSchema, insertLead, isSpam, pingLeadWebhook, toLeadRow } from '@/lib/leads-server'

// POST /api/public/leads: demo requests, the home-page short form and
// free-trial requests (plan §9). Spam (filled honeypot, or submitted under 3s
// after the form rendered) gets the same 201 with nothing written, so a
// script has nothing to learn from. The response never echoes the data.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }

  let lead
  try {
    lead = LeadRequestSchema.parse(body)
  } catch (err) {
    const summary = err instanceof ZodError ? err.errors.map((e) => `${e.path.join('.') || 'body'}: ${e.message}`).join('; ') : 'Invalid request'
    return NextResponse.json({ success: false, error: summary }, { status: 400 })
  }

  const now = new Date()
  if (isSpam(lead, now.getTime())) return NextResponse.json({ ok: true }, { status: 201 })

  const row = toLeadRow(lead, now)
  try {
    await insertLead(row)
  } catch (err) {
    console.error(err instanceof LeadConfigError ? '[leads] not configured:' : '[leads] insert failed:', err)
    return NextResponse.json({ success: false, error: 'Could not submit, please try again.' }, { status: 500 })
  }

  // Awaited (with a 5s cap) rather than fire-and-forget: on serverless the
  // function can be frozen as soon as the response is sent.
  await pingLeadWebhook(row)
  return NextResponse.json({ ok: true }, { status: 201 })
}
