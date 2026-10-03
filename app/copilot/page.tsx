import { Briefcase, CalendarDays, FileText, GitBranch, Lightbulb, PenLine, TrendingUp, UserRound, Users } from 'lucide-react';

import { cn } from '@/lib/cn';
import { CTASection } from '@/components/marketing/CTASection';
import { FAQ } from '@/components/marketing/FAQ';
import { HeroShell } from '@/components/marketing/PageHero';
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
  ['Structure ideas', 'Turn a messy idea into problem, audience, first test.'],
  ['Plan next steps', 'Break the next month into concrete, doable steps.'],
  ['Startup questions', 'Fundraising, hiring, pricing — the questions every early team has.'],
  ['Texts', 'First drafts of emails, posts and one-pagers.'],
  ['Profiles', 'Sharpen your FNDRS profile and what you are looking for.'],
  ['Sparring', 'A patient partner to argue an idea with at 1 a.m.'],
  ['Structure decisions', 'Lay out options, trade-offs and what you would need to know.'],
  ['Summarise information', 'Condense long threads, notes and documents.'],
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
      {/* ------------- Hero: status first, no phone. Only the real "not activated" row from the app. */}
      <HeroShell href="/copilot" className="pb-16 sm:pb-20">
        <div className="mt-12 grid gap-14 sm:mt-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal y={10}>
              <StatusBadge status="dev" label="In development · not available yet" className="text-[0.75rem] tracking-[0.18em]" />
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-10">
                <span className="block font-display text-[clamp(2.25rem,1.2rem+4.4vw,5.5rem)] uppercase leading-none tracking-[0.12em] text-ivory/90">Copilot</span>
                <span className="mt-6 block max-w-[20ch] text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em]">
                  Built to know what you&rsquo;re building.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="lead mt-7 max-w-[36rem] text-muted">
                FNDRS Copilot is the workspace we are building into FNDRS: a place to think, plan and write with the context of your profile and your network. It is in development and cannot
                be used yet.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <ButtonLink href="/early-access" size="lg" arrow>
                  Get Early Access
                </ButtonLink>
                <ButtonLink href="/roadmap" size="lg" variant="secondary">
                  See the roadmap
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.25} className="lg:col-span-5">
            <p className="label-mono mb-4 text-subtle">In the app today</p>
            <ProductScreenshot screen="discoverFeed" region={{ y: 0.225, h: 0.125 }} frame="flat" priority sizes="(min-width: 1024px) 440px, 92vw" />
            <p className="mt-4 text-[0.875rem] leading-relaxed text-subtle">Copilot already has its place in the Discover tab — marked as not activated, because it isn&rsquo;t.</p>
          </Reveal>
        </div>
      </HeroShell>

      {/* ------------- Today → coming: one line, two stops */}
      <Section tone="raised" space="tight">
        <div className="grid md:grid-cols-2">
          {[
            {
              status: 'live' as const,
              label: 'Today',
              title: 'Copilot has a home in the app.',
              text: 'You can already see Copilot in the Discover tab. It shows that it is not activated yet — because it isn’t. We would rather ship it right than ship it early.',
            },
            {
              status: 'dev' as const,
              label: 'Coming to FNDRS',
              title: 'An assistant that knows your context.',
              text: 'What we are building toward: answers that start from your profile, your startup and your network on FNDRS — not from a blank page.',
            },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="relative border-t hairline-strong pb-2 pt-8 md:pr-12 md:last:pl-12 md:last:pr-0">
              <span
                aria-hidden
                className={cn('absolute left-0 top-0 size-2.5 -translate-y-1/2 rounded-full', i === 0 ? 'bg-[#5aa981]' : 'border border-[#7c97c7] bg-ink-900')}
              />
              <StatusBadge status={s.status} label={s.label} />
              <h2 className="mt-5 text-[1.625rem] font-bold leading-tight tracking-[-0.03em]">{s.title}</h2>
              <p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-muted">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------- Scope as a table: what, how, status */}
      <Section space="tight">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="What it should help with" title="Thinking work, not magic." size="sm" />
          <Reveal>
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-subtle">This is the scope we are designing Copilot for. Everything on this list is planned — none of it is live yet.</p>
          </Reveal>
        </div>
        <RevealGroup as="ul" className="mt-12 border-t hairline-strong">
          {CAPABILITIES.map(([t, d]) => (
            <RevealItem as="li" key={t} className="grid gap-1 border-b hairline py-5 sm:grid-cols-12 sm:items-baseline sm:gap-6">
              <p className="text-[1.0625rem] font-semibold sm:col-span-4">{t}</p>
              <p className="text-[0.9375rem] leading-relaxed text-subtle sm:col-span-6">{d}</p>
              <p className="hidden text-right font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint sm:col-span-2 sm:block">Planned</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------- Prompt starters */}
      <Section tone="raised">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Designed prompt starters"
              title="Six ways to start a conversation."
              lead="These starters are already designed into the Copilot screen. They show the kind of help we have in mind: concrete, tied to your situation, useful the same day."
              size="sm"
              action={<StatusBadge status="dev" />}
            />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
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
        variant="compact"
        title="Be there when it switches on."
        body="Join Early Access to follow Copilot as it takes shape — and tell us what you would want it to do."
        primary={{ href: '/early-access', label: 'Join Early Access' }}
        secondary={{ href: '/roadmap', label: 'Roadmap' }}
      />
      <ProductNavigation items={['smartMatch', 'pro', 'roadmap', 'discover']} />
    </>
  );
}
