import Link from 'next/link';
import { ArrowRight, BarChart3, HelpCircle } from 'lucide-react';

import { CTASection } from '@/components/marketing/CTASection';
import { FeedTabs } from '@/components/marketing/FeedTabs';
import { HeroShell } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { PostSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow, StatusBadge } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem, TextReveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('community');

const TYPES = [
  {
    name: 'Update',
    text: 'Share progress and thoughts while you build: what shipped, what you learned, what is next. Updates keep the people around you close without a newsletter.',
    post: <PostSchematic kind="update" author="Developer · Climate" body="Week 6: rebuilt our data pipeline and cut onboarding to under two minutes. Next up: ten user interviews." tags={['Build in public']} />,
  },
  {
    name: 'Milestone',
    text: 'Mark the moments that matter: a launch, a first customer, a pilot, a funding round. Milestones stay on your profile, so your progress is visible to everyone you meet.',
    post: <PostSchematic kind="milestone" author="Founder · Health" body="Our MVP is live with the first pilot clinic. Eight months from first sketch to first patient." />,
  },
  {
    name: 'Looking for',
    text: 'Say exactly who you need — a co-founder, a developer, an investor, a mentor. Looking-for posts are the fastest way from “I need someone” to a conversation.',
    post: (
      <PostSchematic
        kind="looking_for"
        highlight
        author="Founder · Logistics"
        body="Looking for a technical co-founder. React Native + Node, CET time zone. Ten design partners lined up."
        tags={['Technical co-founder', 'SaaS']}
      />
    ),
  },
];

const ROLES = [
  { title: 'Co-Founders', text: 'Technical or business — the person to build the company with.', href: '/for-founders', linkLabel: 'For Founders' },
  { title: 'Developers', text: 'Engineers for a first version, a rebuild or a hard problem.', href: '/for-builders', linkLabel: 'For Builders' },
  { title: 'Designers', text: 'Product, brand and UX — from first sketch to launch.', href: '/for-builders', linkLabel: 'For Builders' },
  { title: 'Investors', text: 'Angels and funds that back your stage and industry.', href: '/for-investors', linkLabel: 'For Investors' },
  { title: 'Mentors', text: 'People who have solved your exact problem before.', href: '/for-mentors', linkLabel: 'For Mentors' },
  { title: 'Team members', text: 'Marketing, sales, operations — the people who come next.', href: '/startups', linkLabel: 'Startup Profiles' },
];

