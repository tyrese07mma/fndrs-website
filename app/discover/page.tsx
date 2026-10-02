import { BookOpen, Search, Trophy } from 'lucide-react';
import type { ReactNode } from 'react';

import { EditorialSection } from '@/components/marketing/EditorialSection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { UseCaseGrid } from '@/components/marketing/UseCaseGrid';
import { ParallaxScreen } from '@/components/product/ScreenStack';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { StartupSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('discover');

function WordList({ items, caption }: { items: string[]; caption: string }) {
  return (
    <figure className="rounded-[28px] border hairline bg-ink-900 p-6 sm:p-8">
      <RevealGroup as="ul" className="divide-y divide-white/[0.06]">
        {items.map((t) => (
          <RevealItem as="li" key={t} className="py-4 text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-semibold tracking-[-0.025em] text-ivory/85 first:pt-0 last:pb-0">
            {t}
          </RevealItem>
        ))}
      </RevealGroup>
      <figcaption className="label-mono mt-6 border-t hairline pt-5 text-faint">{caption}</figcaption>
    </figure>
  );
}

const CHAPTERS: {
  id: string;
  label: string;
  title: ReactNode;
  body: ReactNode;
  links: { href: string; label: string }[];
  media?: ReactNode;
}[] = [
  {
    id: 'founders',
    label: 'Founders',
    title: 'Founders who fit what you are building.',
    body: (
      <>
        <p>Discover surfaces founders that fit you right on the main tab — with a fit score and the one reason that matters most, like &ldquo;Has the skills you are looking for&rdquo;.</p>
        <p>Open any profile to see what someone is building, what they can do and who they are looking for. If it clicks, connect.</p>
      </>
    ),
    links: [
      { href: '/profiles', label: 'Founder Profiles' },
      { href: '/smart-match', label: 'Smart Match' },
    ],
    media: <ParallaxScreen screen="discoverFeed" className="mx-auto max-w-[22rem]" rotate={-1.5} caption="Discover · founders that fit you" />,
  },
  {
    id: 'startups',
    label: 'Startups',
    title: 'Launches and projects, early.',
    body: (
      <>
        <p>Every startup on FNDRS has its own page: what it does, its industry and stage, the team and the skills it still needs. Popular and new startups show up in Discover.</p>
        <p>For builders it is a list of places to contribute. For investors and mentors it is a window into what is being built before it is everywhere.</p>
      </>
    ),
    links: [
      { href: '/startups', label: 'Startup Profiles' },
      { href: '/for-builders', label: 'For Builders' },
    ],
    media: <StartupSchematic className="mx-auto max-w-md" />,
  },
  {
    id: 'communities',
    label: 'Communities',
    title: 'Spaces by topic, not by follower count.',
    body: (
      <>
        <p>Communities group people around a theme — an industry, a craft, a stage. Join the ones that match your work, see who else is there and post to the people who actually care.</p>
        <p>Communities have their own members, rules and posts, and they can be public or private.</p>
      </>
    ),
    links: [{ href: '/community', label: 'Community & Feed' }],
    media: <WordList items={['AI builders', 'Climate tech', 'Fintech', 'First-time founders', 'Design & product']} caption="Example community topics" />,
  },
  {
    id: 'events',
    label: 'Events',
    title: 'Pitch nights and meetups.',
    body: (
      <>
        <p>Events lists pitch nights, meetups and online sessions — with date, place or link, and who is going. RSVP in a tap.</p>
        <p>Members can host events too. The best introductions still happen in a room; FNDRS just helps you find the right room.</p>
      </>
    ),
    links: [
      { href: '/how-it-works', label: 'How FNDRS works' },
      { href: '/for-mentors', label: 'Hosting as a mentor' },
    ],
  },
  {
    id: 'mentors',
    label: 'Mentors',
    title: 'Book one-on-ones with people who have done it.',
    body: (
      <>
        <p>The Mentors section is for people who want to give back: operators, repeat founders, specialists. See what they know, what they are open to, and reach out when your question matches their experience.</p>
      </>
    ),
    links: [{ href: '/for-mentors', label: 'For Mentors' }],
  },
  {
    id: 'investors',
    label: 'Investors',
    title: 'Personal introductions, not cold inboxes.',
    body: (
      <>
        <p>The Investors section shows angels and funds on FNDRS and what they focus on. The idea is simple: meet investors through people who already know you, with your profile and progress as context.</p>
        <p>FNDRS does not broker investments and makes no promises about funding.</p>
      </>
    ),
    links: [
      { href: '/for-investors', label: 'For Investors' },
      { href: '/startups', label: 'Startup Profiles' },
    ],
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    title: 'Jobs, co-founder searches and more.',
    body: (
      <>
        <p>Opportunities collects concrete asks in one place — from &ldquo;looking for a co-founder&rdquo; to open roles and partnerships. Anyone can post one; anyone can answer.</p>
      </>
    ),
    links: [
      { href: '/community', label: 'Looking-for posts' },
      { href: '/for-builders', label: 'For Builders' },
    ],
    media: <WordList items={['Co-founder', 'Hiring', 'Partnership', 'Investment', 'Freelance', 'Accelerator']} caption="Opportunity types in the app" />,
  },
];

export default function DiscoverPage() {
  return (
    <>
      <PageHero
        href="/discover"
        eyebrow="Discover"
        title={['One place for the', 'people, ideas and', 'opportunities around', <span key="x" className="text-subtle">what you&rsquo;re building.</span>]}
        lead="Smart Match brings people to you. Discover is where you go looking yourself — across founders, startups, communities, events, mentors, investors and opportunities."
        aside={<StatusBadge status="live" label="In the app · early beta" />}
        actions={
          <ButtonLink href="#founders" size="lg" variant="secondary">
            Start the tour
          </ButtonLink>
        }
        media={<ProductScreenshot screen="discoverTop" priority className="mx-auto max-w-[22rem] lg:rotate-[2deg]" />}
      />

      <nav aria-label="Discover sections" className="sticky top-[var(--nav-h)] z-30 border-y hairline bg-ink-950/85 backdrop-blur-xl">
        <ul className="no-scrollbar mx-auto flex max-w-[96rem] gap-1 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12">
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[0.8125rem] font-medium text-muted transition-colors hover:bg-white/[0.05] hover:text-ivory">
                <span className="font-mono text-[0.6875rem] text-faint">0{i + 1}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        {CHAPTERS.map((c, i) => (
          <EditorialSection key={c.id} id={c.id} index={`0${i + 1}`} label={`Discover ${c.label}`} title={c.title} links={c.links} media={c.media} flip={i % 2 === 1}>
            {c.body}
          </EditorialSection>
        ))}
      </div>

      <Section tone="raised">
        <SectionHeading eyebrow="Also in Discover" title="The things that keep you moving." className="mb-14" />
        <UseCaseGrid
          items={[
            { icon: Search, title: 'Search everything', text: 'One search across founders, startups, communities and events.' },
            { icon: BookOpen, title: 'Knowledge', text: 'Guides and playbooks for the questions every early team runs into.' },
            { icon: Trophy, title: 'Challenges', text: 'A weekly challenge with small, concrete steps. Complete them to collect XP.', href: '/profiles#xp', linkLabel: 'How XP works' },
          ]}
        />
      </Section>

      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Discover vs. Smart Match"
            title="Browse when you're curious. Match when you're ready."
            lead="Discover is open-ended exploration. Smart Match is a short daily list of people who fit. Most people use both."
            action={
              <ButtonLink href="/smart-match" arrow>
                Explore Smart Match
              </ButtonLink>
            }
          />
          <Reveal>
            <ProductScreenshot screen="discoverGrid" crop={0.62} className="mx-auto max-w-[24rem]" />
          </Reveal>
        </div>
      </Section>

      <ProductNavigation items={['startups', 'profiles', 'forInvestors', 'community']} />
    </>
  );
}
