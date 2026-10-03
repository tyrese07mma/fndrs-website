import { Check, CircleDashed } from 'lucide-react';

import { FAQ } from '@/components/marketing/FAQ';
import { HeroShell } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow, StatusBadge } from '@/components/ui/primitives';
import { Reveal, TextReveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('pro');

const FREE = [
  'Your full FNDRS profile',
  'Smart Match — 25 swipes a day',
  'Discover: startups, events, communities, people',
  'Community feed and posting',
  'Messaging with your matches',
  'Startup pages',
  'Weekly challenges and XP',
];

const PRO = [
  'Unlimited Smart Match swipes',
  'See who viewed your profile',
  'More visibility in search and Smart Match',
  'Warm introductions to investors',
];

export default function ProPage() {
  return (
    <>
      {/* ------------- Hero: headline, the real Pro card from the app, then straight into the comparison */}
      <HeroShell href="/pro" className="pb-20 sm:pb-24">
        <div className="mt-12 sm:mt-14">
          <Reveal y={10} className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Eyebrow>FNDRS Pro</Eyebrow>
            <StatusBadge status="unavailable" variant="tag" />
          </Reveal>
          <TextReveal lines={['For people serious', <span key="x" className="text-subtle">about building.</span>]} className="headline-lg mt-8" delay={0.05} />
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal delay={0.25} className="lg:col-span-5">
              <p className="lead text-muted">
                FNDRS is free at its core. Pro is a planned plan with advanced tools for people who are actively building a team or a company. It is not available yet, and it cannot be
                bought.
              </p>
              <ButtonLink href="/early-access" size="lg" arrow className="mt-9">
                Join Early Access
              </ButtonLink>
            </Reveal>
            <Reveal delay={0.3} className="lg:col-span-5 lg:col-start-8">
              <ProductScreenshot screen="discoverTop" region={{ y: 0.155, h: 0.13 }} frame="flat" priority sizes="(min-width: 1024px) 460px, 92vw" />
              <p className="label-mono mt-4 leading-relaxed text-faint">In the app today: paid plans are not available yet</p>
            </Reveal>
          </div>
        </div>

        {/* Free and Pro as one ruled comparison, not two boxes. */}
        <section aria-labelledby="plans-title" className="mt-20 sm:mt-24">
          <Reveal className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 id="plans-title" className="headline-sm">
              The core stays free.
            </h2>
            <p className="max-w-sm text-[0.9375rem] text-subtle">Everything you need to find your people is in the free plan. Pro is for doing more of it, faster.</p>
          </Reveal>
          <div className="mt-10 grid border-t hairline-strong lg:grid-cols-2">
            <Reveal className="flex flex-col py-10 lg:pr-14">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="label-mono text-subtle">Free</p>
                <StatusBadge status="live" label="Available in the beta" />
              </div>
              <p className="mt-6 text-[2.25rem] font-bold tracking-[-0.04em]">Core FNDRS</p>
              <p className="mt-2 text-[1rem] text-muted">The full FNDRS experience for finding people and building in public.</p>
              <ul className="mt-8 space-y-3.5">
                {FREE.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.9875rem] text-ivory/90">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-ivory/60" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <ButtonLink href="/early-access" variant="secondary">
                  Request access
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="relative flex flex-col border-t hairline py-10 lg:border-l lg:border-t-0 lg:pl-14">
              <span aria-hidden className="absolute inset-x-0 -top-px h-px bg-gold-500/70 lg:left-0" />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="label-mono text-gold-400">Pro</p>
                <StatusBadge status="planned" />
              </div>
              <p className="mt-6 text-[2.25rem] font-bold tracking-[-0.04em]">FNDRS Pro</p>
              <p className="mt-2 text-[1rem] text-muted">Advanced tools for people who are serious about building.</p>
              <ul className="mt-8 space-y-3.5">
                {PRO.map((f) => (
                  <li key={f} className="flex gap-3 text-[0.9875rem] text-ivory/90">
                    <CircleDashed aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[0.875rem] text-subtle">Planned, not available yet. The final list may change before launch.</p>
              <div className="mt-auto pt-10">
                <p className="border-t border-dashed border-gold-500/30 pt-5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-gold-400">
                  Pricing announced before launch
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </HeroShell>

      <Section tone="raised" space="tight">
        <div className="grid gap-12 lg:grid-cols-12">
          <SectionHeading eyebrow="Our approach" title="No dark patterns. No paywall on people." size="sm" className="lg:col-span-4" />
          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            {[
              ['Finding people stays free.', 'Smart Match, Discover and messaging your matches are part of the free plan. Talking to someone you matched with should never depend on a subscription.'],
              ['Pro has to earn it.', 'We will only charge for things that save serious builders real time — and we will be clear about what you get.'],
              ['Teams and investors, later.', 'We are also exploring plans for startup teams and investors. Nothing is final.'],
            ].map(([t, d]) => (
              <Reveal key={t} className="border-t hairline pt-7">
                <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em]">{t}</h3>
                <p className="mt-2 text-[1rem] leading-relaxed text-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <FAQ
        eyebrow="FAQ · Pro"
        title="Pro, answered."
        items={[
          { q: 'How much will FNDRS Pro cost?', a: 'Pricing will be announced before launch, here and in the app.' },
          { q: 'Can I buy Pro today?', a: 'No. Pro is planned and not available yet. There is nothing to buy and no payment is taken.' },
          { q: 'When will Pro launch?', a: 'There is no date yet. Pro will come in a later beta phase. Join Early Access to hear about it first.' },
          { q: 'Will free features become paid?', a: 'The plan is that the core of FNDRS stays free: your profile, Smart Match, Discover, the community and messaging your matches.' },
          { q: 'Are the Pro features final?', a: 'No. The list on this page shows what we are planning. It may change before launch.' },
        ]}
      />
      <ProductNavigation items={['smartMatch', 'copilot', 'roadmap', 'earlyAccess']} />
    </>
  );
}
