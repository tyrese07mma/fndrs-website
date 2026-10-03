import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Michroma } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';

import { ConsentProvider } from '@/components/consent/ConsentProvider';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { OG_IMAGE } from '@/lib/metadata';
import { site } from '@/lib/site';
import { siteJsonLd } from '@/lib/structuredData';
import './globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const michroma = Michroma({ subsets: ['latin'], weight: '400', variable: '--font-michroma', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { type: 'website', siteName: site.name, locale: 'en_US', images: [OG_IMAGE] },
  twitter: { card: 'summary_large_image', images: [OG_IMAGE.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#080808',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${michroma.variable}`}>
      <head>
        <noscript>
          <style>{`[style*="opacity"],[style*="transform"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-[8px] bg-ivory px-4 py-2 text-sm font-semibold text-ink-950 focus:translate-y-0"
        >
          Skip to content
        </a>
        <ConsentProvider>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ConsentProvider>
        {/* If React has not hydrated after 3s, stop waiting for reveal animations. */}
        <Script id="motion-failsafe" strategy="beforeInteractive">
          {`setTimeout(function(){if(!window.__fndrsHydrated)document.documentElement.classList.add('motion-failsafe')},3000)`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }} />
      </body>
    </html>
  );
}
