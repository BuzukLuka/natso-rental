import Link from "next/link";
import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_20%_-10%,#00A3FF15,transparent),radial-gradient(60rem_60rem_at_80%_10%,#00E0B815,transparent)]" />
        <Container className="py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl/tight font-extrabold tracking-tight md:text-5xl">
              Find your next room in{" "}
              <span className="bg-gradient-to-r from-brand-sky to-brand-mint bg-clip-text text-transparent">
                minutes
              </span>
            </h1>
            <p className="mt-3 text-lg text-black/70">
              Beautiful listings, transparent pricing, and secure payments built
              for Canada.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] bg-white border border-black/10 rounded-2xl p-2 shadow-soft">
              <input
                className="input rounded-xl"
                placeholder="City, Address, or Landmark"
              />
              <Link href="/properties" className="btn-primary">
                Search rentals
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="badge">Studios</span>
              <span className="badge">Shared</span>
              <span className="badge">Pet-friendly</span>
              <span className="badge">Furnished</span>
              <span className="badge">Short-term</span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
