import type { ReactNode } from 'react';

import { Breadcrumbs } from './Breadcrumbs';
import { Container } from '@/components/ui/primitives';

/** Plain, readable layout for legal text. */
export function LegalPage({ href, title, updated, notice, children }: { href: string; title: string; updated?: string; notice?: ReactNode; children: ReactNode }) {
  return (
    <section className="pb-28 pt-[calc(var(--nav-h)+2.5rem)] sm:pt-[calc(var(--nav-h)+4rem)]">
      <Container>
        <Breadcrumbs href={href} />
        <div className="mx-auto mt-14 max-w-3xl">
          <h1 className="headline-md">{title}</h1>
          {updated && <p className="label-mono mt-5 text-faint">Last updated · {updated}</p>}
          {notice && <div className="mt-10 rounded-[18px] border border-gold-500/30 bg-gold-500/[0.07] p-5 text-[0.9375rem] leading-relaxed text-gold-300">{notice}</div>}
          <div className="legal mt-12 space-y-5 text-[1rem] leading-[1.75] text-muted [&_a]:text-ivory [&_a]:underline [&_a]:decoration-white/25 [&_a]:underline-offset-4 [&_h2]:pt-8 [&_h2]:text-[1.375rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ivory [&_li]:pl-1 [&_strong]:text-ivory [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Shows a value from site config, or a visible placeholder if it has not been filled in. */
export function Fill({ value, label }: { value: string; label: string }) {
  return value ? <>{value}</> : <span className="rounded bg-gold-500/15 px-1.5 py-0.5 font-mono text-[0.85em] text-gold-300">[{label}]</span>;
}
