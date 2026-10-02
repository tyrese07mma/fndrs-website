import Link from 'next/link';

import { Fill, LegalPage } from '@/components/marketing/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export const metadata = pageMetadata('privacy');

export default function PrivacyPage() {
  const l = site.legal;
  return (
    <LegalPage
      href="/privacy"
      title="Privacy Policy"
      notice="Draft. This policy describes how this website is built. Have it reviewed by a lawyer and complete the highlighted fields before going live."
    >
      <p>This policy explains which personal data we process when you visit this website or send us a form, why we do it, and which rights you have.</p>

      <h2>1. Controller</h2>
      <p>
        <Fill value={l.company} label="Company / full name" />, <Fill value={l.street} label="Street" />, <Fill value={l.city} label="Postcode and city" />, {l.country}. Email:{' '}
        <Fill value={l.email} label="Email address" />.
      </p>

      <h2>2. Visiting this website</h2>
      <p>
        When you open this website, our hosting provider processes technical data that your browser sends automatically — such as IP address, date and time, the page requested, browser and operating
        system — in server logs. This is necessary to deliver the website securely (Art. 6(1)(f) GDPR). Hosting provider: <Fill value="" label="Hosting provider and location" />.
      </p>
      <p>
        <strong>No tracking, no cookies.</strong> This website does not use analytics, advertising trackers or cookies. Fonts are served from our own server; no data is sent to font providers when
        you visit.
      </p>

      <h2>3. Early access and contact forms</h2>
      <p>
        When you send the early access or contact form, we process the details you enter: name, email address, your role, what you are looking for or your message. We use them only to handle
        your request and to contact you about early access (Art. 6(1)(b) and (a) GDPR). You confirm this with the checkbox in the form and can withdraw your consent at any time.
      </p>
      <p>
        Form submissions are forwarded to <Fill value="" label="Tool / service that receives submissions" />. We delete your details when they are no longer needed for your request, or earlier if
        you ask us to.
      </p>

      <h2>4. The FNDRS app</h2>
      <p>The FNDRS app has its own privacy information, which you will see in the app before you create an account. This policy only covers this website.</p>

      <h2>5. Your rights</h2>
      <ul>
        <li>Access to the data we hold about you (Art. 15 GDPR)</li>
        <li>Correction (Art. 16) and deletion (Art. 17)</li>
        <li>Restriction of processing (Art. 18) and data portability (Art. 20)</li>
        <li>Objection to processing based on legitimate interests (Art. 21)</li>
        <li>Withdrawal of consent at any time, with effect for the future (Art. 7(3))</li>
        <li>Complaint to a data protection supervisory authority (Art. 77)</li>
      </ul>
      <p>
        To use your rights, write to us at <Fill value={l.email} label="Email address" /> or via the <Link href="/contact">contact page</Link>.
      </p>

      <h2>6. Changes</h2>
      <p>We will update this policy when the website or our processing changes. The current version is always available on this page.</p>
    </LegalPage>
  );
}
