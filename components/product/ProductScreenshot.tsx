import Image from 'next/image';

import { cn } from '@/lib/cn';
import { screens, type ScreenKey } from '@/lib/screens';

/**
 * An original app screenshot in a quiet device-less frame.
 * Screens are only scaled/cropped by layout — never redrawn.
 */
export function ProductScreenshot({
  screen,
  className,
  priority,
  sizes = '(min-width: 1024px) 380px, (min-width: 640px) 45vw, 78vw',
  caption,
  tone = 'dark',
  crop,
}: {
  screen: ScreenKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
  tone?: 'dark' | 'light';
  /** Show only the top part of the screen (0–1 of its height). */
  crop?: number;
}) {
  const s = screens[screen];
  return (
    <figure className={cn('relative', className)}>
      <div
        className={cn(
          'relative overflow-hidden rounded-[clamp(1.4rem,3.2vw,2.4rem)] border bg-ink-950',
          tone === 'dark'
            ? 'border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.6)]'
            : 'border-ink/10 shadow-[0_40px_90px_-40px_rgba(42,36,21,0.55)]',
        )}
        style={{ aspectRatio: `${s.width} / ${Math.round(s.height * (crop ?? 1))}` }}
      >
        <Image
          src={s.src}
          alt={s.alt}
          width={s.width}
          height={s.height}
          sizes={sizes}
          priority={priority}
          className="absolute inset-x-0 top-0 h-auto w-full select-none"
          draggable={false}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.06]" />
        {crop && <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-950 to-transparent" />}
      </div>
      {caption && (
        <figcaption className={cn('label-mono mt-4 text-center', tone === 'dark' ? 'text-faint' : 'text-ink-subtle')}>{caption}</figcaption>
      )}
    </figure>
  );
}
