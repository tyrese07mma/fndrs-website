import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';
import { Container } from '@/components/ui/primitives';

/**
 * Magazine-style chapter: big index number, label, headline, prose, links.
 * Alternates sides; media column is optional (typographic chapters work too).
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
  index: string;
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
    <article id={id} className="relative border-t hairline py-20 sm:py-28">
      <Container wide>
        <div className={cn('grid gap-12 lg:gap-20', media ? 'lg:grid-cols-12' : 'lg:grid-cols-12')}>
          <Reveal className={cn('lg:col-span-2', flip && media && 'lg:order-3')}>
            <div className="flex items-baseline gap-4 lg:block">
              <span className="font-mono text-[0.8125rem] text-gold-500">{index}</span>
              <p className="label-mono text-subtle lg:mt-4">{label}</p>
            </div>
          </Reveal>
          <div className={cn(media ? 'lg:col-span-5' : 'lg:col-span-8', flip && media && 'lg:order-2')}>
            <Reveal>
              {status && <div className="mb-6">{status}</div>}
              <h3 className="headline-md">{title}</h3>
              <div className="lead mt-7 space-y-5 text-muted">{children}</div>
            </Reveal>
            {links && links.length > 0 && (
              <Reveal delay={0.1}>
                <ul className="mt-10 flex flex-wrap gap-2">
                  {links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex h-10 items-center gap-1.5 rounded-full border hairline-strong px-4 text-[0.875rem] font-medium text-ivory/90 transition-colors hover:border-white/30 hover:bg-white/[0.04]"
                      >
                        {l.label}
                        <ArrowUpRight aria-hidden className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          {media && <div className={cn('lg:col-span-5', flip && 'lg:order-1')}>{media}</div>}
        </div>
      </Container>
    </article>
  );
}
