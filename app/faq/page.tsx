import { CTASection } from '@/components/marketing/CTASection';
import type { FAQItem } from '@/components/marketing/FAQ';
import { FAQList } from '@/components/marketing/FAQList';
import { PageHero } from '@/components/marketing/PageHero';
import { Section } from '@/components/marketing/Section';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('faq');

const GROUPS: { id: string; title: string; items: FAQItem[] }[] = [
  {
    id: 'general',
    title: 'About FNDRS',
    items: [
      { q: 'What is FNDRS Society?', a: 'FNDRS is a mobile app that helps founders, builders, mentors and investors find the people they should be building with — matched on what they build, what they can do and who they are looking for.' },
      { q: 'Is FNDRS another LinkedIn?', a: 'No. LinkedIn is built around careers and reach. FNDRS is built around starting things: finding a co-founder, a first team, a mentor or an early investor, and sharing progress while you build.' },
      { q: 'Who is FNDRS for?', a: 'Founders and aspiring founders, developers, designers, marketers, product and business people, mentors, investors — and anyone who wants to build something new with others.' },
      { q: 'What languages does the app support?', a: 'The app is available in English and German.' },
    ],
  },
  {
    id: 'matching',
    title: 'Matching & Discover',
    items: [
      { q: 'How does Smart Match work?', a: 'Smart Match checks whether two people fit in both directions — whether each has what the other is looking for — and adds shared industry, stage and city. You see a fit score with the reasons behind it.' },
      { q: 'Does the fit score rate people?', a: 'No. It estimates relevance between two people. It does not measure how good anyone is.' },
      { q: 'How many matches can I see per day?', a: 'The free plan includes 25 Smart Match swipes per day.' },
      { q: 'What is the difference between Discover and Smart Match?', a: 'Discover is open exploration across founders, startups, communities, events, mentors, investors and opportunities. Smart Match is a short daily list of people who fit you.' },
    ],
  },
  {
    id: 'privacy',
    title: 'Profiles & privacy',
    items: [
      { q: 'Who can see my profile?', a: 'Members of FNDRS. You can pause your appearance in Smart Match, hide your city, and limit messages to your matches.' },
      { q: 'Who can message me?', a: 'You choose: everyone, or only people you matched with.' },
      { q: 'What do XP, level and Founder Score mean?', a: 'They reflect activity on FNDRS — completing your profile, posting, joining events, finishing challenges. They do not measure how good someone is as a founder.' },
      { q: 'Can I delete my account?', a: 'Yes, in the app settings. Deleting your account permanently removes your profile, posts, messages and matches.' },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & beta',
    items: [
      { q: 'Is FNDRS free?', a: 'Yes, the core of FNDRS is free. FNDRS Pro, with advanced tools, is planned. Paid plans are not available yet and pricing is not final.' },
      { q: 'Is FNDRS Copilot available?', a: 'Not yet. Copilot is in development. You can already see it in the app, marked as not activated.' },
      { q: 'How do I get access?', a: 'Request Early Access on this website. We contact you by email when your access is ready.' },
      { q: 'Does FNDRS give investment advice?', a: 'No. FNDRS helps people discover and meet each other. It does not broker, recommend or execute investments.' },
    ],
  },
];

export default function FAQPage() {
  const all = GROUPS.flatMap((g) => g.items);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: all.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };

  return (
    <>
      <PageHero
        href="/faq"
        eyebrow="FAQ"
        title={['Straight', 'answers.']}
        lead="What FNDRS is, how matching works, what is free, what is still in development — and how your profile is handled."
        aside={
          <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t hairline pt-5">
            {GROUPS.map((g) => (
              <li key={g.id}>
                <a href={`#${g.id}`} className="text-[0.9375rem] font-medium text-ivory/85 underline-offset-[6px] decoration-white/25 transition-colors hover:text-ivory hover:underline">
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        }
      />
      {GROUPS.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 === 0 ? 'raised' : 'dark'} className="!py-20 sm:!py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal>
              <h2 className="headline-sm">{g.title}</h2>
            </Reveal>
            <FAQList items={g.items} />
          </div>
        </Section>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CTASection eyebrow="Still curious?" title="Ask us directly." body="If your question isn't here, we are happy to answer it." primary={{ href: '/contact', label: 'Contact us' }} secondary={{ href: '/early-access', label: 'Join Early Access' }} />
    </>
  );
}
