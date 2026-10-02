import { CTASection } from '@/components/marketing/CTASection';
import { FAQ } from '@/components/marketing/FAQ';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { ProfileSchematic } from '@/components/product/Schematics';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow, StatusBadge } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('profiles');

const FIELDS: [string, string, string][] = [
  ['Role', 'Who you are on FNDRS', 'Founder, co-founder seeker, operator, mentor or investor.'],
  ['Skills', 'What you can do', 'Engineering, design, product, sales, fundraising, growth — the raw material for matching.'],
  ['Industries', 'Where you build', 'Fintech, climate, health, AI, SaaS. Shared industries are the strongest match signal.'],
  ['Interests', 'What you follow', 'The topics and communities around your work.'],
  ['Startup stage', 'How far along you are', 'Idea, MVP, launched, pre-seed, seed, Series A and beyond.'],
  ['Looking for', 'Who you need', 'A technical or business co-founder, engineers, designers, investors, mentors, early customers.'],
  ['Open to', 'What you would say yes to', 'Co-founding, advising, joining a team, investing.'],
  ['Startups', 'What you are building', 'Linked startup pages with team, stage and progress.'],
  ['Posts & milestones', 'What has happened', 'Your updates and milestones, in order.'],
  ['Experience', 'Where you come from', 'Your headline, bio and links — website, LinkedIn, X.'],
];

