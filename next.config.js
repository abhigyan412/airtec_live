/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // No /api proxy: the site handles its only endpoint, POST /api/public/leads,
  // itself (app/api/public/leads/route.ts), because on Vercel it can't reach
  // the private AIRTEC backend.
}

module.exports = nextConfig
