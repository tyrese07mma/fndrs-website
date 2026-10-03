/**
 * Cookie & consent configuration. Single source of truth for the banner,
 * the settings dialog, <ConsentGate> and the privacy policy.
 *
 * Adding a service that needs consent (analytics, pixel, video embed, ...):
 *  1. list it under its category in CONSENT_SERVICES
 *  2. load it only inside <ConsentGate category="…"> (or check hasConsent)
 *  3. bump CONSENT_VERSION so every visitor is asked again
 *  4. describe it in the privacy policy (/privacy#cookies)
 */

export type OptionalCategory = 'analytics' | 'marketing' | 'externalMedia';
export type ConsentCategory = 'necessary' | OptionalCategory;

export interface ConsentService {
  name: string;
  provider: string;
  purpose: string;
}

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = 'fndrs-consent';

export const CONSENT_CATEGORIES: { id: ConsentCategory; label: string; description: string }[] = [
  {
    id: 'necessary',
    label: 'Necessary',
    description: 'Required for the website to work and to remember your choice on this banner. Always on.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description: 'Helps us understand how the website is used, for example which pages are visited.',
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Measures campaigns and shows relevant content on other platforms.',
  },
  {
    id: 'externalMedia',
    label: 'External media',
    description: 'Loads content from other platforms, such as embedded videos.',
  },
];

/** Services actually in use, per category. Keep this honest: empty means nothing is loaded. */
export const CONSENT_SERVICES: Record<ConsentCategory, ConsentService[]> = {
  necessary: [
    {
      name: 'Consent choice',
      provider: 'FNDRS Society (this website)',
      purpose: `Stores your choice in your browser's local storage under "${CONSENT_STORAGE_KEY}". No cookie, no tracking.`,
    },
  ],
  analytics: [],
  marketing: [],
  externalMedia: [],
};

export type ConsentChoices = Record<OptionalCategory, boolean>;

export interface ConsentRecord {
  version: number;
  decidedAt: string;
  choices: ConsentChoices;
}

export const NO_OPTIONAL: ConsentChoices = { analytics: false, marketing: false, externalMedia: false };
export const ALL_OPTIONAL: ConsentChoices = { analytics: true, marketing: true, externalMedia: true };

export function readConsent(): ConsentRecord | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const rec = JSON.parse(raw) as ConsentRecord;
    // A new version means the services changed: ask again.
    if (rec.version !== CONSENT_VERSION || !rec.choices) return null;
    return rec;
  } catch {
    return null;
  }
}

export function writeConsent(choices: ConsentChoices): ConsentRecord {
  const rec: ConsentRecord = { version: CONSENT_VERSION, decidedAt: new Date().toISOString(), choices };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(rec));
  } catch {
    // Storage blocked (private mode): the choice still applies for this visit.
  }
  return rec;
}
