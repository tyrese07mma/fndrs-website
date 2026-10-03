import { Briefcase, Compass, Flag, Handshake, Layers, MapPin, Search, Target, UserRound } from 'lucide-react';

import { CTASection } from '@/components/marketing/CTASection';
import { FAQ } from '@/components/marketing/FAQ';
import { FeatureSection } from '@/components/marketing/FeatureSection';
import { HeroShell } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { MatchFlow } from '@/components/product/MatchFlow';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { ProfileSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow, StatusBadge } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem, TextReveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('smartMatch');

const SIGNALS = [
  { icon: Layers, name: 'Skills', text: 'What you can actually do — engineering, design, sales, fundraising, growth.' },
  { icon: UserRound, name: 'Role', text: 'Founder, co-founder seeker, operator, mentor, investor.' },
  { icon: Briefcase, name: 'Industry', text: 'Where you build. Shared industries are the strongest base signal.' },
  { icon: MapPin, name: 'Location', text: 'Same city counts — for teams that want to sit in one room.' },
  { icon: Flag, name: 'Startup stage', text: 'Idea, MVP, launched, pre-seed, seed and beyond.' },
  { icon: Target, name: 'Goals', text: 'What you are trying to get done next, in your own words.' },
  { icon: Search, name: 'Looking for', text: 'Technical or business co-founder, engineers, designers, investors, mentors.' },
  { icon: Handshake, name: 'Open to', text: 'Co-founding, advising, joining a team — what you would say yes to.' },
  { icon: Compass, name: 'Interests', text: 'The topics and spaces you follow around your work.' },
];

// Facts from the app, shown as a spec line under the headline.
const SPEC = [
  ['Two-way', 'fit check for every pair'],
  ['9', 'profile signals'],
  ['25', 'free swipes a day'],
  ['Reasons', 'with every match'],
] as const;

// Annotations on the real Smart Match screen (top = position on the cropped screen).
const NOTES = [
  { top: '8%', text: '25 free swipes a day' },
  { top: '49%', text: 'All caught up — revisit people you skipped' },
  { top: '89%', text: 'Pass · Superlike · Connect' },
];

const FAQS = [
  {
    q: 'Is Smart Match a ranking of how good someone is?',
    a: 'No. Smart Match estimates how relevant two people are to each other — based on what each of them is looking for and what the other brings. It says nothing about anyone’s quality as a founder or builder.',
  },
  {
    q: 'What does the fit score mean?',
    a: 'It is a relevance estimate for one pair of people. It goes up when you share industries, when each side has what the other is looking for, and when stage, city or openness to co-founding line up. Every score comes with the reasons behind it.',
  },
  {
    q: 'How many people can I see per day?',
    a: 'On the free plan you get 25 Smart Match swipes per day. When you have seen everyone who currently fits, the app tells you so — and you can revisit people you skipped.',
  },
  {
    q: 'Can I filter matches?',
    a: 'Yes. You can narrow Smart Match by role, startup stage, industry and a minimum fit score.',
  },
  {
    q: 'Who can see me in Smart Match?',
    a: 'Only people with a discoverable profile appear in Smart Match, and you can switch discoverability off in your settings. You also decide whether everyone or only your matches can message you.',
  },
  {
    q: 'What happens after I connect?',
    a: 'If the other person connects with you too, it is a match and a conversation opens in your inbox. A superlike signals stronger interest before that.',
  },
];

