import { CTASection } from '@/components/marketing/CTASection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section } from '@/components/marketing/Section';
import { StatusBadge, type Status } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('roadmap');

interface Item {
  title: string;
  text: string;
  status: Status;
}

const COLUMNS: { key: string; title: string; note: string; items: Item[] }[] = [
  {
    key: 'now',
    title: 'Now',
    note: 'In the app today, in early beta.',
    items: [
      { title: 'Founder & builder profiles', text: 'Skills, industries, stage, what you are looking for and what you are open to.', status: 'live' },
      { title: 'Smart Match', text: 'Two-way fit scoring with reasons, filters and 25 free swipes a day. Being tested with early members.', status: 'beta' },
      { title: 'Discover', text: 'Startups, opportunities, events, spaces, mentors and investors in one tab, plus search.', status: 'live' },
      { title: 'Community posts', text: 'Updates, milestones, looking-for posts, questions and polls.', status: 'live' },
      { title: 'Messaging', text: 'Conversations with your matches, read receipts and message permissions.', status: 'live' },
      { title: 'Startup pages', text: 'Stage, team, skills needed and upvotes.', status: 'live' },
      { title: 'Early Access', text: 'Letting the first founders, builders, mentors and investors in.', status: 'beta' },
    ],
  },
  {
    key: 'next',
    title: 'Next',
    note: 'What we are working towards next.',
    items: [
      { title: 'FNDRS Copilot', text: 'An assistant for structuring ideas, planning and writing, with the context of your FNDRS profile.', status: 'dev' },
      { title: 'Expanded Smart Match', text: 'More signals and better explanations of why two people fit.', status: 'planned' },
      { title: 'Events & meetups', text: 'Events already work in the app. Next is filling them with real meetups and demo nights.', status: 'planned' },
      { title: 'Better discovery filters', text: 'Finer filters for people, startups and opportunities in Discover.', status: 'planned' },
      { title: 'Startup page improvements', text: 'Richer progress timelines and clearer open roles.', status: 'planned' },
      { title: 'Community discovery', text: 'Easier ways to find the spaces and conversations that matter to you.', status: 'planned' },
    ],
  },
  {
    key: 'later',
    title: 'Later',
    note: 'Ideas we intend to build. Not scheduled.',
    items: [
      { title: 'Founder workspaces', text: 'A place for a new team to organise what it is building.', status: 'planned' },
      { title: 'Team collaboration', text: 'Tools for working together once a match becomes a team.', status: 'planned' },
      { title: 'Investor discovery', text: 'Better ways for investors and founders to find each other with context.', status: 'planned' },
      { title: 'Mentor network', text: 'A structured way to offer and find mentoring on FNDRS.', status: 'planned' },
      { title: 'FNDRS Pro', text: 'Advanced tools for active builders. Pricing will be announced before launch.', status: 'unavailable' },
      { title: 'Ecosystem integrations', text: 'Connections to the tools and communities founders already use.', status: 'planned' },
    ],
  },
];

const LEGEND: Status[] = ['live', 'beta', 'dev', 'planned', 'unavailable'];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        href="/roadmap"
        eyebrow="Roadmap"
        title={["What's live.", <span key="x" className="text-subtle">What's next.</span>]}
        lead="An honest view of FNDRS: what you can use today, what we are working towards and what comes later. There are no release dates on purpose. Order and scope change as we learn from early members."
        aside={
          <ul className="flex flex-wrap gap-2" aria-label="Status legend">
            {LEGEND.map((s) => (
              <li key={s}>
                <StatusBadge status={s} />
              </li>
            ))}
          </ul>
        }
      />
      <Section tone="raised" className="!pt-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {COLUMNS.map((c, ci) => (
            <Reveal key={c.key} delay={ci * 0.08} as="section" className="rounded-[28px] border hairline bg-ink-950 p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-[1.125rem] tracking-[0.3em] text-ivory">{c.title.toUpperCase()}</h2>
                <span className="font-mono text-[0.75rem] text-faint">0{ci + 1}</span>
              </div>
              <p className="mt-3 text-[0.9375rem] text-subtle">{c.note}</p>
              <RevealGroup as="ul" className="mt-8 border-t hairline">
                {c.items.map((item) => (
                  <RevealItem as="li" key={item.title} className="border-b hairline py-5 last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                      <h3 className="text-[1.0625rem] font-semibold">{item.title}</h3>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-subtle">{item.text}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection
        eyebrow="Shape the roadmap"
        title="Tell us what to build next."
        body="Early members decide a lot of what moves from Later to Now. Join Early Access or send us your feedback."
        secondary={{ href: '/contact', label: 'Send feedback' }}
      />
      <ProductNavigation items={['copilot', 'pro', 'smartMatch', 'about']} />
    </>
  );
}
