'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';

import { cn } from '@/lib/cn';

const TABS = [
  { name: 'For you', text: 'A view of the network built around you.' },
  { name: 'Following', text: 'Only the people and startups you follow — in order. The quiet way to keep up with someone’s progress.' },
  { name: 'Trending', text: 'What the wider FNDRS network is talking about right now.' },
];

/** The three feed views as a small working tab switcher, like the one in the app. */
export function FeedTabs() {
  const [active, setActive] = useState(0);
  const base = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + TABS.length) % TABS.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Feed views" onKeyDown={onKey} className="grid grid-cols-3 gap-1 rounded-[12px] border hairline bg-ink-900 p-1">
        {TABS.map((t, i) => (
          <button
            key={t.name}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              'h-12 rounded-[8px] text-[0.9375rem] font-semibold transition-colors duration-200 sm:text-base',
              active === i ? 'bg-ivory text-ink-950' : 'text-muted hover:text-ivory',
            )}
          >
            {t.name}
          </button>
        ))}
      </div>
      <p
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${active}`}
        className="mt-6 min-h-[4.5em] max-w-xl text-[1.0625rem] leading-relaxed text-muted"
      >
        {TABS[active].text}
      </p>
    </div>
  );
}
