'use client';

import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { buttonClass } from '@/components/ui/Button';
import { ChipRadio, Consent, ERRORS, Field, Honeypot, TextArea, TextInput } from './FormParts';

const TOPICS = ['App feedback', 'Early Access', 'Partnerships', 'Press', 'Something else'];

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('App feedback');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [honey, setHoney] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ kind: 'contact', name, email, topic, message, consent, company_website: honey }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'default');
      setState('done');
    } catch (err) {
      const code = err instanceof Error ? err.message : 'default';
      setError(code === 'invalid_fields' ? 'Please add your name, a valid email and a message.' : (ERRORS[code] ?? ERRORS.default));
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="rounded-[16px] border hairline bg-ink-900 p-8 sm:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-ivory text-ink-950">
          <Check className="size-5" aria-hidden />
        </span>
        <h2 className="headline-sm mt-6">Thanks, your message is with us.</h2>
        <p className="mt-3 text-muted">
          We&rsquo;ll reply to <span className="text-ivory">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative space-y-7 rounded-[16px] border hairline bg-ink-900 p-6 sm:p-10">
      <Honeypot value={honey} onChange={setHoney} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="c-name">
          <TextInput id="c-name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
        </Field>
        <Field label="Email" htmlFor="c-email">
          <TextInput id="c-email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@startup.com" />
        </Field>
      </div>
      <fieldset>
        <legend className="mb-3 block text-[0.875rem] font-medium text-muted">What is it about?</legend>
        <ChipRadio name="topic" options={TOPICS} value={topic} onChange={setTopic} />
      </fieldset>
      <Field label="Message" htmlFor="c-msg">
        <TextArea id="c-msg" required value={message} onChange={(e) => setMessage(e.target.value)} maxLength={4000} placeholder="How can we help?" />
      </Field>
      <Consent checked={consent} onChange={setConsent} />
      {state === 'error' && (
        <p role="alert" className="rounded-[10px] border border-[#e0705f]/30 bg-[#e0705f]/10 px-4 py-3 text-[0.875rem] text-[#f0a597]">
          {error}
        </p>
      )}
      <button type="submit" disabled={state === 'sending'} className={buttonClass('primary', 'lg', 'w-full sm:w-auto')}>
        {state === 'sending' ? <Loader2 className="size-5 animate-spin" aria-label="Sending" /> : <>Send message <ArrowRight className="size-4" aria-hidden /></>}
      </button>
    </form>
  );
}
