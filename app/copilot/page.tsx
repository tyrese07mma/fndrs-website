import { Briefcase, CalendarDays, FileText, GitBranch, Lightbulb, ListChecks, MessagesSquare, PenLine, Scale, ScrollText, TrendingUp, UserRound, Users } from 'lucide-react';

import { CTASection } from '@/components/marketing/CTASection';
import { FAQ } from '@/components/marketing/FAQ';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { CopilotPrompts } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('copilot');

const CAPABILITIES = [
  { icon: Lightbulb, t: 'Structure ideas', d: 'Turn a messy idea into problem, audience, first test.' },
  { icon: ListChecks, t: 'Plan next steps', d: 'Break the next month into concrete, doable steps.' },
  { icon: MessagesSquare, t: 'Startup questions', d: 'Fundraising, hiring, pricing — the questions every early team has.' },
  { icon: PenLine, t: 'Texts', d: 'First drafts of emails, posts and one-pagers.' },
  { icon: UserRound, t: 'Profiles', d: 'Sharpen your FNDRS profile and what you are looking for.' },
  { icon: Users, t: 'Sparring', d: 'A patient partner to argue an idea with at 1 a.m.' },
  { icon: Scale, t: 'Structure decisions', d: 'Lay out options, trade-offs and what you would need to know.' },
  { icon: ScrollText, t: 'Summarise information', d: 'Condense long threads, notes and documents.' },
];

const PROMPTS = [
  { icon: PenLine, title: 'Draft an investor email', prompt: 'Draft a short warm-intro email to the best-fit investor for my startup.' },
  { icon: Users, title: 'Find a co-founder', prompt: 'Who are the three strongest co-founder candidates for me right now, and why?' },
  { icon: TrendingUp, title: 'Structure my pitch deck', prompt: 'Give me a slide-by-slide structure for my pitch deck.' },
  { icon: Lightbulb, title: 'Brainstorm ideas', prompt: 'Brainstorm three startup ideas in my industries worth testing this month.' },
  { icon: Briefcase, title: 'Plan my first hires', prompt: 'Build me a 90-day hiring plan for my stage.' },
  { icon: CalendarDays, title: 'Which events to attend', prompt: 'Which upcoming events should I attend and how do I make the most of them?' },
];

