import Link from 'next/link';

import { cn } from '@/lib/cn';
import { byHref, type PageInfo } from '@/lib/pages';
import { absoluteUrl } from '@/lib/site';

/** Breadcrumb trail derived from the page registry, plus BreadcrumbList JSON-LD. */
export function Breadcrumbs({ href, className }: { href: string; className?: string }) {
  const chain: PageInfo[] = [];
  for (let cur: PageInfo | undefined = byHref[href]; cur; cur = cur.parent ? byHref[cur.parent] : undefined) {
    chain.unshift(cur);
  }
  const trail = [{ href: '/', label: 'FNDRS' }, ...chain.map((p) => ({ href: p.href, label: p.label }))];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.label, item: absoluteUrl(t.href) })),
  };

  return (
    <nav aria-label="Breadcrumb" className={cn('label-mono text-faint', className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((t, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={t.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-muted">
                  {t.label}
                </span>
              ) : (
                <>
                  <Link href={t.href} className="transition-colors hover:text-ivory">
                    {t.label}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
