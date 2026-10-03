import { absoluteUrl, site, socialLinks } from './site';

/**
 * Site-wide JSON-LD. Only facts we can stand behind: no ratings, reviews,
 * prices, employee counts or operating systems. The design/development studio
 * is credited on the page, not listed as owner or operator here.
 */
export function siteJsonLd() {
  const orgId = absoluteUrl('/#organization');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: site.name,
        url: absoluteUrl('/'),
        logo: absoluteUrl('/icon.png'),
        description: site.description,
        ...(socialLinks.length ? { sameAs: socialLinks.map((s) => s.href) } : {}),
      },
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        name: site.name,
        url: absoluteUrl('/'),
        inLanguage: 'en',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': absoluteUrl('/#app'),
        name: site.name,
        applicationCategory: 'SocialNetworkingApplication',
        description:
          'A mobile app in early beta that matches founders, builders, mentors and investors on complementary skills, stage, industry and what each side is looking for.',
        url: absoluteUrl('/product'),
        publisher: { '@id': orgId },
      },
    ],
  };
}
