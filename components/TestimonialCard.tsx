export function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <figure className="card">
      <blockquote className="font-heading text-xl leading-snug text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 text-sm">
        <span className="font-semibold text-ink">{name}</span>
        <span className="text-ink-muted"> — {role}</span>
      </figcaption>
    </figure>
  );
}
