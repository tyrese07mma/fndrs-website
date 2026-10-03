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

1. **`lib/site.ts`**: operator details (imprint, privacy), contact email, social links, providers. Empty values are left out of the public pages, never shown as placeholders.
2. **Environment** (Vercel → Settings → Environment Variables, then redeploy):
   - `NEXT_PUBLIC_SITE_URL`: the custom domain once you have one. All canonicals, OpenGraph URLs, the sitemap and structured data are built from it.
   - Forms: `FORMS_WEBHOOK_URL` **or** `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (run `supabase/website_submissions.sql` first). Without one, the Early Access and contact forms show an "opening soon" state instead of a form.

## Screenshots

All app imagery is the original screenshots: cropped (status bar), with the floating dev-menu button painted out, and re-encoded. To add or replace screens:

```bash
node scripts/prepare-assets.mjs <folder-with-originals>
```

then register the new file in `lib/screens.ts`. Current captures are English (app 2.0.0). The dev button is found near the position listed in `DEV_BUTTON_AT` in the script, so add an entry there for each new screen.

Crops avoid showing account names. Where no capture exists yet (example posts, the structure of a startup page, the Copilot row), the site uses captioned illustrations from `components/product/Schematics.tsx` or quotes the in-app text — swap them for real screens when available.

## Content rules

- No invented numbers, logos, testimonials or prices.
- Anything not shipped is labelled with `StatusBadge` (`dev` = in development, `soon` = coming to FNDRS).
- Feature claims match the app (`_native_app_v2`): fit scoring rules, 25 free swipes/day, post types, profile fields, XP.

## Cookies & consent

The site sets **no cookies** and loads **nothing from third parties** (fonts and images are self-hosted). It still ships a consent manager, so services can be added safely later:

- `lib/consent.ts`: categories (Necessary, Analytics, Marketing, External media), the list of services per category, version and storage.
- `components/consent/`: banner, settings dialog, `<ConsentGate>` and the footer "Cookie settings" button.
- The only thing stored is the visitor's choice (`localStorage["fndrs-consent"]`). Optional categories are off by default and currently contain no services; the dialog says so.

**Adding a service that needs consent** (analytics, pixel, YouTube/Vimeo, external fonts or scripts):
1. add it to `CONSENT_SERVICES` in `lib/consent.ts`
2. load it only inside `<ConsentGate category="…">` so nothing runs before consent
3. bump `CONSENT_VERSION` so every visitor is asked again
4. describe it in `/privacy#cookies`
