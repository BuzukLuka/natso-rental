import { Container } from "@/components/Container";
import Link from "next/link";
import { site } from "@/data/site";

export default function HostPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-extrabold">Become a Host</h1>
      <p className="mt-2 text-ink max-w-2xl">
        List your room or studio, manage bookings, and get paid securely.
      </p>
      <div className="mt-6 card p-4">
        <h3 className="font-semibold">Why host with {site.name}?</h3>
        <ul className="mt-2 list-disc pl-6 text-ink">
          <li>Verified guests and messaging</li>
          <li>Monthly payouts to your bank</li>
          <li>Simple, transparent pricing</li>
        </ul>
        <Link href="/auth/sign-up" className="mt-4 inline-block btn btn-accent">
          Create host account
        </Link>
      </div>
    </Container>
  );
}
