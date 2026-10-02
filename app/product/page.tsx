import Link from 'next/link';
import { ArrowRight, Compass, House, MessageCircle, Sparkles, UserRound } from 'lucide-react';

import { CTASection } from '@/components/marketing/CTASection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { ScreenStack } from '@/components/product/ScreenStack';
import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge, type Status } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';
import { pages, type PageKey } from '@/lib/pages';

export const metadata = pageMetadata('product');

const MODULES: { key: PageKey; status: Status; what: string; feeds: string }[] = [
  {
    key: 'smartMatch',
    status: 'live',
    what: 'A daily set of people whose skills, goals and stage fit yours — each with a fit score and the reasons behind it.',
    feeds: 'Reads your profile. Opens conversations.',
  },
  {
    key: 'discover',
    status: 'live',
    what: 'Startups, opportunities, events, communities, investors, mentors, knowledge and weekly challenges in one tab.',
    feeds: 'Search across everything on FNDRS.',
  },
  {
    key: 'community',
    status: 'live',
    what: 'A feed where every post has a purpose: Update, Milestone or Looking for — plus questions and polls.',
    feeds: 'Turns progress into conversations.',
  },
  {
    key: 'profiles',
    status: 'live',
    what: 'Skills, industries, stage, what you are looking for and what you are open to — the signals behind every match.',
    feeds: 'The input for Smart Match and Discover.',
  },
  {
    key: 'startups',
    status: 'live',
    what: 'A page for what you are building: description, industry, stage, team, the skills you still need and your progress.',
    feeds: 'Linked to founders and their posts.',
  },
  {
    key: 'copilot',
    status: 'dev',
    what: 'An assistant to structure ideas, plan next steps and think through decisions — with context from your profile.',
    feeds: 'Visible in the app, not activated yet.',
  },
  {
    key: 'pro',
    status: 'soon',
    what: 'Advanced tools for people who are actively building. The core of FNDRS stays free.',
    feeds: 'Paid plans are not available yet.',
  },
];

const TABS = [
  { icon: House, name: 'Start', text: 'Your feed: updates, milestones and looking-for posts from people around your work.' },
  { icon: Sparkles, name: 'Match', text: 'Smart Match. Pass, superlike or connect — 25 free swipes a day.' },
  { icon: Compass, name: 'Discover', text: 'Startups, opportunities, events, communities, investors, mentors and more.' },
  { icon: MessageCircle, name: 'Inbox', text: 'Conversations with your matches and the people you connect with.' },
  { icon: UserRound, name: 'You', text: 'Your profile, startups, progress and settings — including who can message you.' },
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        href="/product"
        eyebrow="Product"
        title={['One app for', 'everything around', 'what you build.']}
        lead="FNDRS is a mobile app with five tabs and one idea: help you find the people you should be building with — and keep everything that follows in one place."
        actions={
          <>
            <ButtonLink href="/early-access" size="lg" arrow>
              Join FNDRS
            </ButtonLink>
            <ButtonLink href="/how-it-works" size="lg" variant="secondary">
              How it works
            </ButtonLink>
          </>
        }
        media={<ScreenStack center="discoverTop" left="welcomeEn" right="smartMatch" priority />}
      />

      {/* ---------------- Modules */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="The product"
          title="Seven parts. One network."
          lead="Each part of FNDRS has its own page here. Start wherever you are curious — they all link back into each other."
        />
        <RevealGroup as="ul" className="mt-16 border-t hairline">
          {MODULES.map((m, i) => {
            const p = pages[m.key];
            const Icon = p.icon;
            return (
              <RevealItem as="li" key={m.key} className="border-b hairline">
                <Link href={p.href} className="group grid items-start gap-5 py-8 transition-colors sm:py-10 lg:grid-cols-12 lg:gap-8">
                  <span className="font-mono text-[0.8125rem] text-faint lg:col-span-1 lg:pt-2">0{i + 1}</span>
                  <span className="flex items-center gap-4 lg:col-span-4">
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-ink-700/80 transition-colors group-hover:bg-ivory group-hover:text-ink-950">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold tracking-[-0.03em]">{p.label}</span>
                  </span>
                  <span className="lg:col-span-5">
                    <span className="block text-[1rem] leading-relaxed text-muted">{m.what}</span>
                    <span className="mt-2 block font-mono text-[0.75rem] uppercase tracking-[0.12em] text-faint">{m.feeds}</span>
                  </span>
                  <span className="flex items-center justify-between gap-4 lg:col-span-2 lg:flex-col lg:items-end lg:pt-2">
                    <StatusBadge status={m.status} />
                    <ArrowRight aria-hidden className="size-5 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-ivory" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ---------------- How the parts connect */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="How it fits together"
            title="Your profile is the engine."
            lead="Everything on FNDRS starts with what you tell it: what you can do, what you are building and who you are looking for. That one profile powers matching, discovery and every conversation after."
          />
          <Reveal>
            <ol className="relative space-y-3">
              {[
                ['Profile', 'Skills, role, industries, stage, looking for, open to.'],
                ['Smart Match + Discover', 'Use your profile to rank people, startups and opportunities by relevance.'],
                ['Inbox', 'A match or a looking-for post becomes a direct conversation.'],
                ['Community', 'Updates and milestones show what happened next.'],
                ['Back to your profile', 'Your startups, posts and progress make the next match better.'],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5 rounded-[22px] border hairline bg-ink-900 p-5 sm:p-6">
                  <span className="font-mono text-[0.8125rem] text-gold-500">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block text-[1.0625rem] font-semibold">{t}</span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-subtle">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- Tabs */}
      <Section tone="light">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.8fr] lg:gap-24">
          <div>
            <SectionHeading eyebrow="Inside the app" tone="light" title="Five tabs. Nothing you don't need." />
            <RevealGroup as="ul" className="mt-12 space-y-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/10">
              {TABS.map((t) => {
                const Icon = t.icon;
                return (
                  <RevealItem as="li" key={t.name} className="flex gap-5 bg-paper-50 p-5 sm:p-6">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-paper-200 text-ink">
                      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[1.0625rem] font-semibold">{t.name}</span>
                      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-muted">{t.text}</span>
                    </span>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
          <Reveal>
            <ProductScreenshot screen="smartMatch" tone="light" className="mx-auto max-w-[22rem]" caption="The tab bar, as it is in the app" />
          </Reveal>
        </div>
      </Section>

      <CTASection
        eyebrow="Get started"
        title="See it for yourself."
        body="FNDRS is in early beta. Request access and we'll bring you in as the network grows."
        secondary={{ href: '/roadmap', label: "What's live, what's next" }}
      />
      <ProductNavigation items={['smartMatch', 'discover', 'community', 'howItWorks']} />
    </>
  );
}
