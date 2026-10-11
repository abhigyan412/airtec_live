# ── AIRTEC marketing site (Next.js 14, standalone output) ────────────
# Copied from frontend-portal/Dockerfile (plan §13). Differences: port 3002,
# health check on "/", and the site's own URL build args.
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# The /api rewrite target is baked at build time too (Next evaluates
# rewrites() during `next build`), so BACKEND_URL is a build arg. It
# points at the internal backend service on the Docker network.
ARG BACKEND_URL=http://backend:4000
ENV BACKEND_URL=$BACKEND_URL
# NEXT_PUBLIC_* are inlined at build time: the "Log in" menu targets and the
# canonical URL used for metadata, sitemap and robots.
ARG NEXT_PUBLIC_SITE_URL=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_STAFF_APP_URL=
ENV NEXT_PUBLIC_STAFF_APP_URL=$NEXT_PUBLIC_STAFF_APP_URL
ARG NEXT_PUBLIC_PORTAL_URL=
ENV NEXT_PUBLIC_PORTAL_URL=$NEXT_PUBLIC_PORTAL_URL
ENV NEXT_TELEMETRY_DISABLED=1
# `public/` may not exist in this repo; ensure it does so the COPY below never fails.
RUN mkdir -p public && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
# Next server-renders on first load even for 'use client' components, so
# any Date() read before hydration hits the container's clock — UTC by
# default, not IST.
RUN apk add --no-cache tzdata
ENV TZ=Asia/Kolkata
RUN apk add --no-cache wget && addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3002
# "/" is the static home page and returns 200.
HEALTHCHECK --interval=30s --timeout=5s --start-period=25s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT}/ || exit 1
CMD ["node", "server.js"]