export default function ProfilesPage() {
  return (
    <>
      <PageHero
        href="/profiles"
        eyebrow="Founder Profiles"
        size="xl"
        title={['More than', 'a résumé.']}
        lead="A CV tells people where you have been. A FNDRS profile tells them what you are building, what you can do and who you are looking for — the things that actually decide whether you should work together."
        aside={<StatusBadge status="live" label="In the app · early beta" />}
        actions={
          <ButtonLink href="/early-access" size="lg" arrow>
            Create your profile
          </ButtonLink>
        }
        media={<ProfileSchematic className="mx-auto max-w-md" />}
      />

      {/* ------------- Fields */}
      <Section tone="raised">
        <div className="grid gap-16 lg:grid-cols-12">
          <SectionHeading
            eyebrow="What a profile shows"
            title="Ten fields. Each one does a job."
            lead="Every field on a FNDRS profile is used somewhere — in Smart Match, in Discover search or in the context people see before they message you."
            size="sm"
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          />
          <RevealGroup as="ul" className="border-t hairline lg:col-span-8">
            {FIELDS.map(([name, sub, text], i) => (
              <RevealItem as="li" key={name} className="grid gap-2 border-b hairline py-6 sm:grid-cols-[3rem_1fr_1.4fr] sm:gap-6">
                <span className="font-mono text-[0.75rem] text-faint sm:pt-1.5">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-[1.25rem] font-semibold tracking-[-0.02em]">{name}</span>
                  <span className="mt-0.5 block text-[0.875rem] text-gold-400/80">{sub}</span>
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-muted sm:pt-1">{text}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------- Intent */}
      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="Intent first"
            title="Say what you're looking for. It changes everything."
            lead="“Looking for” and “Open to” are the two most important fields on FNDRS. They turn a profile from a description into an invitation — and they are what Smart Match uses to check if two people fit in both directions."
            action={
              <ButtonLink href="/smart-match" variant="secondary" arrow>
                How Smart Match uses it
              </ButtonLink>
            }
          />
          <Reveal>
            <div className="rounded-[30px] border hairline bg-ink-900 p-7 sm:p-9">
              <p className="label-mono text-subtle">Looking for</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Technical co-founder', 'Business co-founder', 'Engineers', 'Designers', 'Growth / marketing', 'Investors', 'Mentors', 'Advisors', 'Early customers'].map((t, i) => (
                  <span key={t} className={i < 2 ? 'inline-flex h-9 items-center rounded-full bg-ivory px-4 text-[0.875rem] font-semibold text-ink-950' : 'inline-flex h-9 items-center rounded-full border hairline-strong px-4 text-[0.875rem] text-ivory/80'}>
                    {t}
                  </span>
                ))}
              </div>
              <p className="label-mono mt-8 text-faint">The options in the app</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------- Profile strength */}
      <Section tone="light">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="Profile strength"
            tone="light"
            title="The app tells you what's missing."
            lead="A complete profile gets better matches. FNDRS shows a short checklist until yours is done:"
          />
          <RevealGroup as="ol" className="space-y-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/10">
            {['Add a profile photo', 'Write a headline', 'Tell your story in the bio', 'Add your city', 'Add at least three skills', 'Say who you are looking for', 'Link your website or LinkedIn'].map((t, i) => (
              <RevealItem as="li" key={t} className="flex items-center gap-4 bg-paper-50 px-6 py-4">
                <span className="font-mono text-[0.75rem] text-gold-700">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-[1rem] font-medium">{t}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ------------- XP / level / score */}
      <Section id="xp">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>XP · Level · Founder Score</Eyebrow>
              <h2 className="headline-md mt-6">Signals of activity. Not a grade.</h2>
              <p className="lead mt-6 text-muted">
                Profiles show a level, XP and a Founder Score. We want to be clear about what they are — and what they are not.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-3 lg:col-span-7">
            {[
              ['XP', 'You earn XP for doing things on FNDRS: finishing your profile, launching a startup page, hosting an event, getting a match, sharing a post, completing the weekly challenge.'],
              ['Level', 'Your level goes up as your XP grows. It shows how active you have been on the platform — nothing more.'],
              ['Founder Score', 'Grows slowly with meaningful activity on FNDRS. It is a measure of engagement on the platform.'],
            ].map(([t, d]) => (
              <Reveal key={t} className="rounded-[24px] border hairline bg-ink-900 p-7">
                <p className="text-[1.25rem] font-semibold">{t}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{d}</p>
              </Reveal>
            ))}
            <Reveal className="rounded-[24px] border border-gold-500/30 bg-gold-500/[0.06] p-7">
              <p className="text-[1rem] font-semibold text-gold-300">What none of these measure</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                None of these numbers say how good someone is as a founder, a builder or a person. FNDRS cannot measure that — and does not try to.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ------------- Privacy */}
      <Section tone="raised">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="Your profile, your rules"
            title="Visible when you want to be."
            lead="You decide whether your profile appears in Discover and Smart Match, whether your location is shown, and whether everyone or only your matches can message you."
            action={
              <ButtonLink href="/security" variant="secondary" arrow>
                Security &amp; Privacy
              </ButtonLink>
            }
          />
          <Reveal>
            <ProductScreenshot screen="signUp" crop={0.72} className="mx-auto max-w-[22rem]" caption="Creating a profile starts here" />
          </Reveal>
        </div>
      </Section>

      <FAQ
        eyebrow="FAQ · Profiles"
        title="Profiles, answered."
        items={[
          { q: 'Do I need a startup to create a profile?', a: 'No. Many people on FNDRS are looking for something to join. Set your role and what you are open to, and the right founders can find you.' },
          { q: 'Can I hide my profile?', a: 'Yes. You can turn off discoverability so you do not appear in Discover or Smart Match, and hide your location.' },
          { q: 'Is the Founder Score visible to others?', a: 'Yes, it is shown on profiles. It reflects activity on FNDRS, not quality — see the section above.' },
          { q: 'Can I link my LinkedIn?', a: 'Yes. You can add your website, LinkedIn and X to your profile.' },
        ]}
      />
      <CTASection eyebrow="Profiles" title="Show what you're building." body="Your profile is the start of every good match on FNDRS." primary={{ href: '/early-access', label: 'Create your profile' }} />
      <ProductNavigation items={['smartMatch', 'startups', 'community', 'forBuilders']} />
    </>
  );
}
