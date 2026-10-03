import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';

import { AudienceCards } from '@/components/marketing/AudienceCards';
import { CTASection } from '@/components/marketing/CTASection';
import { ProductLoop } from '@/components/marketing/ProductLoop';
import { ProductReality } from '@/components/marketing/ProductReality';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { ParallaxScreen, ScreenStack } from '@/components/product/ScreenStack';
import { PostSchematic } from '@/components/product/Schematics';
import { ArrowLink, ButtonLink } from '@/components/ui/Button';
import { Container, Eyebrow, StatusBadge } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem, TextReveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('home');

const DISCOVER = [
  ['Founders', '/profiles'],
  ['Startups', '/startups'],
  ['Communities', '/community'],
  ['Events', '/discover#events'],
  ['Mentors', '/for-mentors'],
  ['Investors', '/for-investors'],
] as const;

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------ HERO */}
      <section className="relative overflow-hidden pb-24 pt-[calc(var(--nav-h)+3rem)] sm:pb-32 sm:pt-[calc(var(--nav-h)+5rem)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 warm-glow" />
        <Container wide className="relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <div>
              <Reveal y={10}>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge status="beta" label="Now in early beta" />
                  <span className="label-mono text-subtle">Find · Match · Build</span>
                </div>
              </Reveal>
              <TextReveal
                lines={["Don't", 'build', <span key="a" className="text-gold-300/90">alone.</span>]}
                className="headline-xl mt-8 uppercase"
                delay={0.1}
              />
              <Reveal delay={0.4}>
                <p className="lead mt-9 max-w-[34rem] text-muted">
                  FNDRS connects founders, builders and ambitious people around what they&rsquo;re building, what they can do and who
                  they&rsquo;re looking for.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <div className="mt-10 flex flex-col gap-3 xs:flex-row">
                  <ButtonLink href="/early-access" size="lg" arrow>
                    Join FNDRS
                  </ButtonLink>
                  <ButtonLink href="/product" size="lg" variant="secondary">
                    Explore the product
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.25} y={60}>
              <ScreenStack center="welcomeEn" left="discoverTop" right="discoverFeed" priority />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ STATEMENT */}
      <section className="border-y hairline bg-ink-900 py-24 sm:py-32">
        <Container wide>
          <Reveal>
            <p className="max-w-[22ch] text-[clamp(2rem,1.2rem+3.4vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.04em]">
              Ideas are everywhere. <span className="text-subtle">The right people aren&rsquo;t.</span>
            </p>
          </Reveal>
          <div className="mt-14 grid gap-10 border-t hairline pt-10 md:grid-cols-3">
            {[
              ['Find', 'People who complement what you can do — not just people who do the same thing.'],
              ['Match', 'Relevance first. A few people worth talking to beat a thousand connections.'],
              ['Build', 'From first message to shared progress, everything stays in one place.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.08}>
                <p className="font-display text-[0.8125rem] tracking-[0.3em] text-gold-400">{t.toUpperCase()}</p>
                <p className="mt-4 max-w-[32ch] text-[1.0625rem] leading-relaxed text-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------ SMART MATCH */}
      <Section>
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Smart Match"
              size="lg"
              title={
                <>
                  Not more connections.
                  <br />
                  <span className="text-subtle">Better ones.</span>
                </>
              }
              lead="Smart Match compares skills, roles, industries, stage and what each person is looking for — and tells you why someone fits. No follower counts, no endless feed of strangers."
            />
            <Reveal delay={0.1} className="mt-10">
              <ArrowLink href="/smart-match">Explore Smart Match</ArrowLink>
            </Reveal>
          </div>
          {/* The real fit-score row from the app, and the two questions behind it. */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <ProductScreenshot screen="discoverFeed" region={{ y: 0.73, h: 0.135 }} frame="flat" sizes="(min-width: 1024px) 520px, 92vw" />
            <p className="label-mono mt-4 text-faint">In the app · fit score with its reason</p>
            <ul className="mt-8 border-t hairline">
              {['Has what you are looking for', 'Is looking for what you bring'].map((t) => (
                <li key={t} className="flex items-center gap-3 border-b hairline py-4 text-[1rem] text-ivory/90">
                  <Check aria-hidden className="size-4 shrink-0 text-gold-500" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.875rem] text-subtle">Both sides have to fit.</p>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------------------------ PRODUCT REALITY */}
      <ProductReality />

      {/* ------------------------------------------------ DISCOVER */}
      <Section tone="raised">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Discover" title="Discover more than people." lead="One tab for everything around what you build." />
            <RevealGroup as="ul" className="mt-12 border-t hairline">
              {DISCOVER.map(([label, href]) => (
                <RevealItem as="li" key={label} className="border-b hairline">
                  <Link href={href} className="group flex items-center justify-between gap-6 py-5 sm:py-6">
                    <span className="text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-bold tracking-[-0.035em] text-ivory/85 transition-colors duration-300 group-hover:text-ivory">
                      {label}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-6 text-faint transition-all duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-400"
                    />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-10">
              <ArrowLink href="/discover">Explore Discover</ArrowLink>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pl-8">
            <ParallaxScreen screen="discoverTop" className="mx-auto max-w-[22rem] lg:mt-24" rotate={2} />
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ COMMUNITY */}
      <Section>
        <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Community"
              title="Post with a purpose."
              lead="Every post on FNDRS has a job: share an update, mark a milestone, or say exactly who you are looking for — so the right people can answer."
            />
            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-subtle">
              {['Update', 'Milestone', 'Looking for'].map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-faint">/</span>}
                  <span className={t === 'Looking for' ? 'text-ivory' : undefined}>{t}</span>
                </span>
              ))}
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <ArrowLink href="/community">Explore Community</ArrowLink>
            </Reveal>
          </div>
          <RevealGroup className="space-y-3">
            <RevealItem>
              <PostSchematic
                kind="looking_for"
                highlight
                author="Founder · Logistics SaaS"
                body="Looking for a technical co-founder. React Native + Node, ideally based in CET. We have ten design partners lined up and need someone to own the product with us."
                tags={['Technical co-founder', 'SaaS', 'Remote']}
              />
            </RevealItem>
            <RevealItem>
              <PostSchematic kind="milestone" author="Designer · Health" body="Our MVP is live with the first pilot clinic. Eight months from first sketch to first patient." />
            </RevealItem>
            <RevealItem>
              <PostSchematic kind="update" author="Developer · Climate" body="Week 6: rebuilt our data pipeline, cut onboarding to under two minutes. Next up: user interviews." />
            </RevealItem>
            <p className="label-mono pt-2 text-center text-faint">Illustrative example posts</p>
          </RevealGroup>
        </div>
      </Section>

      {/* ------------------------------------------------ COPILOT */}
      <Section tone="raised">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.1} className="order-2 lg:order-1 lg:col-span-5">
            <ProductScreenshot screen="discoverFeed" region={{ y: 0.225, h: 0.125 }} frame="flat" sizes="(min-width: 1024px) 520px, 92vw" />
            <p className="label-mono mt-4 text-faint">In the app today · not activated yet</p>
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <Eyebrow>FNDRS Copilot</Eyebrow>
                <StatusBadge status="dev" />
              </div>
              <h2 className="headline-md mt-6">Built to know what you&rsquo;re building.</h2>
              <p className="lead mt-6 max-w-xl text-muted">
                Copilot is being built to help you structure ideas, plan next steps and think through decisions — with the context of your
                profile and your network. It already has a place in the app; it isn&rsquo;t switched on yet.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <ArrowLink href="/copilot">Discover FNDRS Copilot</ArrowLink>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ AUDIENCES */}
      <Section>
        <SectionHeading
          eyebrow="Who it's for"
          title={
            <>
              Built for everyone
              <br />
              who builds.
            </>
          }
          className="mb-14"
        />
        <AudienceCards />
      </Section>

      {/* ------------------------------------------------ LOOP */}
      <Section tone="light">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="The loop" tone="light" title="From profile to progress." lead="Seven steps that feed into each other. The more you build, the better FNDRS gets at finding your people." />
          <Reveal>
            <ButtonLink href="/how-it-works" variant="dark" arrow>
              See how FNDRS works
            </ButtonLink>
          </Reveal>
        </div>
        <div className="mt-16 sm:mt-20">
          <ProductLoop />
        </div>
      </Section>

      {/* ------------------------------------------------ EARLY ACCESS */}
      <CTASection
        eyebrow="Early Access"
        title={
          <>
            FNDRS is being built.
          </>
        }
        body="And we're looking for the first people to build it with us — founders, builders, mentors and investors who want a better way to find each other."
        primary={{ href: '/early-access', label: 'Join Early Access' }}
        secondary={{ href: '/about', label: 'Why FNDRS exists' }}
      />
    </>
  );
}
