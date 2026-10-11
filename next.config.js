/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Same contract as the staff app and portal: the browser only talks to this
  // origin, and /api/* is proxied to the backend over the internal network.
  // The only endpoint the site uses is POST /api/public/leads (plan §9).
  async rewrites() {
    const backend = process.env.BACKEND_URL ?? 'http://localhost:4000'
    return [{ source: '/api/:path*', destination: `${backend}/api/:path*` }]
  },
}

module.exports = nextConfig
