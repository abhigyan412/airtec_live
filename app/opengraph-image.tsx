import { ImageResponse } from 'next/og'
import { POSITIONING } from '@/content/site'

export const alt = 'AIRTEC · School ERP built for Indian schools'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
// Edge runtime: the Node build of @vercel/og fails to prerender on Windows
// paths containing spaces, and edge renders on request anyway.
export const runtime = 'edge'

// Light-theme tokens as hex, since next/og can't read CSS variables.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(ellipse 80% 70% at 100% 0%, #eceafd 0%, #f9f8fe 70%)',
          color: '#17171c',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#7f78ee,#4f46e5)' }} />
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>AIRTEC</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1.08, maxWidth: 1000 }}>{POSITIONING.headlineLead}</div>
        <div style={{ fontSize: 28, color: '#4f46e5', fontWeight: 600 }}>Every rule configurable, instead of hardcoded.</div>
      </div>
    ),
    size,
  )
}
