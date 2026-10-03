'use client';

import type { ReactNode } from 'react';

import type { OptionalCategory } from '@/lib/consent';
import { useConsent } from './ConsentProvider';

/**
 * Renders (and therefore loads) its children only after consent for `category`.
 * Wrap every non-essential script or embed in this, e.g.
 *   <ConsentGate category="externalMedia"><YouTubeEmbed id="…" /></ConsentGate>
 */
export function ConsentGate({ category, children, fallback }: { category: OptionalCategory; children: ReactNode; fallback?: ReactNode }) {
  const { hasConsent, openSettings } = useConsent();
  if (hasConsent(category)) return <>{children}</>;
  return (
    fallback ?? (
      <div className="rounded-[20px] border hairline bg-ink-900 p-6 text-[0.9375rem] text-muted">
        This content is loaded from another platform and needs your consent.{' '}
        <button type="button" onClick={(e) => openSettings(e.currentTarget)} className="font-semibold text-ivory underline underline-offset-4">
          Cookie settings
        </button>
      </div>
    )
  );
}
