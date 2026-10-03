import { ProductScreenshot } from '@/components/product/ProductScreenshot';
import { Eyebrow, StatusBadge, type Status } from '@/components/ui/primitives';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import type { ScreenKey } from '@/lib/screens';
import { Section } from './Section';

const SCREENS: { screen: ScreenKey; label: string }[] = [
  { screen: 'welcomeEn', label: 'Welcome' },
  { screen: 'signUp', label: 'Accounts' },
  { screen: 'smartMatch', label: 'Smart Match' },
  { screen: 'discover', label: 'Discover' },
];

/** Only what the app does today. Update together with /roadmap. */
const FACTS: { label: string; status: Status; statusLabel?: string }[] = [
  { label: 'Accounts & sign-in', status: 'live' },
  { label: 'Founder & builder profiles', status: 'live' },
  { label: 'Smart Match', status: 'beta', statusLabel: 'Being tested' },
  { label: 'Messaging & community feed', status: 'live' },
  { label: 'FNDRS Copilot', status: 'dev' },
];

/** "Built, not conceptual." Real screens from the running beta, with an honest status list. */
export function ProductReality() {
  return (
    <Section aria-labelledby="product-reality" className="border-t hairline">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-6">
          <Eyebrow>Product status</Eyebrow>
          <h2 id="product-reality" className="headline-md mt-6">
            Built, not conceptual.
          </h2>
          <p className="lead mt-6 max-w-xl text-muted">
            Early beta running now. FNDRS is a working app with real accounts and profiles, in active development. These are screens from it, not mock-ups.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <ul className="border-t hairline">
            {FACTS.map((f) => (
              <li key={f.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b hairline py-3.5">
                <span className="text-[0.9375rem] text-ivory/90">{f.label}</span>
                <StatusBadge status={f.status} label={f.statusLabel} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* Phones scroll sideways inside their own track; the page itself never overflows. */}
      <RevealGroup
        as="ul"
        className="no-scrollbar -mx-5 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0"
      >
        {SCREENS.map((s) => (
          <RevealItem as="li" key={s.screen} className="w-[62vw] max-w-[17rem] shrink-0 snap-center md:w-auto md:max-w-none">
            <ProductScreenshot screen={s.screen} caption={s.label} sizes="(min-width: 768px) 24vw, 62vw" />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
