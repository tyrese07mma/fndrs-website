import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { FAQList } from './FAQList';
import { Section, SectionHeading, type Tone } from './Section';

export interface FAQItem {
  q: string;
  a: string;
}

/** FAQ block with FAQPage structured data. */
export function FAQ({
  items,
  title = 'Questions, answered.',
  eyebrow = 'FAQ',
  lead,
  tone = 'dark',
  id,
}: {
  items: FAQItem[];
  title?: ReactNode;
  eyebrow?: string;
  lead?: ReactNode;
  tone?: Tone;
  id?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
  return (
    <Section tone={tone} id={id}>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <SectionHeading eyebrow={eyebrow} title={title} lead={lead} tone={tone} size="sm" className={cn('lg:sticky lg:top-32 lg:self-start')} />
        <FAQList items={items} tone={tone} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Section>
  );
}
