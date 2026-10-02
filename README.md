# FNDRS Society — Website

Multi-page marketing site for the FNDRS app. Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/                     one folder per route (/, /product, /smart-match, … /imprint)
  api/forms/route.ts     Early Access + contact submissions
  template.tsx           page transition
components/
  layout/                Navbar (dropdowns), MobileNavigation, Footer, Wordmark
  marketing/             PageHero, Section, FeatureSection, EditorialSection, CTASection,
                         AudienceCards, AudiencePage, ProductNavigation, Breadcrumbs, FAQ,
                         StepList, ProductLoop, UseCaseGrid, EarlyAccessForm, ContactForm, LegalPage
  product/               ProductScreenshot, ScreenStack, MatchFlow, Schematics
  ui/                    Button, primitives (Eyebrow, Chip, StatusBadge…), Reveal
lib/
  pages.ts               route registry → nav, footer, breadcrumbs, related links, sitemap, <title>
  screens.ts             registry of the original app screenshots
  site.ts                company facts: legal details, email, socials (fill before launch)
scripts/prepare-assets.mjs   crops the original screenshots + builds logo/OG/favicons
```

## Before going live

1. **`lib/site.ts`** — fill `legal` (imprint), `contactEmail`, `socials`. Empty fields are shown as highlighted placeholders on `/imprint` and `/privacy`, or as "soon" in the footer.
2. **`.env`** — set `NEXT_PUBLIC_SITE_URL` (canonical URLs, sitemap, OpenGraph) and `FORMS_WEBHOOK_URL` (where form submissions are POSTed as JSON). Without a webhook, forms log to the console in dev and return an error in production, so nothing is silently lost.
3. **`/privacy`** — the policy is a draft that describes how this site is built. Have it reviewed.

## Screenshots

All app imagery is the original screenshots, only cropped (status bar) and re-encoded. To add or replace screens:

```bash
node scripts/prepare-assets.mjs <folder-with-originals>
```

then register the new file in `lib/screens.ts`. Pages without a matching capture (profile, feed, startup page, Copilot chat) use schematic illustrations from `components/product/Schematics.tsx`, captioned as illustrations — swap them for real screens when available.

## Content rules

- No invented numbers, logos, testimonials or prices.
- Anything not shipped is labelled with `StatusBadge` (`dev` = in development, `soon` = coming to FNDRS).
- Feature claims match the app (`_native_app_v2`): fit scoring rules, 25 free swipes/day, post types, profile fields, XP.
