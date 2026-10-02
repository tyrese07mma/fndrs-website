import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { footerNav, pages } from '@/lib/pages';
import { site } from '@/lib/site';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/primitives';
import { Wordmark } from './Wordmark';

export function Footer() {
  const socials = [
    { label: 'Instagram', href: site.socials.instagram },
    { label: 'LinkedIn', href: site.socials.linkedin },
  ];

  return (
    <footer className="relative overflow-hidden border-t hairline bg-ink-950">
      <Container wide className="pt-20 sm:pt-28">
        <div className="flex flex-col gap-10 border-b hairline pb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="label-mono text-subtle">Find · Match · Build</p>
            <p className="headline-lg mt-5 max-w-[14ch]">
              Don&rsquo;t build <span className="text-subtle">alone.</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/early-access" size="lg" arrow>
              Join Early Access
            </ButtonLink>
            <ButtonLink href="/how-it-works" size="lg" variant="secondary">
              How FNDRS works
            </ButtonLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(6,1fr)]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block text-ivory" aria-label="FNDRS Society — home">
              <Wordmark size={17} />
            </Link>
            <p className="mt-5 max-w-[30ch] text-[0.875rem] leading-relaxed text-subtle">
              A network for people who build — founders, builders, mentors and investors.
            </p>
          </div>

          {footerNav.map((col) => (
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

          <div>
            <p className="label-mono text-faint">Social</p>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[0.875rem] text-muted transition-colors hover:text-ivory">
                      {s.label}
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  ) : (
                    <span className="text-[0.875rem] text-faint">
                      {s.label} <span className="text-[0.75rem]">· soon</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start justify-between gap-6 border-t hairline py-8 sm:flex-row sm:items-center">
          <p className="text-[0.8125rem] text-faint">
            © {new Date().getFullYear()} {site.name}. Built in public, in early beta.
          </p>
          <Image src="/brand/mark.png" alt="" width={28} height={28} className="h-7 w-auto opacity-70" />
        </div>
      </Container>
    </footer>
  );
}
