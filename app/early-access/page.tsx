import { Compass, MessageSquareText, Sparkles, Users } from 'lucide-react';

import { Breadcrumbs } from '@/components/marketing/Breadcrumbs';
import { EarlyAccessForm } from '@/components/marketing/EarlyAccessForm';
import { FAQ } from '@/components/marketing/FAQ';
import { FormsUnavailable } from '@/components/marketing/FormsUnavailable';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section, SectionHeading } from '@/components/marketing/Section';
import { UseCaseGrid } from '@/components/marketing/UseCaseGrid';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { Container, Eyebrow, StatusBadge } from '@/components/ui/primitives';
import { Reveal, TextReveal } from '@/components/ui/Reveal';
import { formsEnabled } from '@/lib/forms';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('earlyAccess');

export default function EarlyAccessPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-[calc(var(--nav-h)+2.5rem)] sm:pb-32 sm:pt-[calc(var(--nav-h)+4rem)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 warm-glow" />
        <Container wide className="relative">
          <Breadcrumbs href="/early-access" />
          <div className="mt-12 grid gap-14 sm:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Reveal y={10}>
                <Eyebrow>Early Access</Eyebrow>
              </Reveal>
              <TextReveal lines={['Be', 'early.']} className="headline-xl mt-7 uppercase" />
              <Reveal delay={0.25}>
                <p className="lead mt-8 max-w-md text-muted">
                  The FNDRS app is running in early beta. Request access to create your profile, use Smart Match and help decide what we build next.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <StatusBadge status="beta" />
                  <StatusBadge status="live" label="Free to join" />
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <ul className="mt-12 space-y-5 border-t hairline pt-8">
                  {[
                    ['Takes a minute', 'Name, email and what you do. Telling us what you are looking for is optional.'],
                    ['Free core features', 'Profile, Smart Match, Discover, the community feed and messaging.'],
                    ['Feedback welcome', 'It is a beta. Tell us what works, what breaks and what is missing.'],
                  ].map(([t, d]) => (
                    <li key={t}>
                      <p className="text-[1rem] font-semibold">{t}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-subtle">{d}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.4} className="mt-12 hidden max-w-[16rem] lg:block">
                <ProductScreenshot screen="welcomeEn" crop={0.55} sizes="260px" />
              </Reveal>
            </div>
            <Reveal delay={0.2} y={30}>
              {formsEnabled() ? (
                <EarlyAccessForm />
              ) : (
                <FormsUnavailable
                  title="Requests open here shortly."
                  body="We are connecting this form to our team inbox. Follow FNDRS to hear the moment Early Access requests open."
                />
              )}
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="raised">
        <SectionHeading
          eyebrow="What Early Access means"
          title="A working product, still being shaped."
          lead="FNDRS is not a waitlist for an idea. The app exists: accounts, profiles, Smart Match, Discover, posts and messaging. Early Access is how we let people in while we keep building it."
          className="mb-14"
        />
        <UseCaseGrid
          columns={2}
          items={[
            {
              icon: Users,
              title: 'Who can join',
              text: 'Founders and aspiring founders, developers, designers, marketers, product and business people, mentors and investors. Anyone who wants to build something with others.',
            },
            {
              icon: Sparkles,
              title: 'What you get',
              text: 'A FNDRS account with the full free feature set: your profile, Smart Match, Discover, the community feed and messaging with your matches.',
              href: '/product',
              linkLabel: 'See the product',
            },
            {
              icon: Compass,
              title: 'What to expect',
              text: 'An early beta. Some sections are still quiet, some features are marked “in development”, and things will change based on what early members tell us.',
              href: '/roadmap',
              linkLabel: 'View the roadmap',
            },
            {
              icon: MessageSquareText,
              title: 'What we ask',
              text: 'Use it for real and tell us honestly what is useful and what is not. That feedback decides what we build next.',
              href: '/contact',
              linkLabel: 'Send feedback',
            },
          ]}
        />
      </Section>

      <FAQ
        eyebrow="FAQ · Early Access"
        title="Before you sign up."
        items={[
          {
            q: 'What does Early Access mean?',
            a: 'FNDRS is in early beta. Early Access means you join while the product is still being shaped: core features work, some are still in development, and your feedback goes straight to the team building it.',
          },
          { q: 'Does it cost anything?', a: 'No. The core of FNDRS is free. Paid plans are not available yet.' },
          {
            q: 'When will I get access?',
            a: 'We let people in step by step and contact you by email when your access is ready. We do not promise a specific date.',
          },
          {
            q: 'What happens with my details?',
            a: 'We use them only to handle your request and to contact you about Early Access. You can ask us to delete them at any time. The privacy policy has the details.',
          },
          { q: 'Which platforms is FNDRS on?', a: 'FNDRS is a mobile app. When your access is ready, we will tell you how to install it.' },
        ]}
      />
      <ProductNavigation items={['howItWorks', 'product', 'roadmap', 'faq']} />
    </>
  );
}
