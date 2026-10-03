'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';
import { mainNav, pages } from '@/lib/pages';
import { ButtonLink } from '@/components/ui/Button';

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileNavigation({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const [expanded, setExpanded] = useState<string | null>('Product');

  // Lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[45] flex flex-col bg-ink-950 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3 }}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 warm-glow" />
          <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-5 pb-8 pt-[calc(var(--nav-h)+1rem)] sm:px-8">
            <ul className="divide-y divide-white/[0.06] border-y hairline">
              {mainNav.map((group, gi) => {
                const isOpen = expanded === group.label;
                return (
                  <motion.li
                    key={group.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 + gi * 0.04 }}
                  >
                    {group.href ? (
                      <Link href={group.href} className="flex h-16 items-center text-[1.625rem] font-semibold tracking-[-0.03em] text-ivory">
                        {group.label}
                      </Link>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="flex h-16 w-full items-center justify-between text-left text-[1.625rem] font-semibold tracking-[-0.03em] text-ivory"
                          aria-expanded={isOpen}
                          onClick={() => setExpanded(isOpen ? null : group.label)}
                        >
                          {group.label}
                          <Plus aria-hidden className={cn('size-5 text-subtle transition-transform duration-300', isOpen && 'rotate-45')} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <ul className="grid gap-1 pb-5">
                                {group.items?.map((key) => {
                                  const p = pages[key];
                                  const Icon = p.icon;
                                  return (
                                    <li key={key}>
                                      <Link
                                        href={p.href}
                                        aria-current={pathname === p.href ? 'page' : undefined}
                                        className={cn(
                                          'flex items-center gap-3.5 rounded-[8px] px-1 py-2.5 text-ivory/90',
                                          pathname === p.href && 'text-gold-400',
                                        )}
                                      >
                                        <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-ink-800">
                                          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                                        </span>
                                        <span>
                                          <span className="block text-[1rem] font-semibold">{p.label}</span>
                                          <span className="block text-[0.8125rem] text-subtle">{p.blurb}</span>
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </nav>
          <motion.div
            className="relative border-t hairline bg-ink-950/90 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur sm:px-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <ButtonLink href="/early-access" size="lg" className="w-full" arrow>
              Join FNDRS
            </ButtonLink>
            <p className="mt-3 text-center text-[0.8125rem] text-subtle">FNDRS is in early beta.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
