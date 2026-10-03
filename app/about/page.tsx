import Image from 'next/image';

import { CTASection } from '@/components/marketing/CTASection';
import { HeroShell } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { Wordmark } from '@/components/layout/Wordmark';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem, TextReveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export const metadata = pageMetadata('about');

const VALUES = [
  ['Build', 'We exist for people who make things. Everything in FNDRS should help someone build — or it does not belong.'],
  ['Connect', 'The right person at the right time changes everything. We optimise for fit, not for reach.'],
  ['Share', 'Progress shared is progress multiplied. We make building in public the easy default.'],
  ['Learn', 'Nobody knows how to start a company the first time. A good network shortens the learning curve.'],
  ['Create', 'New companies, new teams, new ideas. That is the output we care about.'],
];

export default function AboutPage() {
  return (
    <>
      {/* ------------- Hero: brand story, type only */}
      <HeroShell href="/about" className="pb-20 sm:pb-28">
        <div className="mt-12 sm:mt-16">
          <Reveal y={10}>
            <Eyebrow>About FNDRS</Eyebrow>
          </Reveal>
          <TextReveal lines={['Ideas are', 'everywhere.']} className="headline-xl mt-8" delay={0.05} />
          <div className="mt-14 grid gap-6 border-t hairline pt-8 sm:mt-20 lg:grid-cols-12 lg:gap-10">
            <Reveal delay={0.2} className="lg:col-span-3">
              <p className="label-mono text-subtle">Why FNDRS exists</p>
            </Reveal>
            <Reveal delay={0.25} className="lg:col-span-8 lg:col-start-5">
              <p className="text-[clamp(1.625rem,1.15rem+2vw,3rem)] font-bold leading-[1.12] tracking-[-0.035em]">
                The right people aren&rsquo;t.{' '}
                <span className="text-subtle">FNDRS Society exists to close that gap — for founders, builders, mentors and investors who want to find each other.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </HeroShell>

      {/* ------------- Problem */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Eyebrow tone="ink">The problem</Eyebrow>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <p className="text-[clamp(1.5rem,1.15rem+1.5vw,2.5rem)] font-bold leading-[1.15] tracking-[-0.03em]">
                Many people have ideas, skills or ambition — but don&rsquo;t find the right people at the right time.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
              <Reveal>
                <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
                  The developer who would co-found tomorrow doesn&rsquo;t know the founder two streets away who needs exactly them. The first-time founder doesn&rsquo;t know a single investor. The mentor
                  who could save a team six months never hears about it.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
                  Professional networks are built for careers, not for starting things. Social feeds reward reach, not relevance. FNDRS is built for the moment before a team exists — and everything
                  after.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------- Mission */}
      <section className="border-b hairline bg-ink-950 py-24 sm:py-32">
        <div className="mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <Eyebrow>Mission</Eyebrow>
            <p className="headline-lg mt-8 max-w-[18ch]">
              Make finding the right people to build with <span className="text-gold-300">easier.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------- Values: five words, no numbering */}
      <Section space="tight">
        <h2 className="label-mono text-subtle">Five words we build by</h2>
        <RevealGroup as="ul" className="mt-8 border-t hairline">
          {VALUES.map(([t, d]) => (
            <RevealItem as="li" key={t} className="grid gap-3 border-b hairline py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-9">
              <span className="text-[clamp(2.25rem,1.6rem+2.8vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.045em] sm:col-span-6">{t}</span>
              <span className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted sm:col-span-6">{d}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------- How we build: run-in statements in three columns */}
      <Section tone="raised" space="tight">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="How we build FNDRS" title="In public, in beta, with the people it's for." size="sm" />
          <Reveal>
            <ButtonLink href="/roadmap" variant="secondary" arrow>
              See the roadmap
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-10 border-t hairline pt-10 md:grid-cols-3 md:gap-12">
          {[
            ['No fake numbers.', 'You will not find invented user counts, logos or testimonials here. When we have real ones, we will show them.'],
            ['Honest status labels.', 'Features in development are marked as such — Copilot and Pro included. FNDRS is an early product, and we say what works and what doesn’t yet.'],
            ['Built with early members.', 'The first people on FNDRS shape what it becomes. That is what Early Access is for.'],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <p className="text-[1.0625rem] leading-relaxed text-muted">
                <strong className="font-semibold text-ivory">{t}</strong> {d}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------- The name */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="flex flex-wrap items-center gap-8 lg:col-span-5">
            <Image src="/brand/mark.png" alt="FNDRS mark" width={160} height={132} className="h-24 w-auto sm:h-32" />
            <Wordmark size={24} className="text-ivory" />
          </Reveal>
          <SectionHeading
            eyebrow="The name"
            title="FNDRS Society."
            lead="A society, not a platform: a group of people who build, and who are better at it together. Find. Match. Build."
            className="lg:col-span-6 lg:col-start-7"
            action={
              <p className="text-[0.9375rem] text-subtle">
                FNDRS Society is designed and developed by{' '}
                <a
                  href={site.credit.url}
                  target="_blank"
                  rel="noopener"
                  className="text-ivory/85 underline decoration-white/20 underline-offset-4 transition-colors hover:text-ivory"
                >
                  {site.credit.name}
                </a>
                .
              </p>
            }
          />
        </div>
      </Section>

      <CTASection eyebrow="Join us" title="Build it with us." body="FNDRS is being built right now — with the first people who use it." secondary={{ href: '/contact', label: 'Get in touch' }} />
      <ProductNavigation items={['product', 'howItWorks', 'roadmap', 'contact']} />
    </>
  );
}
