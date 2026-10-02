import { ButtonLink } from '@/components/ui/Button';
import { Container, Eyebrow } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center overflow-hidden pt-[var(--nav-h)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 warm-glow" />
      <Container wide className="relative">
        <Eyebrow>404</Eyebrow>
        <h1 className="headline-xl mt-7 uppercase">
          Wrong
          <br />
          turn.
        </h1>
        <p className="lead mt-8 max-w-md text-muted">This page doesn&rsquo;t exist — but the people you&rsquo;re looking for might.</p>
        <div className="mt-10 flex flex-col gap-3 xs:flex-row">
          <ButtonLink href="/" size="lg" arrow>
            Back to FNDRS
          </ButtonLink>
          <ButtonLink href="/product" size="lg" variant="secondary">
            Explore the product
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
