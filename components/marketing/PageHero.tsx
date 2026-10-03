import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { Reveal, TextReveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from './Breadcrumbs';

/**
 * The frame every inner-page hero shares: nav clearance and breadcrumbs.
 * What goes inside is composed per page, so heroes don't all look alike.
 */
export function HeroShell({
  href,
  children,
  className,
  glow,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  /** The app's warm welcome glow. Reserved for a few product heroes. */
  glow?: boolean;
}) {
  return (
    <section className={cn('relative overflow-hidden pt-[calc(var(--nav-h)+2.5rem)] sm:pt-[calc(var(--nav-h)+3.5rem)]', className)}>
      {glow && <div aria-hidden className="pointer-events-none absolute inset-0 warm-glow" />}
      <Container wide className="relative">
        <Breadcrumbs href={href} />
        {children}
      </Container>
    </section>
  );
}

/**
 * Standard hero for secondary pages: label, big headline, lead, actions
 * and optional media.
 */
export function PageHero({
  href,
  eyebrow,
  title,
  lead,
  actions,
  media,
  aside,
  size = 'lg',
  glow,
  className,
}: {
  href: string;
  eyebrow: string;
  title: ReactNode[];
  lead?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  /** Small block under the lead (status, facts). */
  aside?: ReactNode;
  size?: 'xl' | 'lg';
  glow?: boolean;
  className?: string;
}) {
  return (
    <HeroShell href={href} glow={glow} className={cn('pb-20 sm:pb-24', className)}>
      <div className={cn('mt-12 sm:mt-16', media && 'grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12')}>
        <div>
          <Reveal y={10}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal lines={title} className={cn('mt-7', size === 'xl' ? 'headline-xl' : 'headline-lg')} delay={0.05} />
          {lead && (
            <Reveal delay={0.25}>
              <p className="lead mt-8 max-w-[38rem] text-muted">{lead}</p>
            </Reveal>
          )}
          {aside && (
            <Reveal delay={0.3}>
              <div className="mt-8">{aside}</div>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">{actions}</div>
            </Reveal>
          )}
        </div>
        {media && (
          <Reveal delay={0.2} y={40} className="relative">
            {media}
          </Reveal>
        )}
      </div>
    </HeroShell>
  );
}
