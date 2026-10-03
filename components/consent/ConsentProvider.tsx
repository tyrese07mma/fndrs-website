'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import {
  ALL_OPTIONAL,
  NO_OPTIONAL,
  readConsent,
  writeConsent,
  type ConsentCategory,
  type ConsentChoices,
  type ConsentRecord,
} from '@/lib/consent';
import { CookieBanner } from './CookieBanner';
import { CookiePreferences } from './CookiePreferences';

interface ConsentContextValue {
  /** null until the visitor has decided (or while reading storage). */
  record: ConsentRecord | null;
  hasConsent: (category: ConsentCategory) => boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  save: (choices: ConsentChoices) => void;
  /** Pass the trigger element so focus can return to it when the dialog closes. */
  openSettings: (trigger?: HTMLElement | null) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used inside <ConsentProvider>');
  return ctx;
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);

  // Storage is only available in the browser: read it after mount.
  useEffect(() => {
    setRecord(readConsent());
    setReady(true);
  }, []);

  const decide = useCallback((choices: ConsentChoices) => {
    setRecord(writeConsent(choices));
    setSettingsOpen(false);
    opener.current?.focus?.();
    opener.current = null;
    window.dispatchEvent(new CustomEvent('fndrs:consent', { detail: choices }));
  }, []);

  const openSettings = useCallback((trigger?: HTMLElement | null) => {
    opener.current = trigger ?? (document.activeElement as HTMLElement | null);
    setSettingsOpen(true);
  }, []);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
    opener.current?.focus?.();
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      record,
      hasConsent: (category) => category === 'necessary' || Boolean(record?.choices[category]),
      acceptAll: () => decide(ALL_OPTIONAL),
      rejectAll: () => decide(NO_OPTIONAL),
      save: decide,
      openSettings,
    }),
    [record, decide, openSettings],
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {ready && !record && !settingsOpen && <CookieBanner />}
      <CookiePreferences open={settingsOpen} onClose={closeSettings} />
    </ConsentContext.Provider>
  );
}
