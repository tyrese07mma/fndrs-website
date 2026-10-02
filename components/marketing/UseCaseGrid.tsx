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

/** Use cases for audience pages. Cards link deeper where a product page exists. */
export function UseCaseGrid({ items, tone = 'dark', columns = 3 }: { items: UseCase[]; tone?: Tone; columns?: 2 | 3 }) {
  const light = tone === 'light';
  return (
    <RevealGroup as="ul" className={cn('grid gap-3 sm:grid-cols-2', columns === 3 && 'lg:grid-cols-3')}>
      {items.map((u) => {
        const Icon = u.icon;
        const inner = (
          <>
            <span
              className={cn(
                'inline-flex size-11 items-center justify-center rounded-[14px]',
                light ? 'bg-paper-200 text-ink' : 'bg-ink-700/80 text-ivory',
              )}
            >
              <Icon className="size-5" strokeWidth={1.75} aria-hidden />
            </span>
            <h3 className="mt-8 text-[1.25rem] font-semibold tracking-[-0.02em]">{u.title}</h3>
            <p className={cn('mt-2.5 text-[0.9375rem] leading-relaxed', light ? 'text-ink-muted' : 'text-muted')}>{u.text}</p>
            {u.href && (
              <span className={cn('mt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold', light ? 'text-ink' : 'text-ivory')}>
                {u.linkLabel ?? 'Learn more'}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            )}
          </>
        );
        const cls = cn(
          'group flex h-full flex-col rounded-[24px] border p-7 transition-colors duration-300',
          light ? 'border-ink/10 bg-paper-50 hover:border-ink/20' : 'hairline bg-ink-900 hover:border-white/15 hover:bg-ink-850',
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