export default function CommunityPage() {
  return (
    <>
      {/* ------------- Hero: editorial headline across the page, then the feed itself */}
      <HeroShell href="/community" className="pb-20 sm:pb-24">
        <div className="mt-12 sm:mt-14">
          <Reveal y={10} className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Eyebrow>Community</Eyebrow>
            <StatusBadge status="live" label="In the app · early beta" />
          </Reveal>
          <TextReveal lines={['Post with', <span key="x" className="sm:pl-[18%]">a purpose.</span>]} className="headline-xl mt-8" delay={0.05} />
          <div className="mt-12 grid gap-8 border-t hairline pt-8 lg:grid-cols-12 lg:items-start">
            <Reveal delay={0.25} className="lg:col-span-5">
              <p className="lead text-muted">The FNDRS feed isn&rsquo;t built for likes. Every post says what it is for — so the right people know when to answer.</p>
            </Reveal>
            <Reveal delay={0.3} className="flex flex-col gap-3 xs:flex-row lg:col-span-6 lg:col-start-7 lg:justify-end">
              <ButtonLink href="/early-access" size="lg" arrow>
                Join the community
              </ButtonLink>
              <ButtonLink href="#looking-for" size="lg" variant="secondary">
                About Looking for
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 sm:mt-24">
          <Reveal>
            <h2 className="headline-sm max-w-xl">
              Three post types. <span className="text-subtle">Pick the job, then write the post.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-14 lg:grid-cols-3 lg:gap-0">
            {TYPES.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08} className="flex flex-col lg:border-l lg:hairline lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0">
                <h3 className="text-[2rem] font-bold uppercase leading-none tracking-[-0.035em]">{t.name}</h3>
                <p className="mt-4 text-[1rem] leading-relaxed text-muted">{t.text}</p>
                <div className="mt-8 flex-1">{t.post}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex flex-wrap items-center gap-3 border-t hairline pt-8 text-[0.9375rem] text-muted">
            <HelpCircle className="size-4 text-subtle" aria-hidden />
            <span>Need a quick answer or a vote? Questions and polls work in the same feed.</span>
            <BarChart3 className="size-4 text-subtle" aria-hidden />
          </Reveal>
        </div>
      </HeroShell>

      {/* ------------- Looking for: a ruled list of who you can ask for */}
      <Section id="looking-for" tone="raised">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-32">
              <Eyebrow>Looking for</Eyebrow>
              <h2 className="headline-lg mt-6">
                Say who you need.
                <br />
                <span className="text-subtle">Out loud.</span>
              </h2>
              <p className="lead mt-8 text-muted">
                A looking-for post is a request with a clear answer. It tells the network what is missing on your team — and invites the people who have it to step forward.
              </p>
              <p className="lead mt-4 text-muted">
                It is also how many first conversations on FNDRS start: someone reads the post, opens your profile, and messages you with context.
              </p>
            </Reveal>
          </div>
          <RevealGroup as="ul" className="border-t hairline-strong lg:col-span-6 lg:col-start-7 lg:self-end">
            {ROLES.map((r) => (
              <RevealItem as="li" key={r.title} className="border-b hairline">
                <Link href={r.href} className="group grid gap-2 py-6 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-6">
                  <span className="text-[1.25rem] font-semibold tracking-[-0.02em]">{r.title}</span>
                  <span className="text-[0.9375rem] leading-relaxed text-muted">{r.text}</span>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.8125rem] font-semibold text-subtle transition-colors group-hover:text-ivory">
                    {r.linkLabel}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------- Posts → profiles → connections */}
      <Section tone="light">
        <SectionHeading
          eyebrow="Everything connects"
          tone="light"
          title="A post is a door to a person."
          lead="On FNDRS, nothing in the feed is anonymous or detached. Every post leads back to a profile, and every profile can lead to a conversation."
          className="mb-14"
        />
        <RevealGroup as="ol" className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Post', 'A milestone or a looking-for post shows up in the feed and in communities.'],
            ['Profile', 'One tap shows who wrote it — skills, startup, what they need.'],
            ['Connection', 'Follow to see their progress, or message them directly.'],
            ['Smart Match', 'What you post and engage with sharpens your profile — and your matches.'],
          ].map(([t, d], i, all) => (
            <RevealItem as="li" key={t} className="border-t border-ink/20 pt-6">
              <p className="flex items-center justify-between gap-4 text-[1.5rem] font-bold tracking-[-0.03em]">
                {t}
                {i < all.length - 1 && <ArrowRight aria-hidden className="size-5 text-ink-subtle" />}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{d}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/profiles" variant="dark" arrow>
            Explore Profiles
          </ButtonLink>
          <ButtonLink href="/smart-match" variant="secondary" className="border-ink/15 bg-transparent text-ink hover:border-ink/30 hover:bg-ink/[0.04]">
            Smart Match
          </ButtonLink>
        </Reveal>
      </Section>

      {/* ------------- Feeds: a working tab switcher instead of three boxes */}
      <Section space="tight">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Your feed" title="For you, following, trending." size="sm" />
            <Reveal className="mt-10">
              <FeedTabs />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ProductScreenshot screen="home" region={{ y: 0.375, h: 0.265 }} frame="flat" sizes="(min-width: 1024px) 600px, 92vw" />
            <p className="label-mono mt-4 leading-relaxed text-faint">The home tab in the app · “Hiring” starts a looking-for post</p>
          </Reveal>
        </div>
      </Section>

      <CTASection
        eyebrow="Community"
        title="Your first post could be your next team."
        body="Join FNDRS, write a looking-for post and see who answers."
        secondary={{ href: '/how-it-works', label: 'How FNDRS works' }}
      />
      <ProductNavigation items={['profiles', 'smartMatch', 'startups', 'discover']} />
    </>
  );
}
