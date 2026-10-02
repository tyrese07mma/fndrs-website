import Image from 'next/image';

import { CTASection } from '@/components/marketing/CTASection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { Wordmark } from '@/components/layout/Wordmark';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

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
      <PageHero
        href="/about"
        eyebrow="About FNDRS"
        size="xl"
        title={['Ideas are', 'everywhere.']}
        lead="The right people aren't. FNDRS Society exists to close that gap — for founders, builders, mentors and investors who want to find each other."
      />

      {/* ------------- Problem */}
      <Section tone="light">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow tone="ink">The problem</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[clamp(1.75rem,1.2rem+2.2vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.035em]">
                Many people have ideas, skills or ambition — but don&rsquo;t find the right people at the right time.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <Reveal>
                <p className="lead text-ink-muted">
                  The developer who would co-found tomorrow doesn&rsquo;t know the founder two streets away who needs exactly them. The first-time founder doesn&rsquo;t know a single investor. The mentor
                  who could save a team six months never hears about it.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="lead text-ink-muted">
                  Professional networks are built for careers, not for starting things. Social feeds reward reach, not relevance. FNDRS is built for the moment before a team exists — and everything
                  after.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------- Mission */}
      <section className="relative overflow-hidden border-b hairline bg-ink-950 py-32 sm:py-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 warm-glow" />
        <div className="relative mx-auto max-w-[96rem] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <Eyebrow>Mission</Eyebrow>
            <p className="headline-lg mt-8 max-w-[18ch]">
              Make finding the right people to build with <span className="text-gold-300">easier.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------- Values */}
      <Section>
        <SectionHeading eyebrow="What we believe" title="Five words we build by." className="mb-16" />
        <RevealGroup as="ol" className="border-t hairline">
          {VALUES.map(([t, d], i) => (
            <RevealItem as="li" key={t} className="grid gap-4 border-b hairline py-8 sm:grid-cols-12 sm:items-baseline sm:py-10">
              <span className="font-mono text-[0.8125rem] text-faint sm:col-span-1">0{i + 1}</span>
              <span className="text-[clamp(2.25rem,1.6rem+2.8vw,4.5rem)] font-bold uppercase leading-none tracking-[-0.045em] sm:col-span-5">{t}</span>
              <span className="text-[1.0625rem] leading-relaxed text-muted sm:col-span-6">{d}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------- How we build */}
      <Section tone="raised">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="How we build FNDRS"
            title="In public, in beta, with the people it's for."
            lead="FNDRS is an early product. We say what works, what doesn't yet, and what is still being built — on this site and in the app."
            action={
              <ButtonLink href="/roadmap" variant="secondary" arrow>
                See the roadmap
              </ButtonLink>
            }
          />
          <div className="space-y-3">
            {[
              ['No fake numbers.', 'You will not find invented user counts, logos or testimonials here. When we have real ones, we will show them.'],
              ['Honest status labels.', 'Features in development are marked as such — Copilot and Pro included.'],
              ['Built with early members.', 'The first people on FNDRS shape what it becomes. That is what early access is for.'],
            ].map(([t, d]) => (
              <Reveal key={t} className="rounded-[24px] border hairline bg-ink-950 p-7">
                <p className="text-[1.125rem] font-semibold">{t}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------- Brand */}
      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <SectionHeading eyebrow="The name" title="FNDRS Society." lead="A society, not a platform: a group of people who build, and who are better at it together. Find. Match. Build." />
          <Reveal className="flex flex-col items-center justify-center gap-12 rounded-[30px] border hairline bg-black px-8 py-16">
            <Image src="/brand/mark.png" alt="FNDRS mark" width={160} height={132} className="h-28 w-auto" />
            <Wordmark size={28} className="text-ivory" />
          </Reveal>
        </div>
      </Section>

      <CTASection eyebrow="Join us" title="Build it with us." body="FNDRS is being built right now — with the first people who use it." secondary={{ href: '/contact', label: 'Get in touch' }} />
      <ProductNavigation items={['product', 'howItWorks', 'roadmap', 'contact']} />
    </>
  );
}
