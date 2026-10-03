import Image from 'next/image';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Closing call to action. One primary action, one quiet secondary.
 * `compact` is a single row for pages that already said enough.
 */
export function CTASection({
  eyebrow = 'Early Access',
  title,
  body,
  primary = { href: '/early-access', label: 'Join Early Access' },
  secondary,
  tone = 'dark',
  variant = 'statement',
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  tone?: 'dark' | 'light';
  variant?: 'statement' | 'compact';
  children?: ReactNode;
}) {
  const light = tone === 'light';
  const actions = (
    <div className={cn('flex flex-col gap-3 xs:flex-row', variant === 'statement' && 'mt-11')}>
      <ButtonLink href={primary.href} size="lg" variant={light ? 'dark' : 'primary'} arrow>
        {primary.label}
      </ButtonLink>
      {secondary && (
        <ButtonLink
          href={secondary.href}
          size="lg"
          variant="secondary"
          className={light ? 'border-ink/15 bg-transparent text-ink hover:border-ink/30 hover:bg-ink/[0.04]' : undefined}
        >
          {secondary.label}
        </ButtonLink>
      )}
    </div>
  );

  if (variant === 'compact') {
    return (
      <section className={cn('border-t py-16 sm:py-20', light ? 'border-ink/10 bg-paper text-ink' : 'hairline bg-ink-950 text-ivory')}>
        <Container wide>
          <Reveal className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <h2 className="headline-md">{title}</h2>
              {body && <p className={cn('lead mt-5 max-w-2xl', light ? 'text-ink-muted' : 'text-muted')}>{body}</p>}
            </div>
            {actions}
          </Reveal>
          {children}
        </Container>
      </section>
    );
  }

  return (
    <section className={cn('relative overflow-hidden py-24 sm:py-32', light ? 'bg-paper text-ink' : 'bg-ink-950 text-ivory')}>
      <Image
        src="/brand/mark.png"
        alt=""
        width={600}
        height={600}
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-[12%] top-1/2 hidden h-[130%] w-auto -translate-y-1/2 select-none md:block',
          light ? 'opacity-[0.05] invert' : 'opacity-[0.025]',
        )}
      />
      <Container wide className="relative">
        <Reveal className="max-w-4xl">
          <Eyebrow tone={light ? 'ink' : 'gold'}>{eyebrow}</Eyebrow>
          <h2 className="headline-lg mt-7">{title}</h2>
          {body && <p className={cn('lead mt-8 max-w-2xl', light ? 'text-ink-muted' : 'text-muted')}>{body}</p>}
          {actions}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
