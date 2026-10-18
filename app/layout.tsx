import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/site/providers'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { TrialBar } from '@/components/site/trial'
import { SITE_URL } from '@/lib/utils'
import './globals.css'

// Fonts loaded exactly as frontend/app/layout.tsx does (plan §3.2).
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'AIRTEC · School ERP built for Indian schools', template: '%s · AIRTEC' },
  description:
    'Most school ERPs keep records. AIRTEC does the daily work: substitutes arranged and fee reminders sent before the first bell, across admissions, fees, timetable, exams, library, transport, HR and apps for staff and parents.',
  applicationName: 'AIRTEC',
  openGraph: { type: 'website', siteName: 'AIRTEC', locale: 'en_IN' },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

// theme-color matches the staff app (plan §3.1).
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)', color: '#030711' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col overflow-x-clip">
            <TrialBar />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
