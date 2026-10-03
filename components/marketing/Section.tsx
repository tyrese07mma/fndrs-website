import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Container, Eyebrow } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';

export type Tone = 'dark' | 'raised' | 'light';

/** Page section with one of three surfaces: canvas, raised canvas, or warm paper. */
export function Section({
  children,
  tone = 'dark',
  className,
  id,
  wide,
  bleed,
  space = 'default',
  'aria-labelledby': labelledBy,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  wide?: boolean;
  /** Skip the inner container (for full-bleed layouts). */
  bleed?: boolean;
  /** Big gaps only between different topics; related content sits closer. */
  space?: 'tight' | 'default' | 'loose';
  'aria-labelledby'?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative',
        space === 'tight' && 'py-16 sm:py-20 lg:py-24',
        space === 'default' && 'py-20 sm:py-28 lg:py-32',
        space === 'loose' && 'py-24 sm:py-32 lg:py-40',
        tone === 'dark' && 'bg-ink-950 text-ivory',
        tone === 'raised' && 'border-y hairline bg-ink-900 text-ivory',
        tone === 'light' && 'bg-paper text-ink',
        className,
      )}
    >
      {bleed ? children : <Container wide={wide}>{children}</Container>}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = 'dark',
  align = 'left',
  size = 'md',
  className,
  id,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: Tone;
  align?: 'left' | 'center';
  size?: 'lg' | 'md' | 'sm';
  className?: string;
  id?: string;
  action?: ReactNode;
}) {
  const light = tone === 'light';
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow tone={light ? 'ink' : 'gold'}>{eyebrow}</Eyebrow>}
      <h2 id={id} className={cn(size === 'lg' ? 'headline-lg' : size === 'md' ? 'headline-md' : 'headline-sm', eyebrow && 'mt-6')}>
        {title}
      </h2>
      {lead && <p className={cn('lead mt-6', light ? 'text-ink-muted' : 'text-muted', align === 'center' && 'mx-auto max-w-2xl')}>{lead}</p>}
      {action && <div className="mt-8">{action}</div>}
    </Reveal>
  );
}
