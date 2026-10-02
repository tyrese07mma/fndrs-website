import { NextResponse } from 'next/server';

/**
 * Receives Early Access + contact submissions and forwards them as JSON to
 * FORMS_WEBHOOK_URL (Zapier, Make, n8n, a Supabase function, ...).
 * Without a webhook: logged in development, refused in production so no
 * submission is silently lost.
 */

const ROLES = ['Founder', 'Developer', 'Designer', 'Marketer', 'Investor', 'Mentor', 'Other'];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = Record<string, unknown>;

function str(v: unknown, max: number) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: bots fill every field.
  if (str(body.company_website, 200)) return NextResponse.json({ ok: true });

  const kind = body.kind === 'contact' ? 'contact' : 'early-access';
  const name = str(body.name, 120);
  const email = str(body.email, 200);
  if (!name || !EMAIL.test(email)) return NextResponse.json({ error: 'invalid_fields' }, { status: 422 });
  if (body.consent !== true) return NextResponse.json({ error: 'consent_required' }, { status: 422 });

  const record =
    kind === 'early-access'
      ? {
          kind,
          name,
          email,
          role: ROLES.includes(str(body.role, 40)) ? str(body.role, 40) : 'Other',
          lookingFor: str(body.lookingFor, 2000),
          submittedAt: new Date().toISOString(),
        }
      : {
          kind,
          name,
          email,
          topic: str(body.topic, 60),
          message: str(body.message, 4000),
          submittedAt: new Date().toISOString(),
        };

  if (kind === 'contact' && !record.message) return NextResponse.json({ error: 'invalid_fields' }, { status: 422 });

  const hook = process.env.FORMS_WEBHOOK_URL;
  if (!hook) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[forms] no FORMS_WEBHOOK_URL set — submission:', record);
      return NextResponse.json({ ok: true, dev: true });
    }
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  try {
    const res = await fetch(hook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch (e) {
    console.error('[forms] forward failed', e);
    return NextResponse.json({ error: 'forward_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
