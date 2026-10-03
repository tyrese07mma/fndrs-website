'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';

import { useConsent } from './ConsentProvider';
import { consentButton } from './styles';

export function CookieBanner() {
  const { acceptAll, rejectAll, openSettings } = useConsent();
  const reduce = useReducedMotion();

  return (
    <motion.section
      role="region"
      aria-labelledby="cookie-banner-title"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-[60] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:p-0"
    >
      <div className="w-full rounded-[24px] border hairline-strong bg-ink-900 p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] sm:w-[30rem] sm:p-6">
        <p id="cookie-banner-title" className="label-mono text-gold-400">
          Cookies &amp; privacy
        </p>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
          FNDRS works without tracking. This site only uses what is strictly necessary, and optional services stay off unless you allow them. Details in our{' '}
          <Link href="/privacy#cookies" className="text-ivory underline decoration-white/25 underline-offset-4 hover:decoration-white/60">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-5 grid grid-cols-1 gap-2 xs:grid-cols-2">
          <button type="button" onClick={rejectAll} className={consentButton}>
            Reject non-essential
          </button>
          <button type="button" onClick={acceptAll} className={consentButton}>
            Accept all
          </button>
        </div>
        <button
          type="button"
          onClick={() => openSettings()}
          className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full text-[0.875rem] font-medium text-muted underline-offset-4 transition-colors hover:text-ivory hover:underline"
        >
          Manage preferences
        </button>
      </div>
    </motion.section>
  );
}
