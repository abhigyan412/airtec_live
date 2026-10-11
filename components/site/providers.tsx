'use client'
import { ThemeProvider } from 'next-themes'
import { RevealObserver } from './reveal'

// Theme only: no React Query, no auth, no service worker. A visitor to a sales
// page downloads none of the staff app's logged-in plumbing (plan §2).
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <RevealObserver />
      {children}
    </ThemeProvider>
  )
}
