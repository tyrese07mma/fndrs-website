-- Website form submissions (Early Access + contact).
-- Run once in the Supabase SQL editor, then set SUPABASE_URL and
-- SUPABASE_SERVICE_ROLE_KEY in the Vercel project. The website writes with the
-- service role from the server only; nobody can read or write via the public API.

create table if not exists public.website_submissions (
  id          uuid primary key default gen_random_uuid(),
  kind        text not null check (kind in ('early-access', 'contact')),
  name        text not null,
  email       text not null,
  details     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

alter table public.website_submissions enable row level security;
-- No policies on purpose: only the service role (server) can access this table.

create index if not exists website_submissions_kind_created_idx
  on public.website_submissions (kind, created_at desc);
