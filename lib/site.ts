/**
 * Site-wide configuration. Every real-world fact about FNDRS (operator,
 * address, email, socials, providers) lives here so it is edited once.
 * Empty values are left out of the public pages, never invented.
 */

/** Used only until a custom domain is configured via NEXT_PUBLIC_SITE_URL. */
const FALLBACK_SITE_URL = 'https://fndrs-society-website.vercel.app';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : FALLBACK_SITE_URL)
).replace(/\/$/, '');

export const site = {
  name: 'FNDRS Society',
  shortName: 'FNDRS',
  url: SITE_URL,
  description:
    'FNDRS Society connects founders, builders, mentors and investors around what they are building, what they can do and who they are looking for.',
  /** Public contact address. Leave empty until a real inbox exists. */
  contactEmail: '',
  /** Only real profiles. Empty entries are not rendered. */
  socials: {
    instagram: 'https://www.instagram.com/fndrs.society/',
    linkedin: '',
  },
  /** Design & development credit (shown in the footer and on /about). Not the operator. */
  credit: {
    name: 'JAYRECO Studio',
    url: 'https://www.jayreco.de',
  },
  /** Operator details for /imprint and /privacy. */
  legal: {
    name: 'Tyrese Jaden Cole',
    street: 'Darmstraße 35',
    postalCode: '64287',
    city: 'Darmstadt',
    country: 'Germany',
    email: '',
    phone: '',
    /** Only for a registered company (e.g. "Amtsgericht Darmstadt, HRB 12345"). */
    register: '',
    /** Only if one has been issued. */
    vatId: '',
    /** Person responsible for editorial content (§ 18 Abs. 2 MStV). */
    responsibleForContent: 'Tyrese Jaden Cole',
  },
  /** Service providers named in the privacy policy. */
  providers: {
    hosting: 'Vercel Inc., USA',
    /** Service that receives form submissions (e.g. "Supabase", "Make.com"). Empty = not named. */
    forms: '',
  },
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}

export const socialLinks = (
  [
    { label: 'Instagram', href: site.socials.instagram },
    { label: 'LinkedIn', href: site.socials.linkedin },
  ] as const
).filter((s) => s.href);
