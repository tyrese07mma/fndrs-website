import { LegalAddress, LegalContact, LegalPage } from '@/components/marketing/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export const metadata = pageMetadata('imprint');

export default function ImprintPage() {
  const l = site.legal;
  return (
    <LegalPage href="/imprint" title="Imprint">
      <h2>Information according to § 5 DDG</h2>
      <LegalAddress />

      <h2>Contact</h2>
      <p>
        <LegalContact />
        {l.phone && (
          <>
            <br />
            Phone: {l.phone}
          </>
        )}
      </p>

      {(l.register || l.vatId) && (
        <>
          <h2>Register and VAT</h2>
          <p>
            {l.register && (
              <>
                {l.register}
                <br />
              </>
            )}
            {l.vatId && <>VAT ID according to § 27a UStG: {l.vatId}</>}
          </p>
        </>
      )}

      <h2>Responsible for content according to § 18 (2) MStV</h2>
      <p>
        {l.responsibleForContent}
        <br />
        {l.street}, {l.postalCode} {l.city}
      </p>

      <h2>Liability for content</h2>
      <p>
        We create the content of this website with care. We cannot, however, guarantee that it is complete, accurate and up to date at all times. As a service provider we are responsible
        for our own content under general law (§ 7 (1) DDG). We are not obliged to monitor third-party information transmitted or stored by us (§§ 8–10 DDG). If we become aware of
        unlawful content, we will remove it promptly.
      </p>

      <h2>Liability for links</h2>
      <p>
        This website links to external websites. We have no influence over their content and are not responsible for it; the respective provider is. Linked pages were checked for
        obvious legal violations when the link was set. If we become aware of a violation, we will remove the link promptly.
      </p>

      <h2>Copyright</h2>
      <p>
        The content, design and app screenshots on this website are protected by copyright. Using them beyond the limits of copyright law requires prior written permission.
      </p>

      <h2>Consumer dispute resolution</h2>
      <p>We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.</p>
    </LegalPage>
  );
}
