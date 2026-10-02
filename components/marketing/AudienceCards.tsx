import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { pages, type PageKey } from '@/lib/pages';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';

const AUDIENCES: { key: PageKey; title: string; line: string }[] = [
  { key: 'forFounders', title: 'Founders', line: 'Find a co-founder, a first team and people who have done it before.' },
  { key: 'forBuilders', title: 'Builders', line: 'Developers, designers and marketers looking for something worth building.' },
  { key: 'forInvestors', title: 'Investors', line: 'See founders and startups early — with context, not just a pitch deck.' },
  { key: 'forMentors', title: 'Mentors', line: 'Put your experience where it actually changes the outcome.' },
];

/** Four large audience tiles. Each opens its Solutions page. */
export function AudienceCards() {
  return (
    <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2">
      {AUDIENCES.map((a, i) => {
        const Icon = pages[a.key].icon;
        return (
          <RevealItem as="li" key={a.key}>
            <Link
              href={pages[a.key].href}
              className="group relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-[28px] border hairline bg-ink-900 p-7 transition-colors duration-500 hover:border-white/15 hover:bg-ink-850 sm:min-h-[22rem] sm:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[0.8125rem] text-faint">0{i + 1}</span>
                <span className="inline-flex size-11 items-center justify-center rounded-full border hairline-strong text-muted transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-ivory group-hover:bg-ivory group-hover:text-ink-950">
                  <ArrowUpRight className="size-5" aria-hidden />
                </span>
              </div>
              <div>
                <Icon aria-hidden strokeWidth={1.5} className="mb-6 size-7 text-gold-500" />
                <h3 className="text-[clamp(2.25rem,1.6rem+2.6vw,4rem)] font-bold uppercase leading-none tracking-[-0.04em]">{a.title}</h3>
                <p className="mt-4 max-w-[30ch] text-[1rem] leading-relaxed text-muted">{a.line}</p>
              </div>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
