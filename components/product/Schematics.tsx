import { Flag, Heart, MessageCircle, Search, Send, TrendingUp, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/*
 * Schematic illustrations built from the app's visual vocabulary (cards,
 * chips, mono labels). They explain structure; they are captioned as
 * illustrations and never pretend to be screenshots.
 */

function Frame({ children, className, caption }: { children: ReactNode; className?: string; caption?: string }) {
  return (
    <figure className={className}>
      <div className="rounded-[16px] border hairline bg-ink-900 p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)] sm:p-6">{children}</div>
      {caption && <figcaption className="label-mono mt-4 text-center text-faint">{caption}</figcaption>}
    </figure>
  );
}

function MiniChip({ children, gold }: { children: ReactNode; gold?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-7 items-center rounded-full border px-3 text-[0.75rem] font-medium',
        gold ? 'border-gold-500/40 bg-gold-500/10 text-gold-400' : 'border-white/10 bg-white/[0.04] text-ivory/80',
      )}
    >
      {children}
    </span>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t hairline pt-4">
      <p className="label-mono text-subtle">{label}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

export type PostKind = 'update' | 'milestone' | 'looking_for';

const KIND: Record<PostKind, { label: string; icon: LucideIcon; cls: string }> = {
  update: { label: 'Update', icon: TrendingUp, cls: 'text-ivory/80 border-white/10 bg-white/[0.04]' },
  milestone: { label: 'Milestone', icon: Flag, cls: 'text-gold-400 border-gold-500/35 bg-gold-500/10' },
  looking_for: { label: 'Looking for', icon: Search, cls: 'text-ink-950 border-ivory bg-ivory' },
};

export function PostSchematic({
  kind,
  author,
  body,
  tags = [],
  className,
  highlight,
}: {
  kind: PostKind;
  author: string;
  body: string;
  tags?: string[];
  className?: string;
  highlight?: boolean;
}) {
  const k = KIND[kind];
  const Icon = k.icon;
  return (
    <div
      className={cn(
        'rounded-[12px] border bg-ink-900 p-5 sm:p-6',
        highlight ? 'border-white/20 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]' : 'hairline',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#2e3a37] text-[0.8125rem] font-semibold">{author[0]}</span>
          <div>
            <p className="text-[0.875rem] font-semibold">{author}</p>
            <p className="text-[0.75rem] text-subtle">Example post</p>
          </div>
        </div>
        <span className={cn('inline-flex h-7 items-center gap-1.5 rounded-full border px-3 font-mono text-[0.625rem] uppercase tracking-[0.12em]', k.cls)}>
          <Icon className="size-3" aria-hidden />
          {k.label}
        </span>
      </div>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ivory/90">{body}</p>
      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <MiniChip key={t}>{t}</MiniChip>
          ))}
        </div>
      )}
      <div className="mt-5 flex items-center gap-5 border-t hairline pt-4 text-[0.8125rem] text-subtle">
        <span className="inline-flex items-center gap-1.5">
          <Heart className="size-4" aria-hidden /> Like
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="size-4" aria-hidden /> Comment
        </span>
        {kind === 'looking_for' && (
          <span className="ml-auto inline-flex items-center gap-1.5 font-medium text-ivory">
            <Send className="size-4 text-gold-500" aria-hidden /> Message author
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

export function StartupSchematic({ className }: { className?: string }) {
  return (
    <Frame className={className} caption="Illustration · structure of a startup profile">
      <div className="overflow-hidden rounded-[12px] border hairline bg-ink-850">
        <div className="h-24 bg-gradient-to-br from-[#4a2f31] via-[#2c2223] to-ink-850" />
        <div className="-mt-9 px-5 pb-5">
          <span className="inline-flex size-16 items-center justify-center rounded-[10px] border border-white/10 bg-[#3a2425] text-2xl font-semibold">S</span>
          <p className="mt-4 text-[1.25rem] font-semibold tracking-[-0.02em]">Your startup</p>
          <p className="mt-1 text-[0.875rem] text-muted">One line on what you are building and for whom.</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <MiniChip>Fintech</MiniChip>
            <MiniChip>MVP</MiniChip>
            <MiniChip>Remote · CET</MiniChip>
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        <Block label="Team">
          <div className="flex -space-x-2">
            {['Y', 'A', '+'].map((l, i) => (
              <span key={i} className="inline-flex size-9 items-center justify-center rounded-full border-2 border-ink-900 bg-[#3a3d2e] text-[0.75rem] font-semibold">
                {l}
              </span>
            ))}
          </div>
        </Block>
        <Block label="Skills needed">
          <MiniChip gold>Mobile engineering</MiniChip>
          <MiniChip gold>Growth</MiniChip>
        </Block>
        <Block label="Progress">
          <ol className="w-full space-y-2.5 text-[0.8125rem]">
            {[
              ['Milestone', 'First 50 beta users'],
              ['Update', 'Shipped onboarding v2'],
              ['Milestone', 'MVP launched'],
            ].map(([k, t]) => (
              <li key={t} className="flex items-center gap-3">
                <span className={cn('size-1.5 rounded-full', k === 'Milestone' ? 'bg-gold-500' : 'bg-white/40')} />
                <span className="text-ivory/85">{t}</span>
                <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">{k}</span>
              </li>
            ))}
          </ol>
        </Block>
      </div>
    </Frame>
  );
}

/* ---------------------------------------------------------------- */

/** What the app shows for Copilot today — quoted word for word, not mocked up. */
export function CopilotInApp({ className }: { className?: string }) {
  return (
    <figure className={cn('border-l-2 border-[#7c97c7]/60 pl-6', className)}>
      <p className="label-mono text-subtle">In the app today · Discover tab</p>
      <blockquote className="mt-4 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold leading-tight tracking-[-0.03em]">
        &ldquo;Copilot is not enabled yet.&rdquo;
      </blockquote>
      <figcaption className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-subtle">
        That is what the FNDRS Copilot entry says in the app — because it isn&rsquo;t switched on yet.
      </figcaption>
    </figure>
  );
}

/* ---------------------------------------------------------------- */

/** The Copilot prompt starters that exist in the app, shown as a list (not a chat mock). */
export function CopilotPrompts({ prompts, className }: { prompts: { icon: LucideIcon; title: string; prompt: string }[]; className?: string }) {
  return (
    <ul className={cn('border-t hairline', className)}>
      {prompts.map((p) => {
        const Icon = p.icon;
        return (
          <li key={p.title} className="flex items-start gap-4 border-b hairline py-4 sm:py-5">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-ivory text-ink-950">
              <Icon className="size-[18px]" aria-hidden />
            </span>
            <div>
              <p className="text-[0.9375rem] font-semibold">{p.title}</p>
              <p className="mt-1 text-[0.875rem] leading-relaxed text-subtle">&ldquo;{p.prompt}&rdquo;</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
