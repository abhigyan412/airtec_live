import type { MetadataRoute } from 'next'
import { MODULES } from '@/content/modules'
import { SITE_URL } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/modules', '/why-airtec', '/platform', '/security', '/pricing', '/free-trial', '/contact', '/about', '/privacy', '/terms']
  return [
    ...pages.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.8 })),
    ...MODULES.map((m) => ({ url: `${SITE_URL}/modules/${m.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
