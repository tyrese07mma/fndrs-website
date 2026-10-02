import { BarChart3, Code2, GraduationCap, HelpCircle, Megaphone, Palette, TrendingUp, Users, UsersRound } from 'lucide-react';

import { CTASection } from '@/components/marketing/CTASection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { UseCaseGrid } from '@/components/marketing/UseCaseGrid';
import { PostSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow, StatusBadge } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('community');

export default function CommunityPage() {
  return (
    <>
      <PageHero
        href="/community"
        eyebrow="Community"
        size="xl"
        title={['Post with', 'a purpose.']}
        lead="The FNDRS feed isn't built for likes. Every post says what it is for — so the right people know when to answer."
        aside={<StatusBadge status="live" label="In the app · early beta" />}
        actions={
          <>
            <ButtonLink href="/early-access" size="lg" arrow>
              Join the community
            </ButtonLink>
            <ButtonLink href="#looking-for" size="lg" variant="secondary">
              About Looking for
            </ButtonLink>
          </>
        }
      />

      {/* ------------- Three types */}
      <Section tone="raised">
        <SectionHeading eyebrow="Three post types" title="Pick the job. Then write the post." lead="When you post on FNDRS you choose what kind of post it is. That small choice makes the feed easier to read — and much easier to act on." />
        <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-6">
          {[
            {
              n: '01',
              name: 'Update',
              text: 'Share progress and thoughts while you build: what shipped, what you learned, what is next. Updates keep the people around you close without a newsletter.',
              post: <PostSchematic kind="update" author="Developer · Climate" body="Week 6: rebuilt our data pipeline and cut onboarding to under two minutes. Next up: ten user interviews." tags={['Build in public']} />,
            },
            {
              n: '02',
              name: 'Milestone',
              text: 'Mark the moments that matter: a launch, a first customer, a pilot, a funding round. Milestones stay on your profile, so your progress is visible to everyone you meet.',
              post: <PostSchematic kind="milestone" author="Founder · Health" body="Our MVP is live with the first pilot clinic. Eight months from first sketch to first patient." />,
            },
            {
              n: '03',
              name: 'Looking for',
              text: 'Say exactly who you need — a co-founder, a developer, an investor, a mentor. Looking-for posts are the fastest way from “I need someone” to a conversation.',
              post: <PostSchematic kind="looking_for" highlight author="Founder · Logistics" body="Looking for a technical co-founder. React Native + Node, CET time zone. Ten design partners lined up." tags={['Technical co-founder', 'SaaS']} />,
            },
          ].map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="flex flex-col">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[0.8125rem] text-gold-500">{t.n}</span>
                <h3 className="text-[2rem] font-bold uppercase tracking-[-0.035em]">{t.name}</h3>
              </div>
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
      </Section>

      {/* ------------- Looking for */}
      <Section id="looking-for">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
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
          <div className="lg:col-span-7">
            <UseCaseGrid
              columns={2}
              items={[
                { icon: UsersRound, title: 'Co-Founders', text: 'Technical or business — the person to build the company with.', href: '/for-founders', linkLabel: 'For Founders' },
                { icon: Code2, title: 'Developers', text: 'Engineers for a first version, a rebuild or a hard problem.', href: '/for-builders', linkLabel: 'For Builders' },
                { icon: Palette, title: 'Designers', text: 'Product, brand and UX — from first sketch to launch.', href: '/for-builders', linkLabel: 'For Builders' },
                { icon: TrendingUp, title: 'Investors', text: 'Angels and funds that back your stage and industry.', href: '/for-investors', linkLabel: 'For Investors' },
                { icon: GraduationCap, title: 'Mentors', text: 'People who have solved your exact problem before.', href: '/for-mentors', linkLabel: 'For Mentors' },
                { icon: Users, title: 'Team members', text: 'Marketing, sales, operations — the people who come next.', href: '/startups', linkLabel: 'Startup Profiles' },
              ]}
            />
          </div>
        </div>
      </Section>

      {/* ------------- Posts → profiles → connections */}
      <Section tone="light">
        <SectionHeading
          eyebrow="Everything connects"
          tone="light"
          title="A post is a door to a person."
          lead="On FNDRS, nothing in the feed is anonymous or detached. Every post leads back to a profile, and every profile can lead to a conversation."
          className="mb-16"
        />
        <RevealGroup as="ol" className="grid gap-3 md:grid-cols-4">
          {[
            ['Post', 'A milestone or a looking-for post shows up in the feed and in communities.'],
            ['Profile', 'One tap shows who wrote it — skills, startup, what they need.'],
            ['Connection', 'Follow to see their progress, or message them directly.'],
            ['Smart Match', 'What you post and engage with sharpens your profile — and your matches.'],
          ].map(([t, d], i) => (
            <RevealItem as="li" key={t} className="relative rounded-[24px] border border-ink/10 bg-paper-50 p-7">
              <span className="font-mono text-[0.8125rem] text-gold-700">0{i + 1}</span>
              <p className="mt-8 text-[1.375rem] font-bold tracking-[-0.025em]">{t}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{d}</p>
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

      {/* ------------- Feeds */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading eyebrow="Your feed" title="For you, following, trending." lead="Three views on the same network: what is relevant to you, what the people you follow are doing, and what is moving across FNDRS right now." />
          <Reveal className="grid gap-3">
            {[
              ['For you', 'A view of the network built around you.'],
              ['Following', 'Only the people and startups you follow — in order.'],
              ['Trending', 'What the wider FNDRS network is talking about.'],
            ].map(([t, d]) => (
              <div key={t} className="flex items-start gap-5 rounded-[22px] border hairline bg-ink-900 p-6">
                <Megaphone className="mt-1 size-5 shrink-0 text-gold-500" strokeWidth={1.75} aria-hidden />
                <div>
                  <p className="text-[1.125rem] font-semibold">{t}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-subtle">{d}</p>
                </div>
              </div>
            ))}
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
