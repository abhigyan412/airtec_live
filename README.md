# AIRTEC marketing site

The public marketing site for AIRTEC. Planning docs (`plan.md`, `module-features-plan.md`) are internal and not in this repo; section references like “plan §9” point to them. It is a Next.js 14 app with static pages, and it uses the staff app's visual language.

```bash
npm install
npm run dev      # http://localhost:3002
npm run build && npm start
```

## Where things live

| Path | What |
|---|---|
| `content/modules.ts` | The 12 modules: headline, outcome chips, hero standout, 2 spotlights, grouped one-line features each with its micro-visual data, detail list (module-features-plan §5–6). Feeds the grid, mega-menu, module pages and form chips. `next build` fails if a line is over 90 characters or contains a semicolon, a feature has no visual, a visual has more than 3 items, or a group has more than 6 features. |
| `components/site/module-features.tsx` | The module page sections: bento hero, spotlight rows, feature cards (swipe rows on phones), group labels, detail list, CTA strip |
| `components/visuals/` | The 14 micro-visual types, one file each, and `<MicroVisual>`. CSS-only motion, replayed on hover, final state under reduced motion. Preview every one at `/dev/visuals` (not indexed). |
| `content/site.ts` | Home, FAQ, "a day at school", role tabs, `/why-airtec` and the comparison table (plan §5, §7) |
| `components/ui/` | Primitives copied from `frontend/components/ui` @ `d66bccd4` |
| `components/mockups/` | Hero mock-ups (one file each) and `spotlights/` (24 spotlight mock-ups, one file each) |
| `app/globals.css`, `tailwind.config.js` | Copied verbatim from the staff app. Marketing additions are at the bottom of `globals.css`. |
| `lib/lead-schema.ts` | Zod schema for `POST /api/public/leads`. The backend can import it. |

## Environment variables

See [.env.example](.env.example). On Vercel, set them under Project → Settings → Environment Variables (Production), then redeploy.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://airtec.live`, used for the sitemap, robots and share previews |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | Where leads are written (the public anon key) |
| `LEADS_INSERT_SECRET` | Add-only secret; must match `marketing_lead_settings.insert_secret` in the database |
| `LEADS_WEBHOOK_URL` | Optional Discord / Slack / Google Chat webhook pinged per lead |

## Lead capture

`POST /api/public/leads` ([app/api/public/leads/route.ts](app/api/public/leads/route.ts), logic in [lib/leads-server.ts](lib/leads-server.ts)) handles the demo form, the home-page short form and free-trial requests. It validates, drops spam (filled honeypot or a submit under 3s) with a decoy 201, writes the lead to Supabase `marketing_leads`, then pings the webhook.

It writes with the anon key plus `LEADS_INSERT_SECRET`. A database policy (airtec repo, `supabase/migrations/20261011010000_marketing_leads_site_insert.sql`) only lets the anon key insert with that secret, and never read, so the service-role key never leaves the backend. There is no rate limit on Vercel beyond the spam checks; add a Vercel Firewall rate-limit rule on `/api/public/leads` if spam appears.

## Not done yet

- **Screenshots (plan §12):** visuals are live mock-ups. Real screenshots from the seeded school still need capturing.
- **Placeholders:**
  - the contact email (`lib/utils.ts`)
  - the pricing plan shapes (Q1)
  - the About copy
  - the privacy and terms pages, which are marked **draft**. Do not launch the form before these are reviewed (Q5).
- **Gated (plan §8):** the Policy Assistant feature card is in `content/modules.ts` with `gated: true`; delete that flag once `policyCopilot.ts` lands on `main`. Testimonials are left out until there is a consenting quote.
- **Deploy:** add the `site` service to `docker-compose.yml` in the main repo (plan §13). The `Dockerfile` is ready.
