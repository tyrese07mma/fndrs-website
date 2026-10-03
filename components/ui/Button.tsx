import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'dark';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  // The app's ivory primary action ("Create account"), squared off for the web.
  primary: 'bg-ivory text-ink-950 hover:bg-white shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]',
  secondary: 'border hairline-strong bg-white/[0.03] text-ivory hover:bg-white/[0.07] hover:border-white/25',
  ghost: 'text-muted hover:text-ivory',
  gold: 'bg-gold-500 text-[#221a08] hover:bg-gold-400',
  // For light (paper) sections.
  dark: 'bg-ink text-paper hover:bg-black',
};

// Moderate radii: buttons read as controls, not as pills.
const sizes: Record<Size, string> = {
  sm: 'h-9 rounded-[8px] px-4 text-[0.8125rem]',
  md: 'h-11 rounded-[10px] px-5 text-[0.9375rem]',
  lg: 'h-14 rounded-[12px] px-7 text-base',
};

interface Props extends Omit<ComponentProps<typeof Link>, 'className'> {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ variant = 'primary', size = 'md', arrow, className, children, ...rest }: Props) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], variant === 'ghost' && 'px-1', className)} {...rest}>
      {children}
      {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5" />}
    </Link>
  );
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Inline text link with arrow — "Explore Smart Match →". */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'group/link inline-flex items-center gap-2 font-semibold tracking-[-0.01em] text-ivory underline-offset-[6px] decoration-white/20 hover:underline',
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1" />
    </Link>
  );
}
