import type { ReactNode } from 'react';

import type { PageKey } from '@/lib/pages';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { CTASection } from './CTASection';
import { FAQ, type FAQItem } from './FAQ';
import { PageHero } from './PageHero';
import { ProductNavigation } from './ProductNavigation';
import { Section, SectionHeading } from './Section';
import { UseCaseGrid, type UseCase } from './UseCaseGrid';

/** Shared structure for the four Solutions pages. Content is page-specific. */
export function AudiencePage({
  href,
  eyebrow,
  title,
  lead,
  heroMedia,
  cta,
  useCasesTitle,
  useCasesLead,
  useCases,
  story,
  feature,
  faq,
  closing,
  related,
  serious,
}: {
  href: string;
  eyebrow: string;
  title: ReactNode[];
  lead: string;
  heroMedia?: ReactNode;
  cta: { href: string; label: string };
  useCasesTitle: ReactNode;
  useCasesLead?: string;
  useCases: UseCase[];
  story: { eyebrow: string; title: ReactNode; points: [string, string][] };
  feature?: ReactNode;
  faq: FAQItem[];
  closing: { title: ReactNode; body: string };
  related: PageKey[];
  /** Calmer treatment: light use-case section, no oversized hero. */
  serious?: boolean;
}) {
  return (
    <>
      <PageHero
        href={href}
        eyebrow={eyebrow}
        size={serious ? 'lg' : 'xl'}
        title={title}
        lead={lead}
        media={heroMedia}
        actions={
          <>
            <ButtonLink href={cta.href} size="lg" arrow>
              {cta.label}
            </ButtonLink>
            <ButtonLink href="/how-it-works" size="lg" variant="secondary">
              How FNDRS works
            </ButtonLink>
          </>
        }
      />

      <Section tone={serious ? 'light' : 'raised'}>
        <SectionHeading eyebrow="Use cases" tone={serious ? 'light' : 'dark'} title={useCasesTitle} lead={useCasesLead} className="mb-14" />
        <UseCaseGrid items={useCases} tone={serious ? 'light' : 'dark'} />
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={story.eyebrow} title={story.title} className="lg:sticky lg:top-32" />
          </div>
          <div className="space-y-10 lg:col-span-7">
            {story.points.map(([t, d], i) => (
              <Reveal key={t} className="grid gap-4 border-t hairline pt-8 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-[0.8125rem] text-gold-500">0{i + 1}</span>
                <div>
                  <h3 className="text-[1.5rem] font-bold tracking-[-0.025em]">{t}</h3>
                  <p className="lead mt-3 text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {feature}

      <FAQ items={faq} tone="raised" />
      <CTASection eyebrow={eyebrow} title={closing.title} body={closing.body} primary={cta} secondary={{ href: '/product', label: 'Explore the product' }} />
      <ProductNavigation items={related} />
    </>
  );
}
