import { Briefcase, Code2, FolderKanban, Handshake, Megaphone, Palette, PenTool, Rocket, Search, Users } from 'lucide-react';

import { AudiencePage } from '@/components/marketing/AudiencePage';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('forBuilders');

const ROLES = [
  { icon: Code2, t: 'Developers', d: 'Frontend, backend, mobile, ML, data.' },
  { icon: Palette, t: 'Designers', d: 'Product, UX, brand, motion.' },
  { icon: Megaphone, t: 'Marketers', d: 'Growth, content, community, performance.' },
  { icon: PenTool, t: 'Product people', d: 'PMs and product-minded generalists.' },
  { icon: Briefcase, t: 'Business talent', d: 'Sales, operations, finance, partnerships.' },
];

export default function ForBuildersPage() {
  return (
    <AudiencePage
      href="/for-builders"
      eyebrow="For Builders"
      title={['Find something', 'worth building.']}
      lead="You have the skills. FNDRS helps you find the founders and early teams who need exactly them — and the projects worth your evenings, weekends or next career move."
      heroMedia={<ProductScreenshot screen="editProfile" priority className="mx-auto max-w-[22rem] lg:-rotate-[2deg]" caption="Skills — what you bring to a team" />}
      cta={{ href: '/early-access', label: 'Join FNDRS as a Builder' }}
      useCasesTitle="What builders use FNDRS for."
      useCases={[
        { icon: Rocket, title: 'Find startups', text: 'Browse startups by industry and stage, and see which skills they still need.', href: '/startups', linkLabel: 'Startup Profiles' },
        { icon: FolderKanban, title: 'Join projects', text: 'Answer looking-for posts and open roles from teams that are just getting started.', href: '/community#looking-for', linkLabel: 'Looking for' },
        { icon: Handshake, title: 'Meet founders', text: 'Smart Match introduces you to founders looking for what you bring.', href: '/smart-match', linkLabel: 'Smart Match' },
        { icon: Users, title: 'Find collaborators', text: 'Other builders for side projects, hackathons or a new company.', href: '/discover#communities', linkLabel: 'Communities' },
        { icon: PenTool, title: 'Build a portfolio', text: 'Your profile, startups and posts show what you have actually built.', href: '/profiles', linkLabel: 'Profiles' },
        { icon: Search, title: 'Discover opportunities', text: 'Co-founder searches, jobs, freelance work and partnerships in one list.', href: '/discover#opportunities', linkLabel: 'Opportunities' },
      ]}
      story={{
        eyebrow: 'Why builders join',
        title: 'The best early roles never get posted.',
        points: [
          ['Founders need you before they can hire you.', 'The most interesting work happens before there is a job ad. FNDRS puts you in the room while teams are still forming.'],
          ['Your skills are the match.', 'Set what you can do and what you are open to — co-founding, joining a team, freelancing — and let the right founders find you.'],
          ['Show work, not titles.', 'Progress posts and startup pages say more about you than a list of past employers.'],
        ],
      }}
      feature={
        <Section tone="raised">
          <SectionHeading eyebrow="Who counts as a builder" title="If you make things, you belong here." className="mb-14" />
          <RevealGroup as="ul" className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {ROLES.map(({ icon: Icon, t, d }) => (
              <RevealItem as="li" key={t} className="border-t hairline-strong pt-6">
                <Icon className="size-5 text-gold-500" strokeWidth={1.75} aria-hidden />
                <p className="mt-6 text-[1.25rem] font-semibold tracking-[-0.02em]">{t}</p>
                <p className="mt-1.5 text-[0.9375rem] text-subtle">{d}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      }
      faq={[
        { q: 'I am not a founder. Can I still use FNDRS?', a: 'Yes. Builders are half of every good match. Set your role and what you are open to, and founders who need your skills can find you.' },
        { q: 'Is FNDRS a job board?', a: 'Not really. You will find open roles and opportunities, but FNDRS is about meeting the people first — before a role is even written down.' },
        { q: 'Can I keep my search private?', a: 'You control whether your profile is discoverable and who can message you.' },
      ]}
      closing={{ title: 'Your next project is looking for you.', body: 'Join Early Access as a builder and tell FNDRS what you can do.' }}
      related={['startups', 'smartMatch', 'profiles', 'community']}
    />
  );
}
