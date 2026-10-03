import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';
import { StatusBadge, type Status } from './primitives';

/**
 * A designed state for a feature that has no screenshot yet, or isn't shipped:
 * status chip, one honest sentence, and what exists today. Never an empty box.
 */
export function FeatureStatus({
  status,
  statusLabel,
  icon: Icon,
  title,
  description,
  items,
  itemsLabel = 'In the app today',
  note,
  className,
}: {
  status: Status;
  statusLabel?: string;
  icon?: LucideIcon;
  title: string;
  description: ReactNode;
  items?: string[];
  itemsLabel?: string;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('rounded-[28px] border hairline bg-ink-900 p-7 sm:p-8', className)}>
      <div className="flex flex-wrap-reverse items-start justify-between gap-4">
        <StatusBadge status={status} label={statusLabel} />
        {Icon && (
          <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-ink-700/80 text-ivory/90">
            <Icon className="size-5" strokeWidth={1.75} />
          </span>
        )}
      </div>
      <p className="mt-8 text-[1.375rem] font-semibold tracking-[-0.02em]">{title}</p>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{description}</p>
      {items && items.length > 0 && (
        <div className="mt-7 border-t hairline pt-6">
          <p className="label-mono text-subtle">{itemsLabel}</p>
          <ul className="mt-4 space-y-2.5">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-ivory/85">
                <span aria-hidden className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-gold-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {note && <p className="mt-6 text-[0.8125rem] leading-relaxed text-subtle">{note}</p>}
    </div>
  );
}
