'use client';

import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';

import { buttonClass } from '@/components/ui/Button';
import { ChipRadio, Consent, ERRORS, Field, Honeypot, TextArea, TextInput } from './FormParts';

const ROLES = ['Founder', 'Developer', 'Designer', 'Marketer', 'Investor', 'Mentor', 'Other'];

const PROMPTS: Record<string, string> = {
  Founder: 'e.g. A technical co-founder for a B2B SaaS idea, ideally in Berlin.',
  Developer: 'e.g. An early-stage startup where I can own the frontend.',
  Designer: 'e.g. A founder who needs product design from day one.',
  Marketer: 'e.g. A pre-launch product that needs a growth plan.',
  Investor: 'e.g. Pre-seed teams in climate and fintech.',
  Mentor: 'e.g. First-time founders working on go-to-market.',
  Other: 'Tell us what you are looking for on FNDRS.',
};

export function EarlyAccessForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Founder');
  const [lookingFor, setLookingFor] = useState('');
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const doneRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation so screen readers announce it.
  useEffect(() => {
    if (state === 'done') doneRef.current?.focus();
  }, [state]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ kind: 'early-access', name, email, role, lookingFor, consent, company_website: honey }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'default');
      setState('done');
    } catch (err) {
      const code = err instanceof Error ? err.message : 'default';
      setError(ERRORS[code] ?? ERRORS.default);
      setState('error');
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[16px] border hairline bg-ink-900 p-6 sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'done' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[28rem] flex-col justify-center"
            role="status"
          >
            <span className="inline-flex size-14 items-center justify-center rounded-full bg-ivory text-ink-950">
              <Check className="size-6" aria-hidden />
            </span>
            <h2 ref={doneRef} tabIndex={-1} className="headline-sm mt-8 outline-none">
              You&rsquo;re on the list.
            </h2>
            <p className="lead mt-4 max-w-md text-muted">
              Thanks, {name.split(' ')[0]}. We&rsquo;ll contact you at <span className="text-ivory">{email}</span> when your access is ready.
              Until then, the roadmap shows what we are working on.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/how-it-works" className={buttonClass('secondary', 'md')}>
                See how FNDRS works
              </Link>
              <Link href="/roadmap" className={buttonClass('ghost', 'md')}>
                What we are building next
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} className="relative space-y-7" exit={{ opacity: 0, y: -8 }} noValidate={false}>
            <Honeypot value={honey} onChange={setHoney} />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" htmlFor="ea-name">
                <TextInput id="ea-name" name="name" autoComplete="name" required placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label="Email" htmlFor="ea-email">
                <TextInput id="ea-email" name="email" type="email" autoComplete="email" required placeholder="you@startup.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
            </div>
            <fieldset>
              <legend className="mb-3 block text-[0.875rem] font-medium text-muted">I am a…</legend>
              <ChipRadio name="role" options={ROLES} value={role} onChange={setRole} />
            </fieldset>
            <Field label="What are you looking for?" htmlFor="ea-looking" hint="Optional — it helps us understand who is joining and why.">
              <TextArea id="ea-looking" name="lookingFor" placeholder={PROMPTS[role]} value={lookingFor} onChange={(e) => setLookingFor(e.target.value)} maxLength={2000} />
            </Field>
            <Consent checked={consent} onChange={setConsent} />
            {state === 'error' && (
              <p role="alert" className="rounded-[10px] border border-[#e0705f]/30 bg-[#e0705f]/10 px-4 py-3 text-[0.875rem] text-[#f0a597]">
                {error}
              </p>
            )}
            <button type="submit" disabled={state === 'sending'} className={buttonClass('primary', 'lg', 'w-full')}>
              {state === 'sending' ? <Loader2 className="size-5 animate-spin" aria-label="Sending" /> : <>Request Early Access <ArrowRight className="size-4" aria-hidden /></>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
