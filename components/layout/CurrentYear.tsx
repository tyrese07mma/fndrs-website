'use client';

/** The visitor's current year, so a statically built footer never shows a stale copyright. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