export default function SmartMatchPage() {
  return (
    <>
      {/* ------------- Hero: the real screen rises out of the hero's bottom edge, annotated. */}
      <HeroShell href="/smart-match" glow className="border-b hairline">
        <div className="mt-12 grid gap-14 sm:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="pb-4 lg:col-span-7 lg:pb-24">
            <Reveal y={10} className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Eyebrow>Smart Match</Eyebrow>
              <StatusBadge status="live" label="In the app · early beta" />
            </Reveal>
            <TextReveal
              lines={['Connections based', 'on relevance,', <span key="x" className="text-subtle">not follower counts.</span>]}
              className="mt-8 text-[clamp(2.5rem,1.3rem+4.2vw,5.5rem)] font-bold leading-[0.95] tracking-[-0.045em]"
              delay={0.05}
            />
            <Reveal delay={0.25}>
              <p className="lead mt-8 max-w-[36rem] text-muted">
                Smart Match reads what you can do, what you are building and who you are looking for — and shows you the people for whom the same is true in reverse.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <dl className="mt-10 grid max-w-[42rem] grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {SPEC.map(([v, l]) => (
                  <div key={l} className="flex flex-col-reverse border-t hairline-strong pt-4">
                    <dt className="mt-1.5 text-[0.8125rem] leading-snug text-subtle">{l}</dt>
                    <dd className="font-mono text-[1.0625rem] font-medium tracking-[-0.02em] text-ivory">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
                <ButtonLink href="/early-access" size="lg" arrow>
                  Create your profile
                </ButtonLink>
                <ButtonLink href="#how" size="lg" variant="secondary">
                  How matching works
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={60} className="relative self-end lg:col-span-5">
            <div className="relative mx-auto -mb-8 w-full max-w-[20rem] sm:max-w-[22rem] lg:mr-0 xl:max-w-[21rem] 2xl:max-w-[23rem]">
              <ProductScreenshot screen="smartMatch" crop={0.92} fade={false} priority sizes="(min-width: 1024px) 380px, 80vw" />
              {NOTES.map((n) => (
                <p key={n.text} aria-hidden className="absolute right-full mr-6 hidden w-40 -translate-y-1/2 text-right xl:block" style={{ top: n.top }}>
                  <span className="label-mono leading-[1.6] text-subtle">{n.text}</span>
                  <span className="absolute left-full top-1/2 h-px w-11 bg-gold-500/45" />
                  <span className="absolute left-[calc(100%+2.75rem)] top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500" />
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </HeroShell>

      {/* ------------- Signals: a reference list, not a card grid */}
      <Section tone="raised">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="What it reads"
              title="Nine signals. Depending on your profile."
              lead="Smart Match only uses what people choose to put on their profile. The more specific you are, the better the matches get."
              size="sm"
              className="lg:sticky lg:top-32"
            />
          </div>
          <RevealGroup as="ul" className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
            {SIGNALS.map((s) => {
              const Icon = s.icon;
              return (
                <RevealItem as="li" key={s.name} className="flex gap-4 border-t hairline py-6">
                  <Icon className="mt-1 size-[18px] shrink-0 text-gold-500" strokeWidth={1.75} aria-hidden />
                  <div>
                    <p className="text-[1.0625rem] font-semibold">{s.name}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-subtle">{s.text}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------- Visualisation */}
      <Section id="how">
        <SectionHeading
          eyebrow="How matching works"
          title="Both sides have to fit."
          lead="Most networks ask one question: who might you know? Smart Match asks two — does this person have what you are looking for, and are they looking for what you bring?"
          className="mb-16"
        />
        <MatchFlow />
      </Section>

      {/* ------------- Steps */}
      <Section tone="raised" space="tight">
        <h2 className="headline-sm">From profile to match, in four steps.</h2>
        <RevealGroup as="ol" className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Tell FNDRS what you need', 'Add your skills, industries and stage, and say who you are looking for and what you are open to.'],
            ['Two-way check', 'For every candidate, Smart Match checks fit in both directions — then adds shared industry, stage and city.'],
            ['Ranked, with reasons', 'You see a fit score and short reasons like “Has the skills you are looking for” or “Both building in SaaS”.'],
            ['You decide', 'Pass, superlike or connect — the same three controls as in the app. When both sides connect, it is a match and a conversation opens.'],
          ].map(([t, d], i) => (
            <RevealItem as="li" key={t} className="border-t hairline-strong pt-5">
              <span className="font-mono text-[0.8125rem] text-gold-500">0{i + 1}</span>
              <p className="mt-4 text-[1.1875rem] font-semibold tracking-[-0.02em]">{t}</p>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-subtle">{d}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ------------- Why relevance */}
      <Section tone="light">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Why relevance matters" tone="light" title="Reach is easy. Fit is rare." />
          </div>
          <div className="space-y-10 lg:col-span-7">
            {[
              ['Time is the scarce resource.', 'Early teams cannot afford fifty coffee chats to find one co-founder. Showing fewer, better-fitting people respects that.'],
              ['Complement beats similarity.', 'A developer rarely needs another developer. Smart Match looks for people who complete your skills, not people who mirror them.'],
              ['Context makes the first message easy.', 'When both people can see why they were matched, the conversation starts at “here is what we could build” — not “who are you?”.'],
            ].map(([t, d]) => (
              <Reveal key={t} className="border-t border-ink/10 pt-8">
                <h3 className="text-[1.5rem] font-bold tracking-[-0.025em]">{t}</h3>
                <p className="lead mt-3 text-ink-muted">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------- Profiles behind matches */}
      <FeatureSection
        eyebrow="Profiles behind every match"
        title="A match is only as good as the profile behind it."
        body={
          <>
            <p>Smart Match has nothing to work with but what people share. That is why FNDRS profiles are built around skills, stage and intent instead of job titles.</p>
            <p>The app shows you what is still missing from your profile — a photo, a headline, three skills, who you are looking for — because each of those makes your matches sharper.</p>
          </>
        }
        link={{ href: '/profiles', label: 'Explore Founder Profiles' }}
        media={<ProfileSchematic className="mx-auto max-w-md" />}
      />

      {/* ------------- Match to conversation */}
      <Section tone="raised">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <p className="text-[clamp(3rem,2rem+5vw,7rem)] font-bold leading-[0.9] tracking-[-0.05em]">
              It&rsquo;s a <span className="text-gold-300">match.</span>
            </p>
            <p className="label-mono mt-6 text-subtle">What the app says when both sides connect</p>
          </Reveal>
          <SectionHeading
            eyebrow="From match to conversation"
            title="The match is the start, not the goal."
            lead="A mutual connect opens a conversation in your inbox — with the context of why you were matched right there. From there it is up to you: a call, a weekend prototype, a team."
            size="sm"
            action={
              <ButtonLink href="/how-it-works" variant="secondary" arrow>
                The full journey
              </ButtonLink>
            }
          />
        </div>
      </Section>

      <FAQ items={FAQS} title="Smart Match, answered." eyebrow="FAQ · Smart Match" />

      <CTASection
        eyebrow="Smart Match"
        title={
          <>
            Your next co-founder
            <br />
            needs a profile to find.
          </>
        }
        body="Join Early Access, build your profile and let Smart Match do the first filter for you."
        primary={{ href: '/early-access', label: 'Create your profile' }}
        secondary={{ href: '/profiles', label: 'What goes into a profile' }}
      />
      <ProductNavigation
        items={['profiles', 'discover', 'howItWorks', 'forFounders']}
        notes={{ discover: 'Browse beyond your daily matches.', forFounders: 'How founders use Smart Match to build a team.' }}
      />
    </>
  );
}
