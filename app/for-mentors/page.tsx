import { CalendarDays, Compass, HeartHandshake, MessageCircle, Sparkles, UserRound } from 'lucide-react';

import { AudiencePage } from '@/components/marketing/AudiencePage';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('forMentors');

export default function ForMentorsPage() {
  return (
    <AudiencePage
      href="/for-mentors"
      eyebrow="For Mentors"
      title={['Experience', 'should travel.']}
      lead="You have made the mistakes, built the teams, shipped the products. FNDRS helps that experience reach the founders who need it right now — without a flooded inbox."
      heroMedia={<ProductScreenshot screen="welcomeIntros" priority className="mx-auto max-w-[22rem]" />}
      cta={{ href: '/early-access', label: 'Join FNDRS as a Mentor' }}
      useCasesTitle="What mentors do on FNDRS."
      useCases={[
        { icon: Compass, title: 'Discover founders', text: 'Find founders and teams in the industries and stages you know best.', href: '/discover', linkLabel: 'Discover' },
        { icon: UserRound, title: 'Show your expertise', text: 'Your profile shows your skills, industries and what you are open to — advising, one-on-ones, more.', href: '/profiles', linkLabel: 'Profiles' },
        { icon: HeartHandshake, title: 'Make connections', text: 'Smart Match introduces you to founders whose needs fit your experience.', href: '/smart-match', linkLabel: 'Smart Match' },
        { icon: Sparkles, title: 'Support teams', text: 'Follow startups and help at the moments that matter.', href: '/startups', linkLabel: 'Startups' },
        { icon: MessageCircle, title: 'Answer the community', text: 'Questions in the feed are a low-effort way to help many founders at once.', href: '/community', linkLabel: 'Community' },
        { icon: CalendarDays, title: 'Host events', text: 'Run a session, an office hour or a pitch night for the network.', href: '/discover#events', linkLabel: 'Events' },
      ]}
      story={{
        eyebrow: 'Why mentor here',
        title: 'Your hour is worth more in the right room.',
        points: [
          ['Relevance over volume.', 'Instead of answering every cold message, meet founders whose questions you are actually qualified to answer.'],
          ['Context up front.', 'Before a conversation, you can see what a founder is building, at what stage, and what they need.'],
          ['Warm introductions.', 'Founders can reach you through people who already know you both. That is how good mentoring usually starts anyway.'],
        ],
      }}
      feature={
        <Section tone="raised">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <SectionHeading
              eyebrow="In the app"
              title="A place in Discover, built for mentors."
              lead="Founders find mentors in their own section of Discover, with the promise right on the tile: book one-on-ones."
            />
            <Reveal>
              <ProductScreenshot screen="discoverTop" crop={0.62} className="mx-auto max-w-[22rem]" />
            </Reveal>
          </div>
        </Section>
      }
      faq={[
        { q: 'Is mentoring on FNDRS paid?', a: 'FNDRS does not set or process mentoring fees. How you work with founders is up to you.' },
        { q: 'How much time do I need?', a: 'As much as you choose. You control who can message you and whether your profile appears in Discover and Smart Match.' },
        { q: 'Can I mentor and invest?', a: 'Yes. Set your role and what you are open to, and your profile shows both.' },
      ]}
      closing={{ title: 'Put your experience where it changes the outcome.', body: 'Join early access as a mentor and set up your profile in minutes.' }}
      related={['discover', 'profiles', 'forFounders', 'community']}
    />
  );
}
