import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { Eyebrow } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('security');

const TOPICS: { title: string; body: string[] }[] = [
  {
    title: 'Your data',
    body: [
      'Your profile contains what you choose to put on it. Fields you leave empty are not shown and not used for matching.',
      'In the app settings you decide whether your city is shown, whether you appear in Smart Match, and whether everyone or only your matches can message you.',
    ],
  },
  {
    title: 'Authentication',
    body: [
      'Accounts are protected by email and password. Passwords need at least twelve characters and are never stored in plain text: they are hashed by the authentication service before they are saved.',
      'If you forget your password, you can reset it through a link sent to your email address.',
    ],
  },
  {
    title: 'Data transport',
    body: [
      'This website and the connection between the app and its backend use HTTPS, so data is encrypted on its way between your device and our servers.',
    ],
  },
  {
    title: 'Infrastructure',
    body: [
      'The FNDRS app runs on Supabase (Postgres database and authentication). Access to data is enforced in the database itself with row-level security, so each request only reaches the records it is allowed to see.',
      'This website is hosted on Vercel.',
    ],
  },
  {
    title: 'Privacy by design',
    body: [
      'We collect what the product needs to work: your account, your profile and what you do on FNDRS. This website runs without analytics, advertising trackers or cookies.',
    ],
  },
  {
    title: 'Account control',
    body: [
      'You can edit your profile at any time. The app settings include an option to export your data, and deleting your account there permanently removes your profile, posts, messages and matches.',
      'For any other request about your data, contact us and we will handle it.',
    ],
  },
  {
    title: 'Reporting & safety',
    body: [
      'You can report a post, a profile or a conversation from its menu in the app. Reports go to the FNDRS team for review.',
      'The settings also list the members you have blocked. Limiting messages to your matches is the simplest way to avoid unwanted contact.',
    ],
  },
  {
    title: 'Responsible development',
    body: [
      'FNDRS is in early beta, and our security practices grow with the product. If you find a security issue, please tell us through the contact page before disclosing it publicly.',
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        href="/security"
        eyebrow="Security & Privacy"
        title={['Your profile.', <span key="x" className="text-subtle">Your rules.</span>]}
        lead="A network only works if people trust it. This page explains, without marketing language, how FNDRS handles your account and data today."
      />

      <Section tone="raised" className="!pt-20">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="How it works today" title="Plain answers." size="sm" className="lg:sticky lg:top-32" />
          </div>
          <ul className="border-t hairline lg:col-span-8">
            {TOPICS.map((t) => (
              <li key={t.title} className="border-b hairline py-8">
                <Reveal>
                  <h2 className="text-[1.375rem] font-semibold tracking-[-0.02em]">{t.title}</h2>
                  <div className="mt-3 space-y-3 text-[1rem] leading-relaxed text-muted">
                    {t.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <Eyebrow>What we don&rsquo;t claim</Eyebrow>
            <h2 className="headline-md mt-6">No badges we haven&rsquo;t earned.</h2>
            <div className="lead mt-6 space-y-4 text-muted">
              <p>FNDRS holds no security certifications such as SOC 2 or ISO 27001.</p>
              <p>Messages are encrypted in transit, but they are not end-to-end encrypted.</p>
              <p>When this changes, this page will say so.</p>
            </div>
          </Reveal>
          <Reveal>
            <ProductScreenshot screen="settingsPrivacy" className="mx-auto max-w-[22rem]" caption="Privacy and account settings in the app" />
          </Reveal>
        </div>
      </Section>
      <ProductNavigation items={['privacy', 'profiles', 'faq', 'contact']} />
    </>
  );
}
