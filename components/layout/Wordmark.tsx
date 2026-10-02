import { cn } from '@/lib/cn';

/** FNDRS wordmark in Michroma — same proportions as the app's Wordmark component. */
export function Wordmark({ size = 15, society = true, className }: { size?: number; society?: boolean; className?: string }) {
  return (
    <span className={cn('inline-flex flex-col items-start font-display leading-none', className)} aria-label="FNDRS Society">
      <span aria-hidden style={{ fontSize: size, letterSpacing: `${0.24 * size}px`, lineHeight: 1.15 }}>
        FNDRS
      </span>
      {society && (
        <span
          aria-hidden
          className="opacity-55"
          style={{ fontSize: size * 0.42, letterSpacing: `${0.55 * size}px`, lineHeight: 1, marginTop: size * 0.22 }}
        >
          SOCIETY
        </span>
      )}
    </span>
  );
}
