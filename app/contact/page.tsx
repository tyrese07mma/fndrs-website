import { ArrowUpRight, Mail } from 'lucide-react';

import { ContactForm } from '@/components/marketing/ContactForm';
import { FormsUnavailable } from '@/components/marketing/FormsUnavailable';
import { PageHero } from '@/components/marketing/PageHero';
import { ProductNavigation } from '@/components/marketing/ProductNavigation';
import { Section } from '@/components/marketing/Section';
import { Reveal } from '@/components/ui/Reveal';
import { formsEnabled } from '@/lib/forms';
import { pageMetadata } from '@/lib/metadata';
import { site, socialLinks } from '@/lib/site';

export const metadata = pageMetadata('contact');

const TOPICS: [string, string][] = [
  ['App feedback', 'Bugs, ideas and honest opinions about the beta are exactly what we need right now.'],
  ['Early Access', 'Questions about access, or you want to bring your community to FNDRS.'],
  ['Partnerships', 'Accelerators, communities, universities and event organisers.'],
  ['Press', 'Background on FNDRS and what we are building.'],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        href="/contact"
        eyebrow="Contact"
        title={["Let's talk."]}
        lead="Feedback on the app, a question about Early Access, a partnership or a story you are writing. Send us a note and the team building FNDRS will read it."
      />
      <Section className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal className="space-y-8">
            {TOPICS.map(([t, d]) => (
              <div key={t} className="border-t hairline pt-6">
                <h2 className="text-[1.0625rem] font-semibold">{t}</h2>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-subtle">{d}</p>
              </div>
            ))}
            {(site.contactEmail || socialLinks.length > 0) && (
              <ul className="space-y-3 border-t hairline pt-6">
                {site.contactEmail && (
                  <li>
                    <a href={`mailto:${site.contactEmail}`} className="inline-flex items-center gap-2 text-[1rem] font-semibold text-ivory">
                      <Mail className="size-4" aria-hidden /> {site.contactEmail}
                    </a>
                  </li>
                )}
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[1rem] font-semibold text-ivory underline-offset-4 hover:underline"
                    >
                      FNDRS on {s.label}
                      <ArrowUpRight className="size-4" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            {formsEnabled() ? (
              <ContactForm />
            ) : (
              <FormsUnavailable
                title="The contact form opens shortly."
                body="We are connecting it to our team inbox right now. In the meantime, you can reach FNDRS directly."
              />
            )}
          </Reveal>
        </div>
      </Section>
      <ProductNavigation items={['about', 'earlyAccess', 'faq', 'security']} />
    </>
  );
}
