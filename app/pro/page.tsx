import { Check, CircleDashed, Crown } from 'lucide-react';

import { FAQ } from '@/components/marketing/FAQ';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
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
      <PageHero
        href="/pro"
        eyebrow="FNDRS Pro"
        title={['For people serious', 'about building.']}
        lead="FNDRS is free at its core. Pro is a planned plan with advanced tools for people who are actively building a team or a company. It is not available yet, and it cannot be bought."
        aside={<StatusBadge status="unavailable" />}
        actions={
          <ButtonLink href="/early-access" size="lg" arrow>
            Join Early Access
          </ButtonLink>
        }
        media={<ProductScreenshot screen="discoverTop" crop={0.3} priority className="mx-auto max-w-[26rem]" caption="In the app today: paid plans are not available yet" />}
      />

      <Section tone="raised">
        <SectionHeading eyebrow="Free and Pro" title="The core stays free." lead="Everything you need to find your people is in the free plan. Pro is for doing more of it, faster." className="mb-16" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="flex flex-col rounded-[30px] border hairline bg-ink-950 p-8 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="label-mono text-subtle">Free</p>
              <StatusBadge status="live" label="Available in the beta" />
            </div>
            <p className="mt-5 text-[2.5rem] font-bold tracking-[-0.04em]">Core FNDRS</p>
            <p className="mt-2 text-[1rem] text-muted">The full FNDRS experience for finding people and building in public.</p>
            <ul className="mt-9 space-y-3.5 border-t hairline pt-8">
              {FREE.map((f) => (
                <li key={f} className="flex gap-3 text-[0.9875rem] text-ivory/90">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-ivory/60" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-10">
              <ButtonLink href="/early-access" variant="secondary" className="w-full">
                Request access
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="relative flex flex-col overflow-hidden rounded-[30px] border border-gold-500/35 bg-gradient-to-b from-gold-500/[0.09] via-ink-950 to-ink-950 p-8 sm:p-10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="label-mono text-gold-400">Pro</p>
                <StatusBadge status="planned" />
              </div>
              <span className="inline-flex size-11 items-center justify-center rounded-[13px] bg-gradient-to-b from-gold-400 to-gold-600 text-[#221a08]">
                <Crown className="size-5" aria-hidden />
              </span>
            </div>
            <p className="mt-5 text-[2.5rem] font-bold tracking-[-0.04em]">FNDRS Pro</p>
            <p className="mt-2 text-[1rem] text-muted">Advanced tools for people who are serious about building.</p>
            <ul className="mt-9 space-y-3.5 border-t border-gold-500/20 pt-8">
              {PRO.map((f) => (
                <li key={f} className="flex gap-3 text-[0.9875rem] text-ivory/90">
                  <CircleDashed aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.875rem] text-subtle">Planned, not available yet. The final list may change before launch.</p>
            <div className="mt-auto pt-10">
              <div className="flex h-11 w-full items-center justify-center rounded-full border border-gold-500/30 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-gold-400">
                Pricing announced before launch
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading eyebrow="Our approach" title="No dark patterns. No paywall on people." size="sm" />
          <div className="space-y-8">
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
