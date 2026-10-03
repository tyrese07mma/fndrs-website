'use client';

import { useConsent } from './ConsentProvider';

/** Re-opens the cookie settings from anywhere (footer, privacy policy). */
export function CookieSettingsButton({ className, children = 'Cookie settings' }: { className?: string; children?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={(e) => openSettings(e.currentTarget)} className={className}>
      {children}
    </button>
  );
}
