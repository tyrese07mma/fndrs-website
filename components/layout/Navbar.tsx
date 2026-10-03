'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/lib/cn';
import { mainNav, pages, type NavGroup } from '@/lib/pages';
import { ButtonLink } from '@/components/ui/Button';
import { MobileNavigation } from './MobileNavigation';
import { Wordmark } from './Wordmark';

const EASE = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, group: NavGroup) {
  if (group.href) return pathname === group.href;
  return group.items?.some((k) => pages[k].href === pathname) ?? false;
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  // Hover opens a dropdown just before the click lands; don't let that click close it again.
  const openedAt = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (open !== label) openedAt.current = Date.now();
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled || open || mobileOpen
            ? 'border-b hairline bg-ink-950/80 backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent',
        )}
      >
        <nav aria-label="Main" className="mx-auto flex h-[var(--nav-h)] max-w-[96rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Link href="/" className="relative z-10 -m-2 p-2 text-ivory" aria-label="FNDRS Society — home">
            <Wordmark size={15} />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((group) => (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => group.items && enter(group.label)}
                onMouseLeave={leave}
                // Keyboard: close when focus leaves the group, Escape returns focus to the trigger,
                // ArrowDown opens the dropdown and moves into it.
                onBlur={(e) => {
                  if (group.items && !e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setOpen((o) => (o === group.label ? null : o));
                  }
                }}
                onKeyDown={(e) => {
                  if (!group.items) return;
                  const li = e.currentTarget;
                  if (e.key === 'Escape' && open === group.label) {
                    e.stopPropagation();
                    setOpen(null);
                    li.querySelector('button')?.focus();
                  } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setOpen(group.label);
                    const links = [...li.querySelectorAll<HTMLAnchorElement>('a')];
                    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
                    if (links.length) links[Math.min(i + 1, links.length - 1)].focus();
                    else setTimeout(() => li.querySelector<HTMLAnchorElement>('a')?.focus(), 50);
                  } else if (e.key === 'ArrowUp') {
                    const links = [...li.querySelectorAll<HTMLAnchorElement>('a')];
                    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
                    if (i >= 0) {
                      e.preventDefault();
                      (i === 0 ? li.querySelector('button') : links[i - 1])?.focus();
                    }
                  }
                }}
              >
                {group.href ? (
                  <Link
                    href={group.href}
                    className={cn(
                      'inline-flex h-10 items-center rounded-full px-4 text-[0.875rem] font-medium transition-colors',
                      isActive(pathname, group) ? 'text-ivory' : 'text-muted hover:text-ivory',
                    )}
                  >
                    {group.label}
                  </Link>
                ) : (
                  <Dropdown group={group} open={open === group.label} active={isActive(pathname, group)} pathname={pathname} onToggle={() => {
                      if (open === group.label && Date.now() - openedAt.current > 400) setOpen(null);
                      else {
                        openedAt.current = Date.now();
                        setOpen(group.label);
                      }
                    }} />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink href="/early-access" size="sm" className="max-[359px]:hidden">
              Join FNDRS
            </ButtonLink>
            <button
              type="button"
              className="relative z-[70] inline-flex h-10 items-center gap-2.5 rounded-full border hairline-strong px-4 text-[0.8125rem] font-medium text-ivory lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span>{mobileOpen ? 'Close' : 'Menu'}</span>
              <span aria-hidden className="relative block h-2.5 w-4">
                <span className={cn('absolute left-0 h-px w-4 bg-current transition-all duration-300', mobileOpen ? 'top-1/2 rotate-45' : 'top-0')} />
                <span className={cn('absolute left-0 h-px w-4 bg-current transition-all duration-300', mobileOpen ? 'top-1/2 -rotate-45' : 'top-full')} />
              </span>
            </button>
          </div>
        </nav>
      </header>
      <MobileNavigation open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}

function Dropdown({
  group,
  open,
  active,
  pathname,
  onToggle,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  pathname: string;
  onToggle: () => void;
}) {
  const id = useId();
  const items = group.items ?? [];
  const twoCol = items.length > 4;

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={cn(
          'inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.875rem] font-medium transition-colors',
          open || active ? 'text-ivory' : 'text-muted hover:text-ivory',
          open && 'bg-white/[0.05]',
        )}
      >
        {group.label}
        <ChevronDown aria-hidden className={cn('size-3.5 opacity-60 transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.985, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: EASE }}
            className={cn('absolute left-1/2 top-full origin-top -translate-x-1/2 pt-3', twoCol ? 'w-[36rem]' : 'w-[22rem]')}
          >
            <div className="overflow-hidden rounded-[22px] border hairline-strong bg-ink-900 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
              <ul className={cn('grid gap-0.5', twoCol && 'grid-cols-2')}>
                {items.map((key) => {
                  const p = pages[key];
                  const Icon = p.icon;
                  const current = pathname === p.href;
                  return (
                    <li key={key}>
                      <Link
                        href={p.href}
                        aria-current={current ? 'page' : undefined}
                        className={cn(
                          'group flex gap-3 rounded-[16px] p-3 transition-colors hover:bg-white/[0.05]',
                          current && 'bg-white/[0.05]',
                        )}
                      >
                        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-ink-700/70 text-ivory/90 transition-colors group-hover:text-gold-400">
                          <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[0.875rem] font-semibold text-ivory">{p.label}</span>
                          <span className="mt-0.5 block text-[0.8125rem] leading-snug text-subtle">{p.blurb}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {group.footer && (
                <Link
                  href={group.footer.href}
                  className="mt-1.5 flex items-center justify-between rounded-[16px] border-t hairline px-4 py-3 text-[0.8125rem] font-medium text-muted transition-colors hover:text-ivory"
                >
                  {group.footer.label}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
