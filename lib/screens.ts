/**
 * Original FNDRS app screenshots (English, app version 2.0.0). Status bar cropped and the
 * floating dev-menu button painted out; otherwise untouched.
 * Regenerate with `npm run assets -- <folder>` — see scripts/prepare-assets.mjs.
 *
 * To add a new screen, drop it into the script's SCREENS map, run it, and register it
 * here. Every component that shows the app reads from this list.
 */
export interface Screen {
  src: string;
  width: number;
  height: number;
  alt: string;
}

const SIZE = { width: 920, height: 1874 } as const;

export const screens = {
  welcomeEn: {
    src: '/screens/welcome-en-v3.webp',
    ...SIZE,
    alt: 'FNDRS welcome screen: "Where founders find their people." with a Smart Match teaser card and a Create account button.',
  },
  signUp: {
    src: '/screens/sign-up-v3.webp',
    ...SIZE,
    alt: 'FNDRS sign-up screen: "Join the Society." with fields for full name, email and a password of at least 12 characters.',
  },
  home: {
    src: '/screens/home-v3.webp',
    ...SIZE,
    alt: 'FNDRS home tab: Smart Match and profile cards, a composer for milestones, hiring posts, polls and questions, and the For you, Following and Trending feeds.',
  },
  smartMatch: {
    src: '/screens/smart-match-v3.webp',
    ...SIZE,
    alt: 'Smart Match tab: 25 free swipes left today, an all-caught-up state with Adjust filters, and the pass, superlike and connect controls.',
  },
  discover: {
    src: '/screens/discover-v3.webp',
    ...SIZE,
    alt: 'Discover tab: search, the FNDRS Pro card saying paid plans are not available yet, and tiles for Startups, Opportunities, Events, Spaces, Investors, Mentors, Knowledge and Challenges.',
  },
  profile: {
    src: '/screens/profile-v3.webp',
    ...SIZE,
    alt: 'A FNDRS profile with role and stage tags, open to co-founding, followers, founder score, level and a profile-strength checklist.',
  },
  settingsPrivacy: {
    src: '/screens/settings-privacy-v3.webp',
    ...SIZE,
    alt: 'FNDRS privacy settings: export my data, blocked members, show my location, discoverable in Smart Match, who can message me, support and delete account.',
  },
  editProfile: {
    src: '/screens/edit-profile-v3.webp',
    ...SIZE,
    alt: 'Edit profile in FNDRS: chips for role, stage, up to five industries and up to six skills.',
  },
  editProfileIntent: {
    src: '/screens/edit-profile-intent-v3.webp',
    ...SIZE,
    alt: 'Edit profile in FNDRS: "Looking for — powers Smart Match" and "Open to" chips, plus website, LinkedIn and X links.',
  },
  analyticsViewers: {
    src: '/screens/analytics-viewers-v3.webp',
    ...SIZE,
    alt: 'FNDRS profile analytics: who viewed you, with visitor details reserved for a paid plan.',
  },
  search: {
    src: '/screens/search-v3.webp',
    ...SIZE,
    alt: 'FNDRS search with trending topics such as AI / ML, Fundraising, Co-founder, Climate, Berlin, Hiring, SaaS and Pitch Night.',
  },
  launchStartup: {
    src: '/screens/launch-startup-v3.webp',
    ...SIZE,
    alt: '"Launch on FNDRS" form: startup name, tagline, website, industry and stage.',
  },
  hostEvent: {
    src: '/screens/host-event-v3.webp',
    ...SIZE,
    alt: '"Host an event" form: title, format such as meetup, pitch night, workshop, masterclass or office hours, date and start time.',
  },
} satisfies Record<string, Screen>;

export type ScreenKey = keyof typeof screens;
