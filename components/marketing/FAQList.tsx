'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useId, useState } from 'react';

import { cn } from '@/lib/cn';
import type { FAQItem } from './FAQ';
import type { Tone } from './Section';

export function FAQList({ items, tone = 'dark' }: { items: FAQItem[]; tone?: Tone }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const light = tone === 'light';

  return (
    <ul className={cn('border-t', light ? 'border-ink/10' : 'hairline')}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-${i}`;
        return (
          <li key={item.q} className={cn('border-b', light ? 'border-ink/10' : 'hairline')}>
            <h3>
              <button
                type="button"
                id={`${panelId}-q`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left text-[1.0625rem] font-semibold tracking-[-0.015em] sm:text-[1.125rem]"
              >
                {item.q}
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 inline-flex size-7 shrink-0 items-center justify-center transition-transform duration-300',
                    light ? 'text-ink-muted' : 'text-subtle',
                    isOpen && 'rotate-45',
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={`${panelId}-q`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn('max-w-2xl pb-7 pr-10 text-[0.9875rem] leading-relaxed', light ? 'text-ink-muted' : 'text-muted')}>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
