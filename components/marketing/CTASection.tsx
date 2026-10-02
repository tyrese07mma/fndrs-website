import Image from 'next/image';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { ButtonLink } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';

/** Closing call to action. One primary action, one quiet secondary. */
export function CTASection({
  eyebrow = 'Early access',
  title,
  body,
  primary = { href: '/early-access', label: 'Join Early Access' },
  secondary,
  tone = 'dark',
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  tone?: 'dark' | 'light';
  children?: ReactNode;
}) {
  const light = tone === 'light';
  return (
    <section className={cn('relative overflow-hidden py-28 sm:py-40', light ? 'bg-paper text-ink' : 'bg-ink-950 text-ivory')}>
      {!light && <div aria-hidden className="pointer-events-none absolute inset-0 warm-glow opacity-80" />}
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
          <div className="mt-11 flex flex-col gap-3 xs:flex-row">
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
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
