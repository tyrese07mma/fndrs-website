import { ArrowUpRight, Mail } from 'lucide-react';

import { site, socialLinks } from '@/lib/site';
import { buttonClass } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/primitives';

/**
 * Shown instead of a form while no submission destination is configured,
 * so nobody fills in a form that cannot be delivered.
 */
export function FormsUnavailable({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex min-h-[22rem] flex-col justify-center rounded-[16px] border hairline bg-ink-900 p-7 sm:p-10" role="status">
      <StatusBadge status="soon" label="Opening soon" />
      <h2 className="headline-sm mt-7">{title}</h2>
      <p className="lead mt-4 max-w-md text-muted">{body}</p>
      {(socialLinks.length > 0 || site.contactEmail) && (
        <ul className="mt-9 flex flex-wrap gap-3">
          {site.contactEmail && (
            <li>
              <a
                href={`mailto:${site.contactEmail}`}
                className={buttonClass('primary')}
              >
                <Mail className="size-4" aria-hidden /> {site.contactEmail}
              </a>
            </li>
          )}
          {socialLinks.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass('secondary')}
              >
                Follow FNDRS on {s.label}
                <ArrowUpRight className="size-4" aria-hidden />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
