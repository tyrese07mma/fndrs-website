import { ArrowDown, ArrowRight, Check, Sparkles } from 'lucide-react';

import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';

const SIGNALS = ['Skills', 'Role', 'Industry', 'Location', 'Stage', 'Goals', 'Looking for', 'Open to', 'Interests'];

function PersonCard({
  tag,
  initial,
  role,
  industry,
  looking,
  open,
  accent,
}: {
  tag: string;
  initial: string;
  role: string;
  industry: string;
  looking: string;
  open?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-[26px] border hairline bg-ink-900 p-6 sm:p-7">
      <div className="flex items-center gap-4">
        <span
          className={cn(
            'inline-flex size-12 items-center justify-center rounded-full border-2 bg-[#3a3d2e] text-[1.125rem] font-semibold',
            accent ? 'border-gold-500' : 'border-ink-950',
          )}
        >
          {initial}
        </span>
        <div>
          <p className="label-mono text-subtle">{tag}</p>
          <p className="mt-1.5 text-[1.125rem] font-semibold tracking-[-0.015em]">{role}</p>
        </div>
      </div>
      <dl className="mt-6 space-y-3 border-t hairline pt-5 text-[0.875rem]">
        <div className="flex justify-between gap-4">
          <dt className="text-subtle">Industry</dt>
          <dd className="font-medium">{industry}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-subtle">Looking for</dt>
          <dd className="font-medium">{looking}</dd>
        </div>
        {open && (
          <div className="flex justify-between gap-4">
            <dt className="text-subtle">Open to</dt>
            <dd className="font-medium">{open}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

/**
 * YOU → MATCH ENGINE → FOUNDER. Illustrative example; reasons mirror the
 * rules the app's fit scoring actually uses.
 */
export function MatchFlow() {
  return (
    <div>
      <div className="grid items-center gap-4 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr] lg:gap-6">
        <Reveal>
          <PersonCard tag="You" initial="Y" role="Frontend Developer" industry="SaaS" looking="A founder" open="Co-founding" accent />
        </Reveal>

        <Connector />

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[26px] border border-gold-500/30 bg-gradient-to-b from-gold-500/[0.09] to-transparent p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-[12px] bg-gold-500/15 text-gold-400">
                <Sparkles className="size-5" aria-hidden />
              </span>
              <p className="label-mono text-gold-400">Match engine</p>
            </div>
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">Reads both profiles and checks whether each side has what the other is looking for.</p>
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {SIGNALS.map((s) => (
                <li key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-ivory/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Connector />

        <Reveal delay={0.2}>
          <PersonCard tag="Founder" initial="F" role="Business Development" industry="SaaS" looking="A developer" open="Co-founding" />
        </Reveal>
      </div>

      <Reveal delay={0.2}>
        <div className="mt-6 grid gap-px overflow-hidden rounded-[26px] border border-gold-500/25 bg-gold-500/15 md:grid-cols-2">
          {[
            ['Does the founder have what you are looking for?', 'Yes: business skills and a SaaS idea.'],
            ['Are you what the founder is looking for?', 'Yes: they need a developer.'],
          ].map(([q, a], i) => (
            <div key={q} className="bg-ink-950 p-6 sm:p-7">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-gold-400">Check {i + 1}</p>
              <p className="mt-3 text-[1.0625rem] font-semibold leading-snug">{q}</p>
              <p className="mt-2 flex items-center gap-2 text-[0.9375rem] text-muted">
                <Check aria-hidden className="size-4 shrink-0 text-gold-500" />
                {a}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-[0.9375rem] text-muted">
          A match ranks highest when <span className="text-ivory">both answers are yes</span>. One-sided fit ranks lower.
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-6 rounded-[26px] border hairline bg-ink-900/60 p-6 sm:p-8">
          <p className="label-mono text-subtle">Why this match is relevant</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Both building in SaaS', 'Shared industry is the strongest base signal.'],
              ['Has what you are looking for', 'You want a founder with business skills — they bring them.'],
              ['Looking for what you bring', 'They need a developer. That is you.'],
              ['Open to co-founding', 'Both sides said they are open to it.'],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <Check aria-hidden className="mt-1 size-4 shrink-0 text-gold-500" />
                <div>
                  <p className="text-[0.9375rem] font-semibold">{t}</p>
                  <p className="mt-1 text-[0.875rem] leading-relaxed text-subtle">{d}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t hairline pt-5 text-[0.8125rem] text-faint">
            Illustrative example. In the app, each match shows a fit score and the reasons behind it.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function Connector() {
  return (
    <div aria-hidden className="flex justify-center text-faint">
      <ArrowDown className="size-5 lg:hidden" />
      <ArrowRight className="hidden size-5 lg:block" />
    </div>
  );
}
