import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-heading text-xl font-bold text-ink">
      <span className="text-primary">Spark</span> Solutions
    </Link>
  );
}
