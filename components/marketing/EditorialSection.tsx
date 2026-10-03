import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';
import { Container } from '@/components/ui/primitives';

/**
 * Magazine-style chapter: label, headline, prose, links — next to a media
 * column that takes the larger share (5 / 7). `flip` swaps the sides.
 * Only pass `index` where the order actually means something.
 */
export function EditorialSection({
  index,
  label,
  title,
  children,
  links,
  media,
  flip,
  status,
  id,
}: {
  index?: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
  links?: { href: string; label: string }[];
  media?: ReactNode;
  flip?: boolean;
  status?: ReactNode;
  id?: string;
}) {
  return (
    <article id={id} className="relative scroll-mt-14 border-t hairline py-20 sm:py-24">
      <Container wide>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={cn(media ? 'lg:col-span-5' : 'lg:col-span-8', flip && media && 'lg:order-2 lg:col-start-8')}>
            <Reveal>
              <p className="label-mono flex items-baseline gap-3 text-subtle">
                {index && <span className="text-gold-500">{index}</span>}
                {label}
              </p>
              {status && <div className="mt-5">{status}</div>}
              <h2 className="headline-md mt-6">{title}</h2>
              <div className="lead mt-7 space-y-5 text-muted">{children}</div>
            </Reveal>
            {links && links.length > 0 && (
              <Reveal delay={0.1}>
                <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t hairline pt-6">
                  {links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ivory/90 underline-offset-[6px] decoration-white/20 transition-colors hover:text-ivory hover:underline"
                      >
                        {l.label}
                        <ArrowRight aria-hidden className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          {media && <div className={cn(flip ? 'lg:order-1 lg:col-span-6 lg:row-start-1' : 'lg:col-span-7')}>{media}</div>}
        </div>
      </Container>
    </article>
  );
}
