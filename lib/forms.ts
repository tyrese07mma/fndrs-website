/**
 * Where Early Access + contact submissions go. Server-only.
 *
 * Two supported destinations (either is enough):
 *  - FORMS_WEBHOOK_URL: any endpoint that accepts a JSON POST (Make, Zapier, n8n, …)
 *  - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY: inserts into the `website_submissions`
 *    table (see supabase/website_submissions.sql)
 *
 * Without either, forms are shown as "opening soon" in production instead of
 * pretending to send. In development, submissions are logged to the console.
 */

export type Submission = Record<string, string> & { kind: 'early-access' | 'contact'; name: string; email: string };

const webhook = () => process.env.FORMS_WEBHOOK_URL;
const supabase = () =>
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? { url: process.env.SUPABASE_URL.replace(/\/$/, ''), key: process.env.SUPABASE_SERVICE_ROLE_KEY }
    : null;

/** True when a real destination is configured. */
export function formsConfigured() {
  return Boolean(webhook() || supabase());
}

/** True when the forms should be shown as usable (configured, or local development). */
export function formsEnabled() {
  return formsConfigured() || process.env.NODE_ENV !== 'production';
}

/** Delivers a submission to every configured destination. Throws if none accepted it. */
export async function deliver(record: Submission) {
  const hook = webhook();
  const db = supabase();

  if (!hook && !db) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[forms] no destination configured, submission:', record);
      return;
    }
    throw new Error('not_configured');
  }

  const jobs: Promise<void>[] = [];
  if (hook) {
    jobs.push(
      fetch(hook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(record) }).then((r) => {
        if (!r.ok) throw new Error(`webhook ${r.status}`);
      }),
    );
  }
  if (db) {
    const { kind, name, email, submittedAt, ...details } = record;
    jobs.push(
      fetch(`${db.url}/rest/v1/website_submissions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: db.key,
          authorization: `Bearer ${db.key}`,
          prefer: 'return=minimal',
        },
        body: JSON.stringify({ kind, name, email, details, created_at: submittedAt }),
      }).then((r) => {
        if (!r.ok) throw new Error(`supabase ${r.status}`);
      }),
    );
  }

  const results = await Promise.allSettled(jobs);
  const failed = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
  failed.forEach((f) => console.error('[forms] delivery failed', f.reason));
  // Accept the submission if at least one destination stored it.
  if (failed.length === results.length) throw new Error('forward_failed');
}
