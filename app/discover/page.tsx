import Link from 'next/link';
import { ArrowRight, BookOpen, Briefcase, CalendarDays, GraduationCap, Search, TrendingUp, Trophy, Users, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { EditorialSection } from '@/components/marketing/EditorialSection';
import { HeroShell } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section } from '@/components/marketing/Section';
import { UseCaseGrid } from '@/components/marketing/UseCaseGrid';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { StartupSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { Container, Eyebrow, StatusBadge, type Status } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem, TextReveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';
import type { ScreenKey } from '@/lib/screens';

export const metadata = pageMetadata('discover');

/** Three slices of the real app around Discover, side by side (same height, so they line up). */
const BAND: { screen: ScreenKey; region: { y: number; h: number }; label: string }[] = [
  { screen: 'discover', region: { y: 0, h: 0.6 }, label: 'Search · Startups · Events · Spaces' },
  { screen: 'launchStartup', region: { y: 0, h: 0.6 }, label: 'Launch a startup' },
  { screen: 'hostEvent', region: { y: 0, h: 0.6 }, label: 'Host an event' },
];

/** The five areas that work in the app and fill up as members join. */
const AREAS: {
  id: string;
  label: string;
  icon: LucideIcon;
  title: string;
  body: ReactNode;
  status: Status;
  statusLabel?: string;
  itemsLabel?: string;
  items: string[];
  note?: ReactNode;
  links: { href: string; label: string }[];
}[] = [
  {
    id: 'communities',
    label: 'Communities',
    icon: Users,
    title: 'Spaces by topic, not by follower count.',
    body: (
      <>
        <p>Communities group people around a theme — an industry, a craft, a stage. Join the ones that match your work, see who else is there and post to the people who actually care.</p>
        <p className="text-subtle">In the app, communities are called spaces. They fill up as early members join and start them.</p>
      </>
    ),
    status: 'beta',
    statusLabel: 'In the app · early beta',
    items: ['Browse and join spaces by topic', 'See who else is a member', 'Post to the people in a space', 'Public and private spaces'],
    links: [{ href: '/community', label: 'Community & Feed' }],
  },
  {
    id: 'events',
    label: 'Events',
    icon: CalendarDays,
    title: 'Pitch nights and meetups.',
    body: (
      <>
        <p>Events lists pitch nights, meetups and online sessions — with date, place or link, and who is going. RSVP in a tap. Members can host events too.</p>
        <p className="text-subtle">Events work in the app today. Listings grow as members host founder meetups, pitch nights and demo days.</p>
      </>
    ),
    status: 'beta',
    statusLabel: 'In the app · early beta',
    items: ['Pitch nights, meetups and online sessions', 'RSVP and see who is going', 'Host your own event'],
    links: [
      { href: '/how-it-works', label: 'How FNDRS works' },
      { href: '/for-mentors', label: 'Hosting as a mentor' },
    ],
  },
  {
    id: 'mentors',
    label: 'Mentors',
    icon: GraduationCap,
    title: 'Book one-on-ones with people who have done it.',
    body: (
      <>
        <p>The Mentors section is for people who want to give back: operators, repeat founders, specialists. See what they know, what they are open to, and reach out when your question matches their experience.</p>
        <p className="text-subtle">The mentor section is live in the app. It grows as experienced operators and founders join during the beta.</p>
      </>
    ),
    status: 'beta',
    statusLabel: 'In the app · early beta',
    items: ['Mentor profiles with their expertise', 'Book a one-on-one session in the app'],
    links: [{ href: '/for-mentors', label: 'For Mentors' }],
  },
  {
    id: 'investors',
    label: 'Investors',
    icon: TrendingUp,
    title: 'Personal introductions, not cold inboxes.',
    body: (
      <>
        <p>The Investors section shows angels and funds on FNDRS and what they focus on. The idea is simple: meet investors through people who already know you, with your profile and progress as context.</p>
        <p className="text-subtle">FNDRS does not broker investments and makes no promises about funding. Requesting a warm introduction is planned as part of FNDRS Pro, which is not available yet.</p>
      </>
    ),
    status: 'beta',
    statusLabel: 'In the app · early beta',
    items: ['Investor profiles with firm and check size', 'Filter investors by what they focus on'],
    note: (
      <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
        Warm intro requests <StatusBadge status="unavailable" />
      </span>
    ),
    links: [
      { href: '/for-investors', label: 'For Investors' },
      { href: '/startups', label: 'Startup Profiles' },
    ],
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    icon: Briefcase,
    title: 'Jobs, co-founder searches and more.',
    body: (
      <>
        <p>Opportunities collects concrete asks in one place — from &ldquo;looking for a co-founder&rdquo; to open roles and partnerships. Anyone can post one; anyone can answer.</p>
        <p className="text-subtle">Concrete asks, posted by members. Listings grow as more teams join the beta.</p>
      </>
    ),
    status: 'live',
    itemsLabel: 'Opportunity types',
    items: ['Co-founder', 'Hiring', 'Partnership', 'Investment', 'Freelance', 'Accelerator'],
    links: [
      { href: '/community', label: 'Looking-for posts' },
      { href: '/for-builders', label: 'For Builders' },
    ],
  },
];

const SECTIONS = [
  { id: 'founders', label: 'Founders' },
  { id: 'startups', label: 'Startups' },
  ...AREAS.map((a) => ({ id: a.id, label: a.label })),
];

export default function DiscoverPage() {
  return (
    <>
      {/* ------------- Hero: wide headline, then a band of real Discover screens cut by the edge */}
      <HeroShell href="/discover">
        <div className="mt-12 sm:mt-14">
          <Reveal y={10} className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <Eyebrow>Discover</Eyebrow>
            <StatusBadge status="live" label="In the app · early beta" />
          </Reveal>
          <TextReveal
            lines={['One place for the people,', 'ideas and opportunities', <span key="x" className="text-subtle">around what you&rsquo;re building.</span>]}
            className="headline-lg mt-8"
            delay={0.05}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <Reveal delay={0.25} className="lg:col-span-6">
              <p className="lead max-w-[38rem] text-muted">
                Smart Match brings people to you. Discover is where you go looking yourself — across founders, startups, communities, events, mentors, investors and opportunities.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="lg:col-span-6 lg:justify-self-end">
              <ButtonLink href="#founders" size="lg" variant="secondary">
                Start the tour
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <RevealGroup
          as="ul"
          className="no-scrollbar -mx-5 -mb-20 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:-mx-8 sm:mt-16 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:-mb-28"
        >
          {BAND.map((b, i) => (
            <RevealItem as="li" key={b.screen} className="w-[72vw] max-w-[20rem] shrink-0 snap-center md:w-auto md:max-w-none">
              <p className="label-mono mb-4 text-subtle">{b.label}</p>
              <ProductScreenshot screen={b.screen} region={b.region} frame="flat" priority={i === 0} sizes="(min-width: 768px) 32vw, 72vw" />
            </RevealItem>
          ))}
        </RevealGroup>
      </HeroShell>

      <nav aria-label="Discover sections" className="sticky top-[var(--nav-h)] z-30 border-y hairline bg-ink-950/95">
        <ul className="no-scrollbar mx-auto flex max-w-[96rem] overflow-x-auto px-5 sm:px-8 lg:px-12">
          {SECTIONS.map((s) => (
            <li key={s.id} className="first:*:pl-0">
              <a
                href={`#${s.id}`}
                className="inline-flex h-12 items-center whitespace-nowrap px-3.5 text-[0.8125rem] font-medium text-muted transition-colors hover:text-ivory"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ------------- Founders: the real fit-score row, large */}
      <EditorialSection
        id="founders"
        label="Discover Founders"
        title="Founders who fit what you are building."
        links={[
          { href: '/profiles', label: 'Founder Profiles' },
          { href: '/smart-match', label: 'Smart Match' },
        ]}
        media={
          <Reveal>
            <ProductScreenshot screen="profile" region={{ y: 0.31, h: 0.13 }} frame="flat" sizes="(min-width: 1024px) 720px, 92vw" />
            <p className="label-mono mt-4 leading-relaxed text-faint">In the app · role, stage and what someone is open to, at a glance</p>
          </Reveal>
        }
      >
        <p>Discover surfaces founders that fit you right on the main tab — with a fit score and the one reason that matters most, like &ldquo;Has the skills you are looking for&rdquo;.</p>
        <p>Open any profile to see what someone is building, what they can do and who they are looking for. If it clicks, connect.</p>
      </EditorialSection>

      <EditorialSection
        id="startups"
        label="Discover Startups"
        title="Launches and projects, early."
        flip
        links={[
          { href: '/startups', label: 'Startup Profiles' },
          { href: '/for-builders', label: 'For Builders' },
        ]}
        media={<StartupSchematic className="mx-auto max-w-md" />}
      >
        <p>Every startup on FNDRS has its own page: what it does, its industry and stage, the team and the skills it still needs. Popular and new startups show up in Discover.</p>
        <p>For builders it is a list of places to contribute. For investors and mentors it is a window into what is being built before it is everywhere.</p>
      </EditorialSection>

      {/* ------------- Five areas as a ruled status board */}
      <section aria-labelledby="areas-title" className="border-t hairline py-20 sm:py-24">
        <Container wide>
          <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="areas-title" className="headline-md lg:col-span-7">
              Five more areas. <span className="text-subtle">In the app, filling up.</span>
            </h2>
            <p className="lead text-muted lg:col-span-5">These sections work in the app today. They grow as early members join, host and post during the beta.</p>
          </Reveal>
          <ul className="mt-14 border-t hairline-strong">
            {AREAS.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.id} id={a.id} className="scroll-mt-14 border-b hairline">
                  <Reveal className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 lg:col-span-3 lg:block">
                      <p className="flex items-center gap-3 text-[1.0625rem] font-semibold">
                        <Icon className="size-[18px] text-gold-500" strokeWidth={1.75} aria-hidden />
                        {a.label}
                      </p>
                      <StatusBadge status={a.status} label={a.statusLabel} className="lg:mt-4" />
                    </div>
                    <div className="lg:col-span-5">
                      <h3 className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-bold leading-[1.1] tracking-[-0.03em]">{a.title}</h3>
                      <div className="mt-4 space-y-3 text-[1rem] leading-relaxed text-muted">{a.body}</div>
                      <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                        {a.links.map((l) => (
                          <li key={l.href + l.label}>
                            <Link href={l.href} className="group inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-ivory/90 hover:text-ivory">
                              {l.label}
                              <ArrowRight aria-hidden className="size-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-4">
                      <p className="label-mono text-faint">{a.itemsLabel ?? 'In the app today'}</p>
                      <ul className="mt-4 space-y-2.5">
                        {a.items.map((item) => (
                          <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-ivory/85">
                            <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-gold-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      {a.note && <div className="mt-5 text-[0.875rem] text-subtle">{a.note}</div>}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ------------- Also in Discover */}
      <Section tone="raised" space="tight">
        <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 className="headline-sm lg:col-span-6">Also in Discover.</h2>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <ProductScreenshot screen="search" region={{ y: 0, h: 0.3 }} frame="flat" sizes="(min-width: 1024px) 480px, 92vw" />
            <p className="label-mono mt-3 text-faint">Search with trending topics</p>
          </Reveal>
        </div>
        <UseCaseGrid
          items={[
            { icon: Search, title: 'Search everything', text: 'One search across founders, startups, communities and events.' },
            { icon: BookOpen, title: 'Knowledge', text: 'Guides and playbooks for the questions every early team runs into.' },
            { icon: Trophy, title: 'Challenges', text: 'A weekly challenge with small, concrete steps. Complete them to collect XP.', href: '/profiles#xp', linkLabel: 'How XP works' },
          ]}
        />
      </Section>

      {/* ------------- Discover vs. Smart Match: two statements, one rule between them */}
      <Section>
        <h2 className="label-mono text-subtle">Discover vs. Smart Match</h2>
        <div className="mt-6 grid border-t hairline-strong md:grid-cols-2">
          <Reveal className="py-10 md:pr-12">
            <p className="label-mono text-subtle">Discover</p>
            <p className="headline-md mt-5">Browse when you&rsquo;re curious.</p>
            <p className="lead mt-5 max-w-md text-muted">Open-ended exploration across everything on FNDRS, whenever you feel like looking.</p>
          </Reveal>
          <Reveal delay={0.08} className="border-t hairline-strong py-10 md:border-l md:border-t-0 md:pl-12">
            <p className="label-mono text-gold-400">Smart Match</p>
            <p className="headline-md mt-5">Match when you&rsquo;re ready.</p>
            <p className="lead mt-5 max-w-md text-muted">A short daily list of people who fit. Most people use both.</p>
            <ButtonLink href="/smart-match" arrow className="mt-8">
              Explore Smart Match
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <ProductNavigation items={['startups', 'profiles', 'forInvestors', 'community']} />
    </>
  );
}
