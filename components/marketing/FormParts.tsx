'use client';

import Link from 'next/link';
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

/** Inputs styled after the app's sign-up fields: dark fill, soft border, 18px radius. */
const field =
  'w-full rounded-[18px] border border-white/[0.08] bg-ink-800 px-5 text-[1rem] text-ivory placeholder:text-faint outline-none transition-[border-color,background-color] duration-200 hover:border-white/15 focus:border-gold-500/60 focus:bg-ink-750';

export function Field({ label, hint, children, htmlFor }: { label: string; hint?: string; children: ReactNode; htmlFor: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2.5 block text-[0.875rem] font-medium text-muted">
        {label}
      </label>
      {children}
      {hint && <p className="mt-2 text-[0.8125rem] text-faint">{hint}</p>}
    </div>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(field, 'h-14', props.className)} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(field, 'min-h-[8.5rem] resize-y py-4 leading-relaxed', props.className)} />;
}

/** Pill radio group — like the app's chip pickers. */
export function ChipRadio({ name, options, value, onChange }: { name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const checked = value === o;
        return (
          <label
            key={o}
            className={cn(
              'relative inline-flex h-11 cursor-pointer items-center rounded-full border px-5 text-[0.9375rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-500',
              checked ? 'border-ivory bg-ivory text-ink-950' : 'border-white/10 bg-white/[0.03] text-ivory/85 hover:border-white/25',
            )}
          >
            <input type="radio" name={name} value={o} checked={checked} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        );
      })}
    </div>
  );
}

export function Consent({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-subtle">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-[18px] shrink-0 cursor-pointer appearance-none rounded-[6px] border border-white/20 bg-ink-800 bg-center bg-no-repeat transition-colors checked:border-ivory checked:bg-ivory checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22%3E%3Cpath%20d=%22M4%208.5l2.5%202.5L12%205.5%22%20fill=%22none%22%20stroke=%22%23080808%22%20stroke-width=%222%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22/%3E%3C/svg%3E')]"
      />
      <span>
        I agree that FNDRS may store my details to contact me about this request. See our{' '}
        <Link href="/privacy" className="text-ivory underline decoration-white/25 underline-offset-4 hover:decoration-white/60">
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}

/** Invisible honeypot field for bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Company website
        <input tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} name="company_website" />
      </label>
    </div>
  );
}

export const ERRORS: Record<string, string> = {
  invalid_fields: 'Please check your name and email address.',
  consent_required: 'Please confirm the privacy note so we can store your request.',
  not_configured: 'Sign-ups are not open on this site yet. Please try again soon.',
  default: 'Something went wrong on our side. Please try again in a moment.',
};
