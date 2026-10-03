import Link from 'next/link';

import { LegalAddress, LegalContact, LegalPage } from '@/components/marketing/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export const metadata = pageMetadata('privacy');

export default function PrivacyPage() {
  const p = site.providers;
  return (
    <LegalPage href="/privacy" title="Privacy Policy" updated="3 October 2026">
      <p>
        This policy explains which personal data we process when you visit this website or send us a form, why we do it, and which rights you have under the General Data Protection
        Regulation (GDPR).
      </p>

      <h2>1. Controller</h2>
      <LegalAddress />
      <p>
        <LegalContact />
      </p>

      <h2>2. Visiting this website</h2>
      <p>
        When you open this website, technical data that your browser sends automatically is processed in server logs: IP address, date and time of the request, the page requested,
        referrer, browser and operating system. This is necessary to deliver the website securely and to detect misuse. The legal basis is our legitimate interest in a secure,
        working website (Art. 6 (1) (f) GDPR).
      </p>
      <p>
        This website is hosted by {p.hosting}, which processes this data on our behalf under a data processing agreement (Art. 28 GDPR). Data may be processed outside the European
        Union. Such transfers are based on the EU Standard Contractual Clauses (Art. 46 (2) (c) GDPR).
      </p>

      <h2 id="cookies">3. No cookies, no tracking</h2>
      <p>
        This website does not set cookies and does not store or read any information on your device (no local storage or session storage). It uses no analytics, advertising or
        tracking services and loads no third-party scripts, embedded videos or external fonts: everything, including fonts and images, is served from our own domain. This is why
        there is no cookie banner: there is nothing to consent to.
      </p>
      <p>If we ever add a service that needs your consent, we will ask for it before that service is loaded and update this policy.</p>

      <h2>4. Early Access and contact forms</h2>
      <p>
        When you send the Early Access or contact form, we process the details you enter: your name, email address and, depending on the form, your role, what you are looking for, the
        topic and your message. We use them only to handle your request and to contact you about it. The legal basis is your consent (Art. 6 (1) (a) GDPR), which you give with the
        checkbox in the form, and the handling of your request (Art. 6 (1) (b) GDPR). You can withdraw your consent at any time with effect for the future.
      </p>
      <p>
        {p.forms
          ? `Form submissions are stored with ${p.forms}, which processes them on our behalf under a data processing agreement.`
          : 'Form submissions are transmitted to us over an encrypted connection and stored only for handling your request.'}{' '}
        We delete your details as soon as they are no longer needed for your request, unless statutory retention obligations apply, or earlier if you ask us to.
      </p>

      <h2>5. Links to social networks</h2>
      <p>
        This website links to the FNDRS profile on Instagram. These are plain links, not embedded plugins: no data is sent to Instagram (Meta Platforms Ireland Ltd.) until you click
        one. After that, Instagram&rsquo;s own privacy policy applies.
      </p>

      <h2>6. The FNDRS app</h2>
      <p>
        This policy covers this website only. The FNDRS app shows its own privacy information before you create an account.
      </p>

      <h2>7. Your rights</h2>
      <ul>
        <li>Access to the personal data we hold about you (Art. 15 GDPR)</li>
        <li>Correction (Art. 16) and deletion (Art. 17)</li>
        <li>Restriction of processing (Art. 18) and data portability (Art. 20)</li>
        <li>Objection to processing based on legitimate interests (Art. 21)</li>
        <li>Withdrawal of consent at any time, with effect for the future (Art. 7 (3))</li>
        <li>
          Complaint to a data protection supervisory authority (Art. 77). For us, this is the Hessian Commissioner for Data Protection and Freedom of Information (Der Hessische
          Beauftragte für Datenschutz und Informationsfreiheit).
        </li>
      </ul>
      <p>
        To use your rights, contact us: <LegalContact />.
      </p>

      <h2>8. Changes</h2>
      <p>
        We update this policy when the website or our processing changes. The current version is always available on this page. See also <Link href="/security">Security &amp; Privacy</Link>.
      </p>
    </LegalPage>
  );
}
