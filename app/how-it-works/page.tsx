import { Check, Handshake, Star, X } from 'lucide-react';

import { CTASection } from '@/components/marketing/CTASection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { StepList, type Step } from '@/components/marketing/StepList';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { PostSchematic, StartupSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/primitives';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('howItWorks');

const STEPS: Step[] = [
  {
    title: 'Build your profile',
    body: (
      <>
        <p>Create an account with your name, email and a password. Then add your role, skills, industries, stage and city, plus a headline and a short bio.</p>
        <p>
          The most important part: say who you are looking for and what you are open to. It turns your profile from a description into an invitation, and it is what Smart Match
          reads first.
        </p>
      </>
    ),
    details: ['Set up in a couple of minutes', 'A short checklist shows what is still missing', 'Available in English and German'],
    link: { href: '/profiles', label: 'What goes into a profile' },
    media: <ProductScreenshot screen="signUp" crop={0.78} className="mx-auto max-w-[20rem]" />,
  },
  {
    title: 'Discover',
    body: (
      <p>
        Explore what is happening around your work: founders, startups, opportunities, events, spaces, mentors and investors. Discover also shows founders who fit you, each with a
        fit score.
      </p>
    ),
    link: { href: '/discover', label: 'Explore Discover' },
    media: <ProductScreenshot screen="discoverTop" className="mx-auto max-w-[20rem]" />,
  },
  {
    title: 'Match',
    body: (
      <p>
        Every day, Smart Match shows you people who fit in both directions: they have what you are looking for, and they are looking for what you bring. Each suggestion comes with
        the reasons behind it.
      </p>
    ),
    details: ['25 free swipes per day', 'Filter by role, stage, industry and minimum fit', 'Revisit people you skipped'],
    link: { href: '/smart-match', label: 'How Smart Match works' },
    media: <ProductScreenshot screen="smartMatch" className="mx-auto max-w-[20rem]" />,
  },
  {
    title: 'Connect',
    body: (
      <p>
        Pass, superlike or connect. When both sides connect, it is a match. You can also follow people to keep up with their progress without matching.
      </p>
    ),
    media: (
      <div className="rounded-[28px] border hairline bg-ink-900 p-8 text-center">
        <div className="flex items-center justify-center gap-4">
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-[#e0705f]/30 text-[#e0705f]">
            <X className="size-6" aria-label="Pass" />
          </span>
          <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold-500/30 text-gold-500">
            <Star className="size-6" aria-label="Superlike" />
          </span>
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-ivory text-ink-950">
            <Handshake className="size-7" aria-label="Connect" />
          </span>
        </div>
        <p className="mt-8 text-[2.25rem] font-bold tracking-[-0.04em]">It&rsquo;s a match.</p>
      </div>
    ),
  },
  {
    title: 'Talk',
    body: (
      <>
        <p>Start a conversation with context. A match opens a chat in your inbox, and both of you can see the fit score and the reasons behind the match on each other&rsquo;s profile.</p>
        <p>So the first message starts with a reason to talk, not with &ldquo;who are you?&rdquo;.</p>
      </>
    ),
    details: ['Direct messages with read receipts', 'Message people from their profile or a looking-for post', 'You decide: messages from everyone, or only from matches'],
    media: (
      <div className="rounded-[28px] border hairline bg-ink-900 p-6 sm:p-7">
        <p className="label-mono text-subtle">Why you matched</p>
        <ul className="mt-5 space-y-3">
          {['Both building in SaaS', 'Has the skills you are looking for', 'Looking for what you bring', 'Open to co-founding'].map((r) => (
            <li key={r} className="flex gap-3 text-[0.9375rem] text-ivory/90">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-gold-500" />
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-[18px] border hairline bg-ink-800 px-4 py-3 text-[0.9375rem] text-muted">
          &ldquo;Saw you are looking for a developer for your SaaS idea. I have built two B2B dashboards, want to talk this week?&rdquo;
        </div>
        <p className="label-mono mt-5 text-faint">Illustrative example</p>
      </div>
    ),
  },
  {
    title: 'Build',
    body: (
      <>
        <p>Turn a good connection into real progress. Move from a match to a call, a shared idea, a weekend prototype, a project or a new team.</p>
        <p>When there is something to show, give it a startup page: what you are building, your stage, who is on the team and which skills you still need.</p>
      </>
    ),
    link: { href: '/startups', label: 'Startup Profiles' },
    media: <StartupSchematic className="mx-auto max-w-sm" />,
  },
  {
    title: 'Share progress',
    body: (
      <p>
        Post updates and milestones while you build. It keeps the people around you close, shows momentum, and is often how the next co-founder, hire or mentor notices you. When you
        need someone, say it with a looking-for post.
      </p>
    ),
    link: { href: '/community', label: 'Post with a purpose' },
    media: (
      <PostSchematic kind="milestone" author="Founder · Health" body="Our MVP is live with the first pilot clinic. Eight months from first sketch to first patient." />
    ),
  },
  {
    title: 'Grow your network',
    body: (
      <>
        <p>Join spaces, go to events, follow people and take on the weekly challenge. Every connection and every update makes your next match more relevant.</p>
        <p>As you get further, meet mentors and investors through people who already know you.</p>
      </>
    ),
    link: { href: '/for-mentors', label: 'Mentors on FNDRS' },
    media: <ProductScreenshot screen="welcomeIntros" crop={0.8} className="mx-auto max-w-[20rem]" />,
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        href="/how-it-works"
        eyebrow="How FNDRS works"
        title={['From profile', 'to progress,', <span key="x" className="text-subtle">in eight steps.</span>]}
        lead="The whole path, from creating your profile to a network that keeps finding you the right people. Read it top to bottom, or jump to the step you are curious about."
        actions={
          <>
            <ButtonLink href="/early-access" size="lg" arrow>
              Join FNDRS
            </ButtonLink>
            <ButtonLink href="#step-01" size="lg" variant="secondary">
              Start at step 01
            </ButtonLink>
          </>
        }
      />
      <nav aria-label="Steps" className="border-y hairline bg-ink-900/60">
        <Container wide>
          <ol className="grid grid-cols-2 gap-px py-2 sm:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <a
                  href={`#step-${String(i + 1).padStart(2, '0')}`}
                  className="flex items-baseline gap-3 rounded-xl px-3 py-3 text-[0.875rem] text-muted transition-colors hover:bg-white/[0.04] hover:text-ivory"
                >
                  <span className="font-mono text-[0.6875rem] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span className="truncate">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </nav>
      <StepList steps={STEPS} />
      <CTASection
        eyebrow="Step 01"
        title="Start where everyone starts."
        body="Request Early Access and set up your profile in a couple of minutes."
        secondary={{ href: '/faq', label: 'Read the FAQ' }}
      />
      <ProductNavigation items={['forFounders', 'forBuilders', 'forInvestors', 'forMentors']} title="Find your path" />
    </>
  );
}
