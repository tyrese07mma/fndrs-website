import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/primitives';
import { Reveal } from '@/components/ui/Reveal';

export interface Step {
  title: string;
  /** One line for overviews (the step rail). */
  summary?: string;
  body: ReactNode;
  details?: string[];
  media?: ReactNode;
  link?: { href: string; label: string };
  status?: ReactNode;
}

/** Long-form numbered walkthrough (How it works). Sticky step numbers on desktop. */
export function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol>
      {steps.map((s, i) => {
        const n = String(i + 1).padStart(2, '0');
        return (
          <li key={s.title} id={`step-${n}`} className="border-t hairline py-16 sm:py-24">
            <Container wide>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-32">
                    <p className="label-mono text-subtle">Step</p>
                    <p className="mt-2 font-mono text-[clamp(3.5rem,2rem+5vw,6.5rem)] font-medium leading-none tracking-[-0.06em] text-ivory/90">{n}</p>
                  </div>
                </div>
                <div className={cn(s.media ? 'lg:col-span-5' : 'lg:col-span-7')}>
                  <Reveal>
                    {s.status && <div className="mb-5">{s.status}</div>}
                    <h2 className="headline-md">{s.title}</h2>
                    <div className="lead mt-6 space-y-4 text-muted">{s.body}</div>
                  </Reveal>
                  {s.details && (
                    <Reveal delay={0.1}>
                      <ul className="mt-9 space-y-3 border-l hairline-strong pl-5">
                        {s.details.map((d) => (
                          <li key={d} className="text-[0.9375rem] leading-relaxed text-ivory/85">
                            {d}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  )}
                  {s.link && (
                    <Reveal delay={0.15}>
                      <Link href={s.link.href} className="group mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-ivory">
                        {s.link.label}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </Link>
                    </Reveal>
                  )}
                </div>
                {s.media && <div className="lg:col-span-4">{s.media}</div>}
              </div>
            </Container>
          </li>
        );
      })}
    </ol>
  );
}
