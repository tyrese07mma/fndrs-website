import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export function Container({ children, className, wide }: { children: ReactNode; className?: string; wide?: boolean }) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', wide ? 'max-w-[96rem]' : 'max-w-[80rem]', className)}>
      {children}
    </div>
  );
}

/** "// SMART MATCH" — the technical label used sparingly above headlines. */
export function Eyebrow({ children, className, tone = 'gold' }: { children: ReactNode; className?: string; tone?: 'gold' | 'muted' | 'ink' }) {
  return (
    <p
      className={cn(
        'label-mono',
        tone === 'gold' && 'text-gold-400',
        tone === 'muted' && 'text-subtle',
        tone === 'ink' && 'text-gold-700',
        className,
      )}
    >
      <span aria-hidden className="mr-1 opacity-60">
        //
      </span>
      {children}
    </p>
  );
}

/** Pill chip — matches the app's chips ("AI / ML", "Berlin"). */
export function Chip({ children, className, tone = 'dark' }: { children: ReactNode; className?: string; tone?: 'dark' | 'light' | 'gold' }) {
  return (
    <span
      className={cn(
        'inline-flex h-8 items-center rounded-full border px-3.5 text-[0.8125rem] font-medium tracking-[-0.005em]',
        tone === 'dark' && 'border-white/10 bg-white/[0.04] text-ivory/85',
        tone === 'light' && 'border-ink/10 bg-white/60 text-ink-muted',
        tone === 'gold' && 'border-gold-500/40 bg-gold-500/10 text-gold-400',
        className,
      )}
    >
      {children}
    </span>
  );
}

export type Status = 'live' | 'beta' | 'dev' | 'soon';

const STATUS: Record<Status, { label: string; dot: string; cls: string }> = {
  live: { label: 'In the app', dot: 'bg-[#5aa981]', cls: 'text-[#8fd0ad] border-[#5aa981]/30 bg-[#5aa981]/10' },
  beta: { label: 'Early beta', dot: 'bg-gold-500', cls: 'text-gold-400 border-gold-500/30 bg-gold-500/10' },
  dev: { label: 'In development', dot: 'bg-[#7c97c7]', cls: 'text-[#a9bde0] border-[#7c97c7]/30 bg-[#7c97c7]/10' },
  soon: { label: 'Coming to FNDRS', dot: 'bg-muted', cls: 'text-muted border-white/10 bg-white/[0.04]' },
};

/** Honest feature status. Used wherever something is not fully shipped. */
export function StatusBadge({ status, label, className }: { status: Status; label?: string; className?: string }) {
  const s = STATUS[status];
  return (
    <span className={cn('inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.14em]', s.cls, className)}>
      <span aria-hidden className={cn('size-1.5 rounded-full', s.dot)} />
      {label ?? s.label}
    </span>
  );
}

/** Rounded icon tile like the app's Discover tiles. */
export function IconTile({ children, className, tone = 'dark' }: { children: ReactNode; className?: string; tone?: 'dark' | 'light' | 'gold' }) {
  return (
    <span
      className={cn(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-[14px]',
        tone === 'dark' && 'bg-ink-700/80 text-ivory',
        tone === 'light' && 'bg-paper-200 text-ink',
        tone === 'gold' && 'bg-gold-500/15 text-gold-400',
        className,
      )}
    >
      {children}
    </span>
  );
}
