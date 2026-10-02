import { EyeOff, KeyRound, MapPinOff, MessageSquareLock, ShieldCheck, Trash2 } from 'lucide-react';

import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { UseCaseGrid } from '@/components/marketing/UseCaseGrid';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('security');

export default function SecurityPage() {
  return (
    <>
      <PageHero
        href="/security"
        eyebrow="Security & Privacy"
        title={['Your profile.', <span key="x" className="text-subtle">Your rules.</span>]}
        lead="A network only works if people trust it. These are the controls you have over your own profile on FNDRS, and how we approach your data."
      />
      <Section tone="raised" className="!pt-20">
        <SectionHeading eyebrow="Controls in the app" title="You decide who sees what." className="mb-14" />
        <UseCaseGrid
          items={[
            { icon: EyeOff, title: 'Discoverability', text: 'Turn it off and you will not appear in Discover or Smart Match.' },
            { icon: MessageSquareLock, title: 'Message permissions', text: 'Let everyone message you, or only the people you matched with.' },
            { icon: MapPinOff, title: 'Location visibility', text: 'Show your city to help local matches — or hide it.' },
            { icon: KeyRound, title: 'Strong passwords', text: 'Accounts require a password of at least twelve characters.' },
            { icon: ShieldCheck, title: 'Access rules', text: 'Data access is enforced on the database level, so people only see what they are allowed to see.' },
            { icon: Trash2, title: 'Your data, on request', text: 'Ask us for a copy of your data or for deletion at any time.', href: '/contact', linkLabel: 'Contact us' },
          ]}
        />
      </Section>
      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            eyebrow="This website"
            title="No trackers. No cookies."
            lead="This website does not use analytics, ad trackers or cookies, and fonts are served from our own server. Forms are only used to answer your request."
          />
          <Reveal>
            <ProductScreenshot screen="signIn" crop={0.7} className="mx-auto max-w-[22rem]" />
          </Reveal>
        </div>
      </Section>
      <ProductNavigation items={['privacy', 'profiles', 'faq', 'contact']} />
    </>
  );
}
