import {
  BookOpen,
  Bot,
  Building2,
  Compass,
  Crown,
  GraduationCap,
  HelpCircle,
  Info,
  LayoutGrid,
  Mail,
  Map,
  MessagesSquare,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  UserRound,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

export interface PageInfo {
  href: string;
  /** Short name used in nav, footer and breadcrumbs. */
  label: string;
  /** One line used in dropdowns and "keep exploring" cards. */
  blurb: string;
  /** <title> — kept distinct per page. */
  title: string;
  /** Meta description — written per page, never shared. */
  description: string;
  icon: LucideIcon;
  /** Breadcrumb parent. */
  parent?: string;
}

const P = <T extends Record<string, PageInfo>>(pages: T) => pages;

export const pages = P({
  home: {
    href: '/',
    label: 'Home',
    blurb: 'Find the people you should be building with.',
    title: "FNDRS Society — Don't build alone",
    description:
      'FNDRS Society is where founders, builders, mentors and investors find each other — matched on what they build, what they can do and who they are looking for.',
    icon: Sparkles,
  },
  product: {
    href: '/product',
    label: 'Overview',
    blurb: 'Everything inside FNDRS, in one place.',
    title: 'Product overview',
    description:
      'Smart Match, Discover, Community, Profiles, Startups, Copilot and Pro — a tour of how the FNDRS app fits together and what each part is for.',
    icon: LayoutGrid,
  },
  smartMatch: {
    href: '/smart-match',
    label: 'Smart Match',
    blurb: 'Connections based on relevance, not follower counts.',
    title: 'Smart Match — relevance over reach',
    description:
      'How FNDRS Smart Match reads skills, roles, industries, stage and what people are looking for to surface the few people worth talking to.',
    icon: Sparkles,
    parent: '/product',
  },
  discover: {
    href: '/discover',
    label: 'Discover',
    blurb: 'People, startups, communities, events and opportunities.',
    title: 'Discover — the people and ideas around what you build',
    description:
      'Discover founders, startups, communities, events, mentors, investors and opportunities on FNDRS — organised around what you are actually building.',
    icon: Compass,
    parent: '/product',
  },
  community: {
    href: '/community',
    label: 'Community',
    blurb: 'Post with a purpose: updates, milestones, looking for.',
    title: 'Community & Feed — post with a purpose',
    description:
      'The FNDRS feed is built around three post types — Update, Milestone and Looking for — so every post can turn into a conversation or a team.',
    icon: MessagesSquare,
    parent: '/product',
  },
  profiles: {
    href: '/profiles',
    label: 'Profiles',
    blurb: 'More than a résumé.',
    title: 'Founder Profiles — more than a résumé',
    description:
      'A FNDRS profile shows what you can do, what you are building and who you are looking for — the signals Smart Match and Discover are built on.',
    icon: UserRound,
    parent: '/product',
  },
  startups: {
    href: '/startups',
    label: 'Startups',
    blurb: 'Build in public. Build together.',
    title: 'Startup Profiles — build in public, build together',
    description:
      'Give your startup its own page on FNDRS: what it does, which stage it is at, who is on the team and which skills you still need.',
    icon: Rocket,
    parent: '/product',
  },
  copilot: {
    href: '/copilot',
    label: 'FNDRS Copilot',
    blurb: 'A second brain for building. In development.',
    title: 'FNDRS Copilot — a second brain for building',
    description:
      'FNDRS Copilot is an assistant in development that will help you structure ideas, plan next steps and think through startup decisions — with context from your network.',
    icon: Bot,
    parent: '/product',
  },
  pro: {
    href: '/pro',
    label: 'FNDRS Pro',
    blurb: 'Advanced tools for serious builders. Coming soon.',
    title: 'FNDRS Pro — for people serious about building',
    description:
      'FNDRS stays free at its core. FNDRS Pro will add advanced tools for people who are actively building. Pricing is not final yet.',
    icon: Crown,
    parent: '/product',
  },
  howItWorks: {
    href: '/how-it-works',
    label: 'How FNDRS works',
    blurb: 'The full path from sign-up to shipping.',
    title: 'How FNDRS works — from profile to team',
    description:
      'Ten steps from creating your account to growing your network: how people use FNDRS to find who they should be building with.',
    icon: Map,
  },
  forFounders: {
    href: '/for-founders',
    label: 'For Founders',
    blurb: "You don't have to build it alone.",
    title: 'FNDRS for Founders — find your co-founder and team',
    description:
      'Find a co-founder, developers, designers and marketers, meet other founders, discover mentors and investors and share your progress on FNDRS.',
    icon: Rocket,
  },
  forBuilders: {
    href: '/for-builders',
    label: 'For Builders',
    blurb: 'Developers, designers, marketers, product people.',
    title: 'FNDRS for Builders — find something worth building',
    description:
      'Developers, designers, marketers and product people use FNDRS to find startups, join early projects and meet founders who need exactly their skills.',
    icon: Wrench,
  },
  forInvestors: {
    href: '/for-investors',
    label: 'For Investors',
    blurb: "Discover what's being built, early.",
    title: 'FNDRS for Investors — see what is being built early',
    description:
      'Follow founders, teams and startups from the idea stage onwards. FNDRS gives investors context on people, industries, stages and progress.',
    icon: TrendingUp,
  },
  forMentors: {
    href: '/for-mentors',
    label: 'For Mentors',
    blurb: 'Experience should travel.',
    title: 'FNDRS for Mentors — share experience where it matters',
    description:
      'Mentors on FNDRS make their expertise visible, find founders who need it and support early teams without a cold inbox.',
    icon: GraduationCap,
  },
  about: {
    href: '/about',
    label: 'About FNDRS',
    blurb: 'Why we are building this.',
    title: 'About — why FNDRS exists',
    description:
      'Ideas are everywhere. The right people are not. Why FNDRS Society exists, what we believe and how we are building it.',
    icon: Info,
  },
  contact: {
    href: '/contact',
    label: 'Contact',
    blurb: 'Questions, feedback, partnerships.',
    title: 'Contact FNDRS',
    description: 'Get in touch with the FNDRS team about the app, partnerships, press or the early access programme.',
    icon: Mail,
  },
  earlyAccess: {
    href: '/early-access',
    label: 'Early Access',
    blurb: 'Join the first people building FNDRS with us.',
    title: 'Early Access — be early to FNDRS',
    description:
      'FNDRS is in early beta. Request early access and help shape the network for founders, builders, mentors and investors.',
    icon: Sparkles,
  },
  faq: {
    href: '/faq',
    label: 'FAQ',
    blurb: 'Straight answers about FNDRS.',
    title: 'FAQ — questions about FNDRS',
    description:
      'Answers about what FNDRS is, who it is for, how matching works, what is free, what is still in development and how your data is handled.',
    icon: HelpCircle,
  },
  roadmap: {
    href: '/roadmap',
    label: 'Roadmap',
    blurb: "What's live, what's next.",
    title: 'Roadmap — what is live and what is next',
    description:
      'An honest look at what is already in the FNDRS app, what is being built right now and what comes later.',
    icon: Building2,
  },
  security: {
    href: '/security',
    label: 'Security & Privacy',
    blurb: 'How we treat your profile and data.',
    title: 'Security & Privacy at FNDRS',
    description:
      'How FNDRS handles visibility, messaging permissions and your data — and the controls you have over your own profile.',
    icon: Shield,
  },
  privacy: {
    href: '/privacy',
    label: 'Privacy',
    blurb: 'Privacy policy.',
    title: 'Privacy Policy',
    description: 'How FNDRS Society processes personal data on this website and in the app.',
    icon: Shield,
  },
  imprint: {
    href: '/imprint',
    label: 'Imprint',
    blurb: 'Legal notice.',
    title: 'Imprint',
    description: 'Legal notice for FNDRS Society.',
    icon: BookOpen,
  },
});

export type PageKey = keyof typeof pages;

export const byHref = Object.fromEntries(Object.values(pages).map((p) => [p.href, p])) as Record<string, PageInfo>;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavGroup {
  label: string;
  href?: string;
  items?: PageKey[];
  /** Optional teaser shown at the bottom of a dropdown. */
  footer?: { label: string; href: string };
}

export const mainNav: NavGroup[] = [
  {
    label: 'Product',
    items: ['product', 'smartMatch', 'community', 'profiles', 'startups', 'copilot', 'pro'],
    footer: { label: 'See how FNDRS works', href: '/how-it-works' },
  },
  { label: 'Discover', href: '/discover' },
  {
    label: 'Solutions',
    items: ['forFounders', 'forBuilders', 'forInvestors', 'forMentors'],
  },
  {
    label: 'Resources',
    items: ['howItWorks', 'faq', 'earlyAccess', 'roadmap'],
  },
  {
    label: 'About',
    items: ['about', 'contact'],
  },
];

export const footerNav: { title: string; items: PageKey[] }[] = [
  { title: 'Product', items: ['smartMatch', 'discover', 'community', 'profiles', 'startups', 'copilot', 'pro'] },
  { title: 'Solutions', items: ['forFounders', 'forBuilders', 'forInvestors', 'forMentors'] },
  { title: 'Resources', items: ['howItWorks', 'faq', 'roadmap', 'earlyAccess'] },
  { title: 'Company', items: ['about', 'contact', 'security'] },
  { title: 'Legal', items: ['privacy', 'imprint'] },
];
