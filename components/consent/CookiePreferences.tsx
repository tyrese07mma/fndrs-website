'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';
import { CONSENT_CATEGORIES, CONSENT_SERVICES, NO_OPTIONAL, type ConsentChoices, type OptionalCategory } from '@/lib/consent';
import { useConsent } from './ConsentProvider';
import { consentButton } from './styles';

function Switch({ checked, disabled, onChange, label }: { checked: boolean; disabled?: boolean; onChange?: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-200 disabled:cursor-not-allowed',
        checked ? 'border-ivory bg-ivory' : 'border-white/20 bg-ink-800',
        disabled && 'opacity-60',
      )}
    >
      <span
        aria-hidden
        className={cn('inline-block size-5 rounded-full transition-transform duration-200', checked ? 'translate-x-[1.375rem] bg-ink-950' : 'translate-x-1 bg-muted')}
      />
    </button>
  );
}

/** Cookie settings dialog. Opened from the banner, the footer and the privacy policy. */
export function CookiePreferences({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { record, save, acceptAll, rejectAll } = useConsent();
  const reduce = useReducedMotion();
  const [choices, setChoices] = useState<ConsentChoices>(NO_OPTIONAL);
  const panel = useRef<HTMLDivElement>(null);

  // Start from the saved choice every time the dialog opens.
  useEffect(() => {
    if (open) setChoices(record?.choices ?? NO_OPTIONAL);
  }, [open, record]);

  // Modal behaviour: lock scroll, focus inside, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const items = [...panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      html.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:items-center sm:p-6"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex max-h-[88dvh] w-full max-w-[34rem] flex-col overflow-hidden rounded-[16px] border hairline-strong bg-ink-900 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-start justify-between gap-4 border-b hairline px-6 pb-5 pt-6">
              <div>
                <p className="label-mono text-gold-400">Privacy</p>
                <h2 id="cookie-settings-title" className="mt-2 text-[1.5rem] font-bold tracking-[-0.025em]">
                  Cookie settings
                </h2>
              </div>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                aria-label="Close cookie settings"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-[8px] border hairline-strong text-muted transition-colors hover:text-ivory"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-2">
              <p className="py-4 text-[0.9375rem] leading-relaxed text-muted">
                Choose which optional services this website may load. Optional categories are off by default, and you can change your choice here at any time.
              </p>
              <ul className="border-t hairline">
                {CONSENT_CATEGORIES.map((cat) => {
                  const services = CONSENT_SERVICES[cat.id];
                  const necessary = cat.id === 'necessary';
                  const checked = necessary || choices[cat.id as OptionalCategory];
                  return (
                    <li key={cat.id} className="border-b hairline py-5 last:border-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-2 text-[1rem] font-semibold">
                            {cat.label}
                            {necessary && <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-subtle">Always on</span>}
                          </p>
                          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-subtle">{cat.description}</p>
                        </div>
                        <Switch
                          checked={checked}
                          disabled={necessary}
                          label={`${cat.label}${necessary ? ' (always on)' : ''}`}
                          onChange={(v) => setChoices((c) => ({ ...c, [cat.id]: v }))}
                        />
                      </div>
                      <div className="mt-3 rounded-[10px] bg-ink-800/70 px-4 py-3 text-[0.8125rem] leading-relaxed">
                        {services.length ? (
                          <ul className="space-y-2">
                            {services.map((s) => (
                              <li key={s.name}>
                                <span className="font-medium text-ivory/90">{s.name}</span>
                                <span className="text-subtle"> · {s.provider}</span>
                                <span className="mt-0.5 block text-subtle">{s.purpose}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-subtle">No services in use right now.</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-2 border-t hairline px-6 pb-6 pt-5 xs:grid-cols-2">
              <button type="button" onClick={rejectAll} className={consentButton}>
                Reject non-essential
              </button>
              <button type="button" onClick={acceptAll} className={consentButton}>
                Accept all
              </button>
              <button type="button" onClick={() => save(choices)} className={cn(consentButton, 'border-ivory bg-ivory text-ink-950 hover:bg-white xs:col-span-2')}>
                Save choices
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
