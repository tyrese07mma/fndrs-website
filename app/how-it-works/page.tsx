import { Handshake, Star, X } from 'lucide-react';

import { CTASection } from '@/components/marketing/CTASection';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { StepList, type Step } from '@/components/marketing/StepList';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { PostSchematic, ProfileSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/primitives';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('howItWorks');

const LOOKING = ['Technical co-founder', 'Business co-founder', 'Engineers', 'Designers', 'Growth / marketing', 'Investors', 'Mentors', 'Advisors', 'Early customers'];

const STEPS: Step[] = [
  {
    title: 'Create your account',
    body: <p>Name, email, a password with at least twelve characters. That is all it takes to get in — the app says “set up in two minutes”, and it means it.</p>,
    details: ['Available in English and German', 'Sign in again any time with your email'],
    media: <ProductScreenshot screen="signUp" crop={0.78} className="mx-auto max-w-[20rem]" />,
  },
  {
    title: 'Build your profile',
    body: (
      <>
        <p>Add your role, skills, industries, stage and city, a headline and a short bio. This is what other people see — and what Smart Match reads.</p>
        <p>Not done yet? The app keeps a short checklist of what is missing.</p>
      </>
    ),
    link: { href: '/profiles', label: 'What goes into a profile' },
    media: <ProfileSchematic className="mx-auto max-w-sm" />,
  },
  {
    title: 'Tell FNDRS what you’re looking for',
    body: <p>The most important step. Pick who you need and what you are open to. It turns your profile from a description into an invitation.</p>,
    media: (
      <div className="rounded-[28px] border hairline bg-ink-900 p-6">
        <p className="label-mono text-subtle">Looking for</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {LOOKING.map((t, i) => (
            <span key={t} className={i === 0 || i === 3 ? 'inline-flex h-8 items-center rounded-full bg-ivory px-3.5 text-[0.8125rem] font-semibold text-ink-950' : 'inline-flex h-8 items-center rounded-full border hairline-strong px-3.5 text-[0.8125rem] text-ivory/75'}>
              {t}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: 'Discover relevant people',
    body: <p>Explore founders, startups, communities, events, mentors, investors and opportunities. Discover also shows founders who fit you, with a fit score.</p>,
    link: { href: '/discover', label: 'Explore Discover' },
    media: <ProductScreenshot screen="discoverTop" className="mx-auto max-w-[20rem]" />,
  },
  {
    title: 'Smart Match',
    body: <p>Every day, Smart Match shows you people who fit in both directions: they have what you are looking for, and they are looking for what you bring. Each with the reasons why.</p>,
    details: ['25 free swipes per day', 'Filter by role, stage, industry and minimum fit', 'Revisit people you skipped'],
    link: { href: '/smart-match', label: 'How Smart Match works' },
    media: <ProductScreenshot screen="smartMatch" className="mx-auto max-w-[20rem]" />,
  },
  {
    title: 'Connect',
    body: <p>Pass, superlike or connect. When both sides connect, it is a match. You can also follow people to see their progress without matching.</p>,
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
        <p>A match opens a conversation in your inbox. Because you both see why you were matched, the first message is easy: start with what you could build together.</p>
        <p>You decide who can message you — everyone, or only your matches.</p>
      </>
    ),
    details: ['Direct messages with read receipts', 'Message people from their profile or a looking-for post'],
  },
  {
    title: 'Build',
    body: (
      <>
        <p>This is the part FNDRS cannot do for you — and the reason it exists. A call, a weekend prototype, a first customer, a new team.</p>
        <p>Give what you are building a startup page, link your team, and say which skills you still need.</p>
      </>
    ),
    link: { href: '/startups', label: 'Startup Profiles' },
  },
  {
    title: 'Share progress',
    body: <p>Post updates and milestones while you build. It keeps your network close, shows momentum — and attracts the next people you need.</p>,
    link: { href: '/community', label: 'Post with a purpose' },
    media: <PostSchematic kind="milestone" author="Founder · Health" body="Our MVP is live with the first pilot clinic. Eight months from first sketch to first patient." />,
  },
  {
    title: 'Grow your network',
    body: (
      <>
        <p>Join communities, go to events, follow people, complete the weekly challenge. Every connection makes the next match more relevant.</p>
        <p>And when you are further along, meet investors and mentors through people who already know you.</p>
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
        title={['From sign-up', 'to shipping,', <span key="x" className="text-subtle">in ten steps.</span>]}
        lead="This is the whole path — from creating an account to growing a network that keeps finding you the right people. Read it top to bottom, or jump to the step you are curious about."
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
      <div className="border-y hairline bg-ink-900/60">
        <Container wide>
          <ol className="grid grid-cols-2 gap-px py-2 sm:grid-cols-5">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <a href={`#step-${String(i + 1).padStart(2, '0')}`} className="flex items-baseline gap-3 rounded-xl px-3 py-3 text-[0.875rem] text-muted transition-colors hover:bg-white/[0.04] hover:text-ivory">
                  <span className="font-mono text-[0.6875rem] text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <span className="truncate">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </div>
      <StepList steps={STEPS} />
      <CTASection
        eyebrow="Step 01"
        title="Start where everyone starts."
        body="Request early access and set up your profile in a couple of minutes."
        secondary={{ href: '/faq', label: 'Read the FAQ' }}
      />
      <ProductNavigation items={['forFounders', 'forBuilders', 'forInvestors', 'forMentors']} title="Find your path" />
    </>
  );
}
