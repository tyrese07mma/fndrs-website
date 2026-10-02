'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/** Floating "back to top" button. Appears once the visitor has scrolled a screen and a half. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          title="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border hairline-strong bg-ink-900/85 text-ivory shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-colors duration-300 hover:border-ivory hover:bg-ivory hover:text-ink-950 sm:right-8 sm:size-14"
        >
          <ArrowUp className="size-5 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
