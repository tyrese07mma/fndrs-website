import Link from 'next/link';
import type { ReactNode } from 'react';

import { site } from '@/lib/site';
import { Container } from '@/components/ui/primitives';
import { Breadcrumbs } from './Breadcrumbs';

/** Plain, readable layout for legal text. */
export function LegalPage({ href, title, updated, children }: { href: string; title: string; updated?: string; children: ReactNode }) {
  return (
    <section className="pb-28 pt-[calc(var(--nav-h)+2.5rem)] sm:pt-[calc(var(--nav-h)+4rem)]">
      <Container>
        <Breadcrumbs href={href} />
        <div className="mx-auto mt-14 max-w-3xl">
          <h1 className="headline-md">{title}</h1>
          {updated && <p className="label-mono mt-5 text-faint">Last updated · {updated}</p>}
          <div className="legal mt-12 space-y-5 text-[1rem] leading-[1.75] text-muted [&_a]:text-ivory [&_a]:underline [&_a]:decoration-white/25 [&_a]:underline-offset-4 [&_h2]:pt-8 [&_h2]:text-[1.375rem] [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-ivory [&_li]:pl-1 [&_strong]:text-ivory [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Operator name and postal address from lib/site.ts, one line per entry. */
export function LegalAddress() {
  const l = site.legal;
  return (
    <p>
      <strong>{l.name}</strong>
      <br />
      {l.street}
      <br />
      {l.postalCode} {l.city}
      <br />
      {l.country}
    </p>
  );
}

/** How to reach the operator: email if configured, otherwise the contact page. */
export function LegalContact() {
  const email = site.legal.email || site.contactEmail;
  return email ? (
    <>
      Email: <a href={`mailto:${email}`}>{email}</a>
    </>
  ) : (
    <>
      Via our <Link href="/contact">contact page</Link>
    </>
  );
}
