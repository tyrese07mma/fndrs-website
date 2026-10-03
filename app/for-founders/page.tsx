import { Code2, Flag, GraduationCap, HelpCircle, Megaphone, Palette, Rocket, TrendingUp, Users, UsersRound } from 'lucide-react';

import { AudiencePage } from '@/components/marketing/AudiencePage';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ArrowLink } from '@/components/ui/Button';
import { MatchFlow } from '@/components/product/MatchFlow';
import { ScreenStack } from '@/components/product/ScreenStack';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('forFounders');

export default function ForFoundersPage() {
  return (
    <AudiencePage
      href="/for-founders"
      eyebrow="For Founders"
      title={["You don't have to", 'build it alone.']}
      lead="Whether you have an idea, an MVP or a funded company: FNDRS helps you find the people you are missing — and keeps them close while you build."
      heroMedia={<ScreenStack center="welcomeEn" right="smartMatch" priority />}
      cta={{ href: '/early-access', label: 'Join FNDRS as a Founder' }}
      useCasesTitle="Ten reasons founders open FNDRS."
      useCasesLead="Start with the one you need today."
      useCases={[
        { icon: UsersRound, title: 'Find a co-founder', text: 'Smart Match looks for people who complete your skills and are open to co-founding.', href: '/smart-match', linkLabel: 'Smart Match' },
        { icon: Code2, title: 'Find developers', text: 'Post what you are building and which stack — and let engineers come to you.', href: '/community#looking-for', linkLabel: 'Looking for' },
        { icon: Palette, title: 'Find designers', text: 'Product and brand designers who want to shape something early.', href: '/for-builders', linkLabel: 'For Builders' },
        { icon: Megaphone, title: 'Find marketers', text: 'Growth, content and community people for the launch you are planning.', href: '/discover#opportunities', linkLabel: 'Opportunities' },
        { icon: Users, title: 'Meet other founders', text: 'Communities and events with people at your stage, in your industry.', href: '/discover#communities', linkLabel: 'Communities' },
        { icon: GraduationCap, title: 'Find mentors', text: 'Operators and repeat founders who have solved your problem before.', href: '/for-mentors', linkLabel: 'For Mentors' },
        { icon: TrendingUp, title: 'Discover investors', text: 'See who invests at your stage — and meet them through people who know you.', href: '/for-investors', linkLabel: 'For Investors' },
        { icon: Rocket, title: 'Show your startup', text: 'A startup page with stage, team, skills needed and progress.', href: '/startups', linkLabel: 'Startup Profiles' },
        { icon: Flag, title: 'Share milestones', text: 'Launches and first customers, posted where the right people see them.', href: '/community', linkLabel: 'Community' },
        { icon: HelpCircle, title: 'Ask the community', text: 'Questions and polls for the decisions you do not want to make alone.', href: '/community', linkLabel: 'Community' },
      ]}
      story={{
        eyebrow: 'Why it matters',
        title: 'Most startups don’t fail for lack of ideas.',
        points: [
          ['The team is the product, early on.', 'Before there is traction, there are people. Who you build with shapes everything that follows.'],
          ['Your network is probably the wrong shape.', 'Friends and colleagues tend to have your skills. You need the opposite. FNDRS is built to find complement, not similarity.'],
          ['Momentum attracts people.', 'Sharing progress in public is how the next co-founder, hire or investor notices you. FNDRS makes that the default.'],
        ],
      }}
      feature={
        <Section tone="raised">
          <SectionHeading
            eyebrow="Founder × Builder"
            title="What a good match looks like."
            lead="A founder with business skills who needs a developer. A developer who wants to co-found. Same industry. Both open to it. That is the kind of pair Smart Match is built to find."
            action={<ArrowLink href="/smart-match">Explore Smart Match</ArrowLink>}
            className="mb-16"
          />
          <MatchFlow />
        </Section>
      }
      faq={[
        { q: 'I only have an idea. Is FNDRS for me?', a: 'Yes. “Idea” is a stage on FNDRS. Many co-founder searches start exactly there.' },
        { q: 'How do I find a technical co-founder?', a: 'Set “Technical co-founder” under Looking for, make your own skills clear, and use Smart Match daily. A looking-for post in the community helps too.' },
        { q: 'Can I list my startup if I am not raising?', a: 'Of course. A startup page is about what you are building and who you need — not only fundraising.' },
        { q: 'Does FNDRS help me raise money?', a: 'FNDRS helps you discover and meet investors with context. It does not broker investments or promise funding.' },
      ]}
      closing={{ title: <>Find the people you&rsquo;re missing.</>, body: 'Join Early Access as a founder and set up your profile and startup in minutes.' }}
      related={['smartMatch', 'startups', 'community', 'forInvestors']}
    />
  );
}
