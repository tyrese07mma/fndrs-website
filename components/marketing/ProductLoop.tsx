import { RotateCcw } from 'lucide-react';

import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

const STEPS = [
  ['Create your profile', 'Skills, role, stage — and who you are looking for.'],
  ['Discover', 'People, startups, communities and events around your work.'],
  ['Match', 'Smart Match surfaces the few people who fit.'],
  ['Talk', 'Matches open a direct conversation.'],
  ['Build', 'Turn a good conversation into a team or a project.'],
  ['Share progress', 'Updates and milestones keep your network close.'],
  ['Grow your network', 'Every step makes the next match more relevant.'],
] as const;

/** The FNDRS product loop: seven steps that feed back into each other. */
export function ProductLoop() {
  return (
    <div className="relative">
      <RevealGroup as="ol" className="relative grid gap-0 lg:grid-cols-7 lg:gap-4">
        {/* connecting line */}
        <span aria-hidden className="absolute bottom-6 left-[11px] top-6 w-px bg-ink/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[11px] lg:h-px lg:w-auto" />
        {STEPS.map(([title, text], i) => (
          <RevealItem as="li" key={title} className="relative flex gap-6 pb-10 last:pb-0 lg:block lg:pb-0">
            <span aria-hidden className="relative z-10 mt-0.5 inline-flex size-[23px] shrink-0 items-center justify-center rounded-full border border-ink/20 bg-paper lg:mt-0">
              <span className="size-[7px] rounded-full bg-ink" />
            </span>
            <div className="lg:mt-8 lg:pr-2">
              <span className="font-mono text-[0.75rem] text-gold-700">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-[1.0625rem] font-semibold uppercase leading-tight tracking-[-0.01em] lg:text-[0.9375rem]">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted lg:text-[0.875rem]">{text}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
      <p className="mt-12 inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-paper-50 px-4 py-2 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-muted">
        <RotateCcw aria-hidden className="size-3.5" /> And around again — a bigger network, better matches
      </p>
    </div>
  );
}
