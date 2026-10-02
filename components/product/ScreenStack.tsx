'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

import { cn } from '@/lib/cn';
import type { ScreenKey } from '@/lib/screens';
import { ProductScreenshot } from './ProductScreenshot';

/**
 * Two or three original screens layered with gentle scroll parallax.
 * The center screen leads; side screens sit behind, slightly turned.
 */
export function ScreenStack({
  center,
  left,
  right,
  className,
  priority,
}: {
  center: ScreenKey;
  left?: ScreenKey;
  right?: ScreenKey;
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const yCenter = useTransform(p, [0, 1], reduce ? [0, 0] : [40, -40]);
  const ySide = useTransform(p, [0, 1], reduce ? [0, 0] : [90, -70]);

  return (
    <div ref={ref} className={cn('relative mx-auto flex w-full max-w-[44rem] justify-center', className)}>
      {left && (
        <motion.div
          style={{ y: ySide }}
          className="absolute left-0 top-[12%] hidden w-[38%] -rotate-[5deg] opacity-80 xs:block sm:left-[2%]"
        >
          <ProductScreenshot screen={left} sizes="(min-width: 1024px) 260px, 34vw" />
        </motion.div>
      )}
      {right && (
        <motion.div
          style={{ y: ySide }}
          className="absolute right-0 top-[12%] hidden w-[38%] rotate-[5deg] opacity-80 xs:block sm:right-[2%]"
        >
          <ProductScreenshot screen={right} sizes="(min-width: 1024px) 260px, 34vw" />
        </motion.div>
      )}
      <motion.div style={{ y: yCenter }} className={cn('relative z-10', left || right ? 'w-[58%] xs:w-[48%]' : 'w-[78%] sm:w-[62%]')}>
        <ProductScreenshot screen={center} priority={priority} sizes="(min-width: 1024px) 340px, 50vw" />
      </motion.div>
    </div>
  );
}

/** A single screen with soft parallax — for editorial sections. */
export function ParallaxScreen({
  screen,
  className,
  rotate = 0,
  crop,
  tone,
  caption,
}: {
  screen: ScreenKey;
  className?: string;
  rotate?: number;
  crop?: number;
  tone?: 'dark' | 'light';
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y, rotate }}>
        <ProductScreenshot screen={screen} crop={crop} tone={tone} caption={caption} />
      </motion.div>
    </div>
  );
}
