/**
 * Original FNDRS app screenshots (status bar cropped, otherwise untouched).
 * Regenerate with `npm run assets -- <folder>` — see scripts/prepare-assets.mjs.
 *
 * To add a new screen (e.g. a profile or feed capture), drop it into the
 * script's SCREENS map, run it, and register it here. Every component that
 * shows the app reads from this list.
 */
export interface Screen {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const SMALL = { width: 706, height: 1434 } as const;
const LARGE = { width: 920, height: 1870 } as const;

export const screens = {
  welcomeEn: {
    src: '/screens/welcome-en.webp',
    ...SMALL,
    alt: 'FNDRS welcome screen: "Where founders find their people." with a Smart Match teaser card and Create account button.',
  },
  welcomeDe: {
    src: '/screens/welcome-de.webp',
    ...SMALL,
    alt: 'FNDRS welcome screen in German: "Hier finden Founder ihr Team." with the Smart Match introduction.',
  },
  welcomeIntros: {
    src: '/screens/welcome-intros-de.webp',
    ...SMALL,
    alt: 'FNDRS welcome screen showing the personal introductions slide.',
  },
  smartMatch: {
    src: '/screens/smart-match.webp',
    ...LARGE,
    alt: 'Smart Match tab in the FNDRS app with daily swipes, pass, superlike and connect controls.',
  },
  signUp: {
    src: '/screens/sign-up.webp',
    ...LARGE,
    alt: 'FNDRS sign-up screen: "Werde Teil der Society." with name, email and password fields.',
  },
  signIn: {
    src: '/screens/sign-in.webp',
    ...LARGE,
    alt: 'FNDRS sign-in screen: "Willkommen zurück." with email and password fields.',
  },
  discoverTop: {
    src: '/screens/discover-top.webp',
    ...SMALL,
    alt: 'Discover tab in the FNDRS app: search, FNDRS Pro card and tiles for Startups, Opportunities, Events, Communities, Investors, Mentors, Knowledge and Challenges.',
  },
  discoverGrid: {
    src: '/screens/discover-grid.webp',
    ...LARGE,
    alt: 'Discover tiles in the FNDRS app followed by the FNDRS Copilot entry and popular startups.',
  },
  discoverFeed: {
    src: '/screens/discover-feed.webp',
    ...LARGE,
    alt: 'Discover tab showing FNDRS Copilot, popular startups, upcoming events and founders that fit you with a fit score.',
  },
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof screens;
