import type { MetadataRoute } from 'next';

import { pages } from '@/lib/pages';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map((p) => ({
    url: absoluteUrl(p.href),
    changeFrequency: 'monthly',
    priority: p.href === '/' ? 1 : p.href === '/privacy' || p.href === '/imprint' ? 0.2 : 0.7,
  }));
}
