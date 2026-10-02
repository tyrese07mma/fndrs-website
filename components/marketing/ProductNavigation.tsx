import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/cn';
import { pages, type PageKey } from '@/lib/pages';
import { Container } from '@/components/ui/primitives';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * "Keep exploring" — the internal links at the end of every page so a
 * visitor always has a relevant next page.
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
    <section aria-label={title} className="border-t hairline bg-ink-950 py-20 sm:py-24">
      <Container wide>
        <div className="flex items-end justify-between gap-6">
          <h2 className="label-mono text-subtle">{title}</h2>
        </div>
        <RevealGroup
          as="ul"
          className={cn(
            'mt-8 grid gap-px overflow-hidden rounded-[26px] border hairline bg-white/[0.06]',
            items.length === 2 && 'sm:grid-cols-2',
            items.length === 3 && 'md:grid-cols-3',
            items.length >= 4 && 'sm:grid-cols-2 xl:grid-cols-4',
          )}
        >
          {items.map((key) => {
            const p = pages[key];
            const Icon = p.icon;
            return (
              <RevealItem as="li" key={key} className="bg-ink-950">
                <Link href={p.href} className="group flex h-full flex-col justify-between gap-12 p-7 transition-colors hover:bg-ink-900 sm:p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-[14px] bg-ink-800 text-ivory/90 transition-colors group-hover:text-gold-400">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span>
                    <span className="flex items-center justify-between gap-4">
                      <span className="text-[1.25rem] font-semibold tracking-[-0.02em] text-ivory">{p.label}</span>
                      <ArrowRight
                        aria-hidden
                        className="size-5 -translate-x-1 text-subtle opacity-0 transition-all duration-300 ease-out-expo group-hover:translate-x-0 group-hover:text-ivory group-hover:opacity-100"
                      />
                    </span>
                    <span className="mt-2 block text-[0.9375rem] leading-relaxed text-subtle">{notes?.[key] ?? p.blurb}</span>
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
