/**
 * Site-wide configuration. Everything that is a real-world fact about the
 * company (legal entity, email, socials) lives here so it is edited once.
 * Empty values are rendered as "coming soon" instead of being invented.
 */
export const site = {
  name: 'FNDRS Society',
  shortName: 'FNDRS',
  // Explicit URL wins; on Vercel fall back to the production domain it provides at build time.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  description:
    'FNDRS Society connects founders, builders, mentors and investors around what they are building, what they can do and who they are looking for.',
  contactEmail: '',
  socials: {
    instagram: '',
    linkedin: '',
  },
  /** Legal details for /imprint. Fill these in before going live. */
  legal: {
    company: '',
    representative: '',
    street: '',
    city: '',
    country: 'Germany',
    email: '',
    phone: '',
    register: '',
    vatId: '',
  },
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}
