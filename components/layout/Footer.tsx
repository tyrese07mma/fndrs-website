import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { footerNav, pages } from '@/lib/pages';
import { site, socialLinks } from '@/lib/site';
import { ArrowLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/primitives';
import { CookieSettingsButton } from '@/components/consent/CookieSettingsButton';
import { CurrentYear } from './CurrentYear';
import { Wordmark } from './Wordmark';

const legal = footerNav.find((c) => c.title === 'Legal');
const columns = footerNav.filter((c) => c.title !== 'Legal');

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t hairline bg-ink-950">
      <Container wide className="pt-16 sm:pt-20">
        {/* Brand: the statement and the mark carry the footer; navigation follows. */}
        <div className="grid gap-12 border-b hairline pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[clamp(2.75rem,1.4rem+6vw,7.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.05em]">
              Don&rsquo;t build <span className="text-gold-300/90">alone.</span>
            </p>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-4 lg:items-end lg:text-right">
            <p className="label-mono text-subtle">Find · Match · Build</p>
            <ArrowLink href="/early-access" className="text-[1.0625rem]">
              Join Early Access
            </ArrowLink>
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4 text-ivory" aria-label="FNDRS Society — home">
              <Image src="/brand/mark.png" alt="" width={40} height={33} className="h-8 w-auto" />
              <Wordmark size={20} />
            </Link>
            <p className="mt-6 max-w-[32ch] text-[0.9375rem] leading-relaxed text-muted">
              A network for people who build — founders, builders, mentors and investors.
            </p>
            {socialLinks.length > 0 && (
              <ul aria-label="Social" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[0.875rem] font-medium text-ivory/85 transition-colors hover:text-ivory"
                    >
                      {s.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:col-span-2 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="label-mono text-faint">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.items.map((key) => (
                    <li key={key}>
                      <Link href={pages[key].href} className="text-[0.875rem] text-muted transition-colors hover:text-ivory">
                        {pages[key].label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t hairline pb-24 pt-7 text-[0.8125rem] text-faint sm:pb-7 sm:pr-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p>
              © <CurrentYear /> {site.name}. In early beta.
            </p>
            {legal && (
              <nav aria-label="Legal">
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {legal.items.map((key) => (
                    <li key={key}>
                      <Link href={pages[key].href} className="text-subtle transition-colors hover:text-ivory">
                        {pages[key].label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <CookieSettingsButton className="text-left text-subtle transition-colors hover:text-ivory" />
                  </li>
                </ul>
              </nav>
            )}
          </div>
          <p>
            Designed &amp; developed by{' '}
            <a href={site.credit.url} target="_blank" rel="noopener" className="text-subtle underline decoration-white/15 underline-offset-4 transition-colors hover:text-ivory">
              {site.credit.name}
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
