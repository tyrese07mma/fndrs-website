import { ArrowUp, Eye, Flag, Megaphone, PenLine, Users } from 'lucide-react';

import { CTASection } from '@/components/marketing/CTASection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { UseCaseGrid } from '@/components/marketing/UseCaseGrid';
import { ParallaxScreen } from '@/components/product/ScreenStack';
import { StartupSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('startups');

const STAGES = [
  ['Idea', 'Exploring a problem.'],
  ['MVP', 'A first version exists.'],
  ['Launched', 'Real users, real feedback.'],
  ['Pre-seed', 'Raising or raised a first round.'],
  ['Seed', 'Finding repeatable growth.'],
  ['Series A+', 'Scaling the team.'],
];

const PARTS: [string, string][] = [
  ['Name & description', 'What you are building, for whom, in one clear paragraph.'],
  ['Industry', 'So the right people find you in Discover and Smart Match.'],
  ['Stage', 'From idea to Series A — so expectations are clear from the start.'],
  ['Team & founders', 'Who is already on board, linked to their profiles.'],
  ['Skills needed', 'The gaps on the team, in the same words people use on their profiles.'],
  ['Open positions', 'Concrete roles you want to fill — or post them as an opportunity.'],
  ['Progress', 'Updates that show momentum over time.'],
  ['Milestones', 'Launches, pilots, first customers, funding — the moments that matter.'],
];

export default function StartupsPage() {
  return (
    <>
      <PageHero
        href="/startups"
        eyebrow="Startup Profiles"
        title={['Build in public.', <span key="x" className="text-subtle">Build together.</span>]}
        lead="Give what you are building its own page on FNDRS — so co-founders, builders, mentors and investors can see what it is, where it stands and what it still needs."
        aside={<StatusBadge status="live" label="In the app · early beta" />}
        actions={
          <>
            <ButtonLink href="/early-access" size="lg" arrow>
              Add your startup
            </ButtonLink>
            <ButtonLink href="/for-founders" size="lg" variant="secondary">
              For Founders
            </ButtonLink>
          </>
        }
        media={<StartupSchematic className="mx-auto max-w-md" />}
      />

      <Section tone="raised">
        <div className="grid gap-16 lg:grid-cols-12">
          <SectionHeading
            eyebrow="What a startup page shows"
            title="Everything someone needs to say “I'm in.”"
            size="sm"
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          />
          <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-[26px] border hairline bg-white/[0.06] sm:grid-cols-2 lg:col-span-8">
            {PARTS.map(([t, d], i) => (
              <RevealItem as="li" key={t} className="bg-ink-900 p-7">
                <span className="font-mono text-[0.75rem] text-faint">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-6 text-[1.125rem] font-semibold">{t}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-subtle">{d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------- Stages */}
      <Section>
        <SectionHeading eyebrow="Stages" title="Every stage belongs here." lead="FNDRS is not only for funded startups. An idea with a clear problem is a perfectly good reason to make a page and find the first people." className="mb-16" />
        <RevealGroup as="ol" className="relative grid grid-cols-2 gap-px overflow-hidden rounded-[26px] border hairline bg-white/[0.06] md:grid-cols-3 xl:grid-cols-6">
          {STAGES.map(([t, d], i) => (
            <RevealItem as="li" key={t} className="bg-ink-950 p-6 sm:p-7">
              <div className="flex gap-1" aria-hidden>
                {STAGES.map((_, j) => (
                  <span key={j} className={j <= i ? 'h-1 flex-1 rounded-full bg-gold-500' : 'h-1 flex-1 rounded-full bg-white/10'} />
                ))}
              </div>
              <p className="mt-8 text-[1.25rem] font-bold tracking-[-0.02em]">{t}</p>
              <p className="mt-1.5 text-[0.875rem] text-subtle">{d}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------- Presenting your project */}
      <Section tone="raised">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading eyebrow="Inside the network" title="How founders present their project on FNDRS." className="mb-12" />
            <UseCaseGrid
              columns={2}
              items={[
                { icon: PenLine, title: 'Create the page', text: 'Name, one-liner, industry and stage. Done in minutes.' },
                { icon: Users, title: 'Link your team', text: 'Show who is on the team, linked to their profiles.' },
                { icon: Megaphone, title: 'Say what you need', text: 'Skills needed and open roles — or a looking-for post.', href: '/community#looking-for', linkLabel: 'Looking-for posts' },
                { icon: Flag, title: 'Share progress', text: 'Updates and milestones show momentum over time.', href: '/community', linkLabel: 'Community' },
              ]}
            />
          </div>
          <Reveal className="lg:pt-24">
            <ParallaxScreen screen="discoverFeed" className="mx-auto max-w-[22rem]" caption="Popular startups appear in Discover" />
          </Reveal>
        </div>
      </Section>

      {/* ------------- Visibility */}
      <Section tone="light">
        <div className="grid gap-16 lg:grid-cols-3">
          {[
            { icon: ArrowUp, t: 'Upvotes', d: 'Members can upvote startups. Popular ones surface in Discover.' },
            { icon: Eye, t: 'Trending, new, mine', d: 'Browse startups by what is moving, what just launched, or what you are part of.' },
            { icon: Users, t: 'Seen by the right people', d: 'Industry and stage put your startup in front of people who care about exactly that.' },
          ].map(({ icon: Icon, t, d }) => (
            <Reveal key={t} className="border-t border-ink/15 pt-8">
              <Icon className="size-6 text-gold-700" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-6 text-[1.5rem] font-bold tracking-[-0.025em]">{t}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-ink-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Startups"
        title="Put your startup where builders look."
        body="Request Early Access. Bring your idea, your MVP or your seed-stage company."
        primary={{ href: '/early-access', label: 'Add your startup' }}
        secondary={{ href: '/for-investors', label: 'For Investors' }}
      />
      <ProductNavigation items={['profiles', 'community', 'forBuilders', 'forInvestors']} />
    </>
  );
}