export default function CopilotPage() {
  return (
    <>
      <PageHero
        href="/copilot"
        eyebrow="FNDRS Copilot"
        title={['A second brain', 'for building.']}
        lead="FNDRS Copilot is the workspace we are building into FNDRS: a place to think, plan and write with the context of your profile and your network. It is in development and cannot be used yet."
        aside={<StatusBadge status="dev" />}
        actions={
          <>
            <ButtonLink href="/early-access" size="lg" arrow>
              Get Early Access
            </ButtonLink>
            <ButtonLink href="/roadmap" size="lg" variant="secondary">
              See the roadmap
            </ButtonLink>
          </>
        }
        media={<ProductScreenshot screen="discoverFeed" crop={0.4} priority className="mx-auto max-w-[24rem]" caption="Copilot in the app today: not activated yet" />}
      />

      {/* ------------- Honest status */}
      <Section tone="raised">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-[26px] border hairline bg-ink-950 p-8 sm:p-10">
            <StatusBadge status="live" label="Today" />
            <h2 className="mt-6 text-[1.75rem] font-bold tracking-[-0.03em]">Copilot has a home in the app.</h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted">
              You can already see Copilot in the Discover tab. It shows that it is not activated yet — because it isn&rsquo;t. We would rather ship it right than ship it early.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[26px] border border-[#7c97c7]/25 bg-[#7c97c7]/[0.05] p-8 sm:p-10">
            <StatusBadge status="dev" label="Coming to FNDRS" />
            <h2 className="mt-6 text-[1.75rem] font-bold tracking-[-0.03em]">An assistant that knows your context.</h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-muted">
              What we are building toward: answers that start from your profile, your startup and your network on FNDRS — not from a blank page.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ------------- Capabilities */}
      <Section>
        <SectionHeading
          eyebrow="What it should help with"
          title="Thinking work, not magic."
          lead="This is the scope we are designing Copilot for. Everything on this list is planned — none of it is live yet."
          className="mb-16"
        />
        <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-[26px] border hairline bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map(({ icon: Icon, t, d }) => (
            <RevealItem as="li" key={t} className="flex flex-col bg-ink-950 p-7">
              <div className="flex items-center justify-between">
                <Icon className="size-5 text-ivory/85" strokeWidth={1.75} aria-hidden />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">Planned</span>
              </div>
              <p className="mt-10 text-[1.125rem] font-semibold">{t}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-subtle">{d}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------- Prompt starters */}
      <Section tone="raised">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="Designed prompt starters"
            title="Six ways to start a conversation."
            lead="These starters are already designed into the Copilot screen. They show the kind of help we have in mind: concrete, tied to your situation, useful the same day."
            action={<StatusBadge status="dev" />}
          />
          <Reveal>
            <CopilotPrompts prompts={PROMPTS} />
          </Reveal>
        </div>
      </Section>

      {/* ------------- Principles */}
      <Section tone="light">
        <SectionHeading eyebrow="Principles" tone="light" title="How we think about AI in FNDRS." className="mb-14" />
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: GitBranch, t: 'People first', d: 'Copilot should help you find and work with people — never replace them.' },
            { icon: FileText, t: 'Honest about limits', d: '“Copilot can make mistakes — double-check important facts.” That line is already in the design.' },
            { icon: UserRound, t: 'Your context, your control', d: 'It should use what you chose to share on FNDRS, and you can start fresh any time.' },
            { icon: Lightbulb, t: 'No hype', d: 'We will describe what it does when it does it. Until then, this page says “in development”.' },
          ].map(({ icon: Icon, t, d }) => (
            <Reveal key={t} className="border-t border-ink/15 pt-8">
              <Icon className="size-6 text-gold-700" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-6 text-[1.375rem] font-bold tracking-[-0.025em]">{t}</h3>
              <p className="mt-2 text-[0.9875rem] leading-relaxed text-ink-muted">{d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <FAQ
        eyebrow="FAQ · Copilot"
        title="Copilot, answered."
        items={[
          { q: 'Can I use Copilot today?', a: 'Not yet. Copilot is visible in the app, marked as not activated. We will announce it here and in the app when it is ready.' },
          { q: 'Will Copilot cost extra?', a: 'That has not been decided. Pricing for FNDRS Pro and any AI features will be announced before launch.' },
          {
            q: 'Will Copilot read my messages?',
            a: 'The exact permissions model is still being defined. FNDRS Copilot will be designed around explicit user context and transparent controls rather than silently reading private conversations. Before it goes live, we will explain in the app and in our privacy policy exactly what it can access.',
          },
          {
            q: 'What will Copilot know about me?',
            a: 'The idea is that Copilot starts from what you chose to share on FNDRS, such as your profile and your startup, so you do not have to explain your situation from scratch. What it uses, and how you control that, will be clear before launch.',
          },
          { q: 'Does Copilot give investment or legal advice?', a: 'No. It is meant to help you think and write. For investment, legal or tax decisions, talk to a qualified professional.' },
          { q: 'Can I help shape Copilot?', a: 'Yes. Tell us what you would want it to do through the contact page or as an Early Access member.' },
        ]}
      />
      <CTASection
        eyebrow="Copilot"
        title="Be there when it switches on."
        body="Join Early Access to follow Copilot as it takes shape — and tell us what you would want it to do."
        primary={{ href: '/early-access', label: 'Join Early Access' }}
        secondary={{ href: '/roadmap', label: 'Roadmap' }}
      />
      <ProductNavigation items={['smartMatch', 'pro', 'roadmap', 'discover']} />
    </>
  );
}
