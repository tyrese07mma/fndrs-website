import { NextResponse } from 'next/server';

import { deliver, type Submission } from '@/lib/forms';

/**
 * Receives Early Access + contact submissions, validates them and hands them
 * to the configured destination (see lib/forms.ts). Without one, production
 * refuses the request so no submission is ever silently lost.
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

  const record: Submission =
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

  try {
    await deliver(record);
  } catch (e) {
    const code = e instanceof Error && e.message === 'not_configured' ? 'not_configured' : 'forward_failed';
    return NextResponse.json({ error: code }, { status: code === 'not_configured' ? 503 : 502 });
  }

  return NextResponse.json({ ok: true });
}
