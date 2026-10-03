import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import type { Tone } from './Section';

export interface UseCase {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  linkLabel?: string;
}

/**
 * Use cases as ruled columns — a fine line over each item instead of a box.
 * Items link deeper where a product page exists.
 */
export function UseCaseGrid({ items, tone = 'dark', columns = 3 }: { items: UseCase[]; tone?: Tone; columns?: 2 | 3 }) {
  const light = tone === 'light';
  return (
    <RevealGroup as="ul" className={cn('grid gap-x-10 gap-y-12 sm:grid-cols-2', columns === 3 && 'lg:grid-cols-3')}>
      {items.map((u) => {
        const Icon = u.icon;
        const inner = (
          <>
            <span className="flex items-center gap-3">
              <Icon className={cn('size-[18px] shrink-0', light ? 'text-gold-700' : 'text-gold-500')} strokeWidth={1.75} aria-hidden />
              <h3 className="text-[1.1875rem] font-semibold tracking-[-0.02em]">{u.title}</h3>
            </span>
            <p className={cn('mt-3 text-[0.9375rem] leading-relaxed', light ? 'text-ink-muted' : 'text-muted')}>{u.text}</p>
            {u.href && (
              <span className={cn('mt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold', light ? 'text-ink' : 'text-ivory')}>
                {u.linkLabel ?? 'Learn more'}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            )}
          </>
        );
        const cls = cn(
          'group flex h-full flex-col border-t pt-6 transition-colors duration-300',
          light ? 'border-ink/15 hover:border-ink/40' : 'hairline-strong hover:border-white/40',
        );
        return (
          <RevealItem as="li" key={u.title}>
            {u.href ? (
              <Link href={u.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
