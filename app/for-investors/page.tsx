import { Activity, Building2, Layers, LineChart, UserRound, Users } from 'lucide-react';

import { AudiencePage } from '@/components/marketing/AudiencePage';
import { Section } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { Eyebrow } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('forInvestors');

export default function ForInvestorsPage() {
  return (
    <AudiencePage
      serious
      href="/for-investors"
      eyebrow="For Investors"
      title={["Discover what's", 'being built early.']}
      lead="FNDRS gives angels and early-stage investors a view of founders and teams as they form — with context on the people, the industry, the stage and the progress behind each startup."
      heroMedia={<ProductScreenshot screen="discover" priority className="mx-auto max-w-[22rem]" />}
      cta={{ href: '/early-access', label: 'Request investor access' }}
      useCasesTitle="Context before the pitch."
      useCasesLead="What you can see on FNDRS, and why it is useful before a first meeting."
      useCases={[
        { icon: Building2, title: 'Discover startups', text: 'Startup pages with a description, industry, stage, team and the skills they still need.', href: '/startups', linkLabel: 'Startup Profiles' },
        { icon: UserRound, title: 'Founder profiles', text: 'What founders can do, what they have built and what they are looking for — in their own words.', href: '/profiles', linkLabel: 'Profiles' },
        { icon: Layers, title: 'Industries', text: 'Filter the network by the sectors you focus on.' },
        { icon: LineChart, title: 'Stages', text: 'From idea to Series A — see teams at the stage you actually invest in.' },
        { icon: Activity, title: 'Progress', text: 'Updates and milestones over time, instead of a single snapshot in a deck.', href: '/community', linkLabel: 'Community' },
        { icon: Users, title: 'Teams', text: 'Who is on the team, how it formed, and which roles are still open.' },
      ]}
      story={{
        eyebrow: 'Why FNDRS',
        title: 'See the team before the round.',
        points: [
          ['Earlier signal.', 'Teams on FNDRS often show up while they are still forming — long before a formal raise.'],
          ['Introductions with context.', 'The idea behind FNDRS is to meet founders through people who already know them, with their profile and progress visible to both sides.'],
          ['A two-way profile.', 'Founders can see your focus, stage and what you are open to. Fewer mismatched pitches, more relevant ones.'],
        ],
      }}
      feature={
        <Section tone="raised">
          <Reveal className="mx-auto max-w-3xl rounded-[16px] border hairline bg-ink-950 p-8 sm:p-12">
            <Eyebrow tone="muted">Important</Eyebrow>
            <h2 className="mt-6 text-[1.75rem] font-bold tracking-[-0.03em]">What FNDRS is not.</h2>
            <div className="mt-5 space-y-4 text-[1rem] leading-relaxed text-muted">
              <p>FNDRS is a network for discovering and meeting people. It is not an investment platform, a broker or a crowdfunding service.</p>
              <p>
                We do not arrange, recommend or execute investments, we do not verify financial information shared by startups, and nothing on FNDRS is investment advice or a promise of returns. Do your own
                due diligence.
              </p>
            </div>
          </Reveal>
        </Section>
      }
      faq={[
        { q: 'Who are the investors on FNDRS?', a: 'Angels and early-stage investors who want to meet founders early. Investor profiles show focus and stage so founders can reach the right people.' },
        { q: 'Can I control who contacts me?', a: 'Yes. You can choose whether everyone or only your matches can message you, and whether your profile is discoverable.' },
        { q: 'Are investor tools planned?', a: 'We are exploring dedicated tools for investors as part of future paid plans. Nothing is final and no pricing exists yet.' },
        { q: 'Does FNDRS verify startups?', a: 'No. Information on startup pages comes from the founders themselves.' },
      ]}
      closing={{ title: 'Meet founders while they are still forming.', body: 'FNDRS is in early beta. Request access as an investor and tell us what you focus on.' }}
      related={['startups', 'profiles', 'discover', 'security']}
    />
  );
}
