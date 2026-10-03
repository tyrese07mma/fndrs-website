import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/cn';
import { pages, type PageKey } from '@/lib/pages';
import { Container } from '@/components/ui/primitives';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * "Keep exploring" — the internal links at the end of every page so a
 * visitor always has a relevant next page. A ruled row, not a card grid.
 */
export function ProductNavigation({
  items,
  title = 'Keep exploring',
  notes,
}: {
  items: PageKey[];
  title?: string;
  /** Optional per-page context, replaces the generic blurb. */
  notes?: Partial<Record<PageKey, string>>;
}) {
  return (
    <section aria-label={title} className="border-t hairline bg-ink-950 py-14 sm:py-16">
      <Container wide>
        <h2 className="label-mono text-subtle">{title}</h2>
        <RevealGroup as="ul" className={cn('mt-6 grid border-t hairline sm:grid-cols-2', items.length >= 4 && 'xl:grid-cols-4')}>
          {items.map((key) => {
            const p = pages[key];
            return (
              <RevealItem
                as="li"
                key={key}
                className="border-b hairline sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 xl:border-r xl:px-6 xl:first:pl-0 xl:last:border-r-0 xl:last:pr-0"
              >
                <Link href={p.href} className="group flex h-full flex-col gap-2 py-6 xl:py-7">
                  <span className="flex items-center justify-between gap-4">
                    <span className="text-[1.125rem] font-semibold tracking-[-0.02em] text-ivory">{p.label}</span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 text-faint transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-400"
                    />
                  </span>
                  <span className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-subtle transition-colors group-hover:text-muted">{notes?.[key] ?? p.blurb}</span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
