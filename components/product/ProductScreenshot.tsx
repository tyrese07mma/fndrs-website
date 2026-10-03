import Image from 'next/image';

import { cn } from '@/lib/cn';
import { screens, type ScreenKey } from '@/lib/screens';

/**
 * An original app screenshot. Screens are only scaled/cropped by layout — never redrawn.
 *
 * - `frame="device"`: the quiet phone-like frame (large radius, deep shadow).
 * - `frame="flat"`: the bare interface with a fine edge — for UI details and strips.
 * - `crop`: show only the top part of the screen (0–1 of its height), fading out.
 * - `region`: show a horizontal slice of the screen ({ y, h } as 0–1 of its height).
 */
export function ProductScreenshot({
  screen,
  className,
  priority,
  sizes = '(min-width: 1024px) 380px, (min-width: 640px) 45vw, 78vw',
  caption,
  tone = 'dark',
  crop,
  region,
  frame = 'device',
  fade = true,
}: {
  screen: ScreenKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
  tone?: 'dark' | 'light';
  crop?: number;
  region?: { y: number; h: number };
  frame?: 'device' | 'flat';
  /** Fade a top crop into the background. */
  fade?: boolean;
}) {
  const s = screens[screen];
  const win = region ?? { y: 0, h: crop ?? 1 };
  return (
    <figure className={cn('relative', className)}>
      <div
        className={cn(
          'relative overflow-hidden border bg-ink-950',
          frame === 'device' && 'rounded-[clamp(1.25rem,2.8vw,2rem)]',
          frame === 'flat' && 'rounded-[10px]',
          tone === 'dark'
            ? frame === 'device'
              ? 'border-white/10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(0,0,0,0.6)]'
              : 'border-white/10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]'
            : 'border-ink/10 shadow-[0_40px_90px_-40px_rgba(42,36,21,0.55)]',
        )}
        style={{ aspectRatio: `${s.width} / ${Math.round(s.height * win.h)}` }}
      >
        <Image
          src={s.src}
          alt={s.alt}
          width={s.width}
          height={s.height}
          sizes={sizes}
          priority={priority}
          className="absolute inset-x-0 h-auto w-full select-none"
          style={{ top: `${-(win.y / win.h) * 100}%` }}
          draggable={false}
        />
        {frame === 'device' && <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.06]" />}
        {crop && fade && <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink-950 to-transparent" />}
      </div>
      {caption && (
        <figcaption className={cn('label-mono mt-4', frame === 'device' && 'text-center', tone === 'dark' ? 'text-faint' : 'text-ink-subtle')}>{caption}</figcaption>
      )}
    </figure>
  );
}
