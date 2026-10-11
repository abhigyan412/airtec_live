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

## Env (build-time)

`BACKEND_URL` (default `http://localhost:4000`), `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_STAFF_APP_URL`, `NEXT_PUBLIC_PORTAL_URL`.

## Not done yet

- **Lead capture (plan §9):** built in the `airtec` repo, not yet live.
  - `POST /api/public/leads` in `backend/src/modules/public/routes.ts`, with the logic and its tests in `backend/src/shared/utils/marketingLeads.ts`. It handles `form: 'full' | 'short' | 'trial'`, and a trial carries `trial_module`.
  - Leads are stored in the `marketing_leads` table (`supabase/migrations/20261011000000_marketing_leads.sql`). **Apply that migration** in the Supabase SQL editor before going live: until then every real submission returns 500.
  - Each lead is posted to `LEADS_WEBHOOK_URL` (a Slack, Google Chat or Discord incoming webhook) if it is set.
- **Screenshots (plan §12):** visuals are live mock-ups. Real screenshots from the seeded school still need capturing.
- **Placeholders:**
  - the contact email (`lib/utils.ts`)
  - the pricing plan shapes (Q1)
  - the About copy
  - the privacy and terms pages, which are marked **draft**. Do not launch the form before these are reviewed (Q5).
- **Gated (plan §8):** the Policy Assistant feature card is in `content/modules.ts` with `gated: true`; delete that flag once `policyCopilot.ts` lands on `main`. Testimonials are left out until there is a consenting quote.
- **Deploy:** add the `site` service to `docker-compose.yml` in the main repo (plan §13). The `Dockerfile` is ready.
