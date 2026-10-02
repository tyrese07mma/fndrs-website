import { Fill, LegalPage } from '@/components/marketing/LegalPage';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/lib/site';

export const metadata = pageMetadata('imprint', { robots: { index: true, follow: true } });

export default function ImprintPage() {
  const l = site.legal;
  const incomplete = !l.company || !l.street || !l.email;
  return (
    <LegalPage
      href="/imprint"
      title="Imprint"
      notice={incomplete ? 'Highlighted fields still need to be filled in (lib/site.ts → legal) before this site goes live.' : undefined}
    >
      <h2>Information according to § 5 DDG</h2>
      <p>
        <strong>
          <Fill value={l.company} label="Company / full name" />
        </strong>
        <br />
        <Fill value={l.street} label="Street and number" />
        <br />
        <Fill value={l.city} label="Postcode and city" />
        <br />
        {l.country}
      </p>
      <p>
        Represented by: <Fill value={l.representative} label="Managing director / owner" />
      </p>

      <h2>Contact</h2>
      <p>
        Email: <Fill value={l.email} label="Email address" />
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

      <h2>Responsible for content</h2>
      <p>
        <Fill value={l.representative} label="Name" />, address as above.
      </p>

      <h2>Liability for content and links</h2>
      <p>
        We create the content of this website with care, but cannot guarantee that it is accurate, complete and up to date. This website contains links to external websites; we have no
        influence over their content and are not responsible for it. If we become aware of unlawful content, we will remove it promptly.
      </p>

      <h2>Online dispute resolution</h2>
      <p>We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.</p>
    </LegalPage>
  );
}
