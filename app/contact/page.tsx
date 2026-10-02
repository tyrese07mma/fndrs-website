import { Mail } from 'lucide-react';

import { ContactForm } from '@/components/marketing/ContactForm';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section } from '@/components/marketing/Section';
import { Reveal } from '@/components/ui/Reveal';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export const metadata = pageMetadata('contact');

export default function ContactPage() {
  return (
    <>
      <PageHero
        href="/contact"
        eyebrow="Contact"
        title={["Let's talk."]}
        lead="Questions about the app, early access, a partnership or a story you are writing — send us a note. A real person reads every message."
      />
      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal className="space-y-8">
            {[
              ['The app', 'Feedback, bugs and feature ideas are very welcome while we are in beta.'],
              ['Early access', 'Want in, or want to bring your community? Tell us who you are.'],
              ['Partnerships', 'Accelerators, communities, universities, events.'],
              ['Press', 'Background on FNDRS and what we are building.'],
            ].map(([t, d]) => (
              <div key={t} className="border-t hairline pt-6">
                <p className="text-[1.0625rem] font-semibold">{t}</p>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-subtle">{d}</p>
              </div>
            ))}
            {site.contactEmail && (
              <a href={`mailto:${site.contactEmail}`} className="inline-flex items-center gap-2 border-t hairline pt-6 text-[1rem] font-semibold text-ivory">
                <Mail className="size-4" aria-hidden /> {site.contactEmail}
              </a>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
      <ProductNavigation items={['about', 'earlyAccess', 'faq', 'security']} />
    </>
  );
}
