import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { ArrowLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { Section, type Tone } from './Section';

/** Text + media split. Used for most explanatory product sections. */
export function FeatureSection({
  eyebrow,
  title,
  body,
  points,
  link,
  media,
  reverse,
  tone = 'dark',
  badge,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  body: ReactNode;
  points?: string[];
  link?: { href: string; label: string };
  media: ReactNode;
  reverse?: boolean;
  tone?: Tone;
  badge?: ReactNode;
  id?: string;
}) {
  const light = tone === 'light';
  return (
    <Section tone={tone} id={id}>
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div className={cn(reverse && 'lg:order-2')}>
          <Reveal>
            {eyebrow && <Eyebrow tone={light ? 'ink' : 'gold'}>{eyebrow}</Eyebrow>}
            {badge && <div className="mt-5">{badge}</div>}
            <h2 className={cn('headline-md', eyebrow && 'mt-6')}>{title}</h2>
            <div className={cn('lead mt-6 space-y-4', light ? 'text-ink-muted' : 'text-muted')}>{body}</div>
          </Reveal>
          {points && (
            <Reveal delay={0.1}>
              <ul className={cn('mt-9 grid gap-3 border-t pt-8 sm:grid-cols-2', light ? 'border-ink/10' : 'hairline')}>
                {points.map((p) => (
                  <li key={p} className={cn('flex gap-3 text-[0.9375rem]', light ? 'text-ink' : 'text-ivory/90')}>
                    <Check aria-hidden className={cn('mt-0.5 size-4 shrink-0', light ? 'text-gold-700' : 'text-gold-500')} />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {link && (
            <Reveal delay={0.15} className="mt-10">
              <ArrowLink href={link.href} className={light ? 'text-ink decoration-ink/20' : undefined}>
                {link.label}
              </ArrowLink>
            </Reveal>
          )}
        </div>
        <div className={cn('relative', reverse && 'lg:order-1')}>{media}</div>
      </div>
    </Section>
  );
}
