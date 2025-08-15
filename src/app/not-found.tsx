import { Container } from "@/components/Container";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="py-16 text-center">
      <div
        className="mx-auto mb-4 h-14 w-14 rounded-2xl"
        style={{
          background:
            "conic-gradient(from 180deg, var(--primary), var(--mint), var(--accent), var(--primary))",
        }}
      />
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-ink">
        The page you’re looking for doesn’t exist.
      </p>
      <Link href="/" className="mt-4 inline-flex btn btn-primary">
        Go home
      </Link>
    </Container>
  );
}
