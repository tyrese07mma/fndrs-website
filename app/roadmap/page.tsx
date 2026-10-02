import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section } from '@/components/marketing/Section';
import { StatusBadge, type Status } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('roadmap');

const COLUMNS: { status: Status; title: string; note: string; items: [string, string][] }[] = [
  {
    status: 'live',
    title: 'In the app',
    note: 'Available in the early beta today.',
    items: [
      ['Profiles', 'Skills, industries, stage, looking for, open to, links.'],
      ['Smart Match', 'Fit score with reasons, filters, 25 free swipes a day.'],
      ['Discover', 'Startups, opportunities, events, communities, investors, mentors.'],
      ['Community feed', 'Updates, milestones, looking-for posts, questions and polls.'],
      ['Messaging', 'Conversations with matches, read receipts, message permissions.'],
      ['Startup pages', 'Stage, team, skills needed, upvotes.'],
      ['Challenges & XP', 'A weekly challenge, levels and a leaderboard.'],
      ['English & German', 'The full app in both languages.'],
    ],
  },
  {
    status: 'dev',
    title: 'In development',
    note: 'Being built right now.',
    items: [
      ['FNDRS Copilot', 'An assistant for structuring ideas, planning and writing, with your FNDRS context.'],
      ['Early access onboarding', 'Bringing the first members in, and learning from them.'],
    ],
  },
  {
    status: 'soon',
    title: 'Later',
    note: 'Planned, not scheduled.',
    items: [
      ['FNDRS Pro', 'Advanced tools for active builders. Pricing not final.'],
      ['Plans for teams and investors', 'Being explored. Nothing decided.'],
    ],
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        href="/roadmap"
        eyebrow="Roadmap"
        title={["What's live.", <span key="x" className="text-subtle">What's next.</span>]}
        lead="An honest view of FNDRS: what you can already use, what we are building now, and what comes later. Plans change — this page changes with them."
      />
      <Section tone="raised" className="!pt-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {COLUMNS.map((c, ci) => (
            <Reveal key={c.title} delay={ci * 0.08} className="rounded-[28px] border hairline bg-ink-950 p-6 sm:p-8">
              <StatusBadge status={c.status} label={c.title} />
              <p className="mt-4 text-[0.9375rem] text-subtle">{c.note}</p>
              <RevealGroup as="ul" className="mt-8 border-t hairline">
                {c.items.map(([t, d]) => (
                  <RevealItem as="li" key={t} className="border-b hairline py-5 last:border-0">
                    <p className="text-[1.0625rem] font-semibold">{t}</p>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-subtle">{d}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>
          ))}
        </div>
      </Section>
      <ProductNavigation items={['copilot', 'pro', 'earlyAccess', 'about']} />
    </>
  );
}
