import type { Metadata } from 'next';

import { pages, type PageKey } from './pages';
import { site } from './site';

/** Default share image, generated from the original wordmark (scripts/prepare-assets.mjs). */
export const OG_IMAGE = { url: '/og.png', width: 1200, height: 630, alt: 'FNDRS Society' };

/** Per-page metadata built from the page registry: title, description, canonical, OpenGraph. */
export function pageMetadata(key: PageKey, overrides: Metadata = {}): Metadata {
  const page = pages[key];
  const title = key === 'home' ? { absolute: page.title } : page.title;
  const ogTitle = key === 'home' ? page.title : `${page.title} · ${site.name}`;

  return {
    title,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: {
      type: 'website',
      siteName: site.name,
      url: page.href,
      title: ogTitle,
      description: page.description,
      locale: 'en_US',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: page.description,
      images: [OG_IMAGE.url],
    },
    ...overrides,
  };
}
