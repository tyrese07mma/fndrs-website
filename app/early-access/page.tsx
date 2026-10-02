import { Breadcrumbs } from '@/components/marketing/Breadcrumbs';
import { EarlyAccessForm } from '@/components/marketing/EarlyAccessForm';
import { FAQ } from '@/components/marketing/FAQ';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { Container, Eyebrow, StatusBadge } from '@/components/ui/primitives';
import { Reveal, TextReveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('earlyAccess');

export default function EarlyAccessPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-[calc(var(--nav-h)+2.5rem)] sm:pb-32 sm:pt-[calc(var(--nav-h)+4rem)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 warm-glow" />
        <Container wide className="relative">
          <Breadcrumbs href="/early-access" />
          <div className="mt-12 grid gap-16 sm:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Reveal y={10}>
                <Eyebrow>Early access</Eyebrow>
              </Reveal>
              <TextReveal lines={['Be', 'early.']} className="headline-xl mt-7 uppercase" />
              <Reveal delay={0.25}>
                <p className="lead mt-8 max-w-md text-muted">
                  FNDRS is in development and in early beta. We are looking for the first founders, builders, mentors and investors to use it — and to tell us what to build next.
                </p>
                <div className="mt-8">
                  <StatusBadge status="beta" label="Early beta" />
                </div>
              </Reveal>
              <Reveal delay={0.35}>
                <ul className="mt-12 space-y-5 border-t hairline pt-8">
                  {[
                    ['A head start', 'Set up your profile while the network is small and every member is visible.'],
                    ['A direct line', 'Early members talk to the people building FNDRS. Your feedback changes the product.'],
                    ['Free core features', 'Profile, Smart Match, Discover, community and messaging.'],
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
              <EarlyAccessForm />
            </Reveal>
          </div>
        </Container>
      </section>
      <FAQ
        tone="raised"
        eyebrow="FAQ · Early access"
        title="Before you sign up."
        items={[
          { q: 'What does early access mean?', a: 'FNDRS is in early beta. Early access means you join while the product is still being shaped — with features that are live, some that are still being built, and a direct line to the team.' },
          { q: 'Does it cost anything?', a: 'No. The core of FNDRS is free. Paid plans are not available yet.' },
          { q: 'What happens with my details?', a: 'We use them only to contact you about early access. You can ask us to delete them at any time. See the privacy policy for details.' },
          { q: 'Which platforms is FNDRS on?', a: 'FNDRS is a mobile app. We will tell early access members how to get it as access opens.' },
        ]}
      />
      <ProductNavigation items={['howItWorks', 'product', 'roadmap', 'faq']} />
    </>
  );
}
