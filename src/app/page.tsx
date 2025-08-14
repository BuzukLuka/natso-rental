import Link from "next/link";
import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-brand-gradient" />
        <Container className="py-10 md:py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* LEFT: text + search */}
            <div className="lg:col-span-6">
              <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-none lg:text-left">
                <p className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-ink shadow-soft backdrop-blur">
                  🇨🇦 Built for Canada · Secure payments
                </p>

                <h1 className="mt-4 text-4xl/tight font-extrabold tracking-tight md:text-5xl">
                  Find your next room in{" "}
                  <span className="bg-[linear-gradient(90deg,var(--primary),var(--mint))] bg-clip-text text-transparent">
                    minutes
                  </span>
                </h1>

                <p className="mt-3 text-base md:text-lg text-ink">
                  Beautiful listings, transparent pricing, and a smooth booking
                  flow—made for renters and hosts.
                </p>

                {/* Search panel */}
                <div className="mx-auto mt-6 w-full max-w-2xl rounded-2xl border border-black/10 bg-white p-3 shadow-soft lg:mx-0">
                  <form
                    className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12"
                    aria-label="Search rentals"
                  >
                    {/* Location */}
                    <div className="lg:col-span-5">
                      <label className="sr-only" htmlFor="location">
                        Location
                      </label>
                      <input
                        id="location"
                        className="input rounded-xl"
                        placeholder="City, address, or landmark"
                        aria-label="Search by location"
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-2 lg:col-span-4">
                      <div>
                        <label className="sr-only" htmlFor="checkin">
                          Check-in
                        </label>
                        <input
                          id="checkin"
                          type="date"
                          className="input rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="checkout">
                          Check-out
                        </label>
                        <input
                          id="checkout"
                          type="date"
                          className="input rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Guests */}
                    <div className="lg:col-span-2">
                      <label className="sr-only" htmlFor="guests">
                        Guests
                      </label>
                      <select id="guests" className="input rounded-xl">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} {i ? "guests" : "guest"}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* CTA */}
                    <div className="lg:col-span-1">
                      <Link
                        href="/properties"
                        className="btn btn-accent h-11 w-full rounded-xl text-sm md:text-base lg:h-full"
                      >
                        Search
                      </Link>
                    </div>
                  </form>

                  {/* quick chips */}
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2 px-1 lg:justify-start">
                    <Link href="/properties?type=studio" className="badge">
                      Studio
                    </Link>
                    <Link href="/properties?type=room" className="badge">
                      Private room
                    </Link>
                    <Link href="/properties?type=shared" className="badge">
                      Shared
                    </Link>
                    <Link href="/properties?amenities=pet" className="badge">
                      Pet-friendly
                    </Link>
                    <Link href="/properties?term=short" className="badge">
                      Short-term
                    </Link>
                    <Link href="/properties?furnished=true" className="badge">
                      Furnished
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: visual grid */}
            <div className="lg:col-span-6">
              <div className="mx-auto grid h-full max-w-2xl grid-cols-6 grid-rows-6 gap-3 lg:mx-0 lg:max-w-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop"
                  alt="Modern loft"
                  className="col-span-4 row-span-4 h-full w-full rounded-2xl object-cover shadow-soft"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop"
                  alt="Bright studio"
                  className="col-span-2 row-span-3 h-full w-full rounded-2xl object-cover shadow-soft"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1200&auto=format&fit=crop"
                  alt="Cozy room"
                  className="col-span-3 row-span-2 h-full w-full rounded-2xl object-cover shadow-soft"
                />
                <div className="col-span-3 row-span-2 flex items-center justify-center rounded-2xl border border-black/10 bg-white/80 p-4 text-center shadow-soft backdrop-blur">
                  <div>
                    <p className="text-sm text-ink">Over</p>
                    <p className="text-2xl font-extrabold">2,500+</p>
                    <p className="text-sm text-ink">rooms listed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED */}
      <section className="relative">
        <Container className="py-10 md:py-14">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold md:text-2xl">
                Featured near you
              </h2>
              <p className="text-sm text-ink">
                Hand-picked rentals with great value & reviews.
              </p>
            </div>
            <Link
              href="/properties"
              className="btn btn-ghost self-start sm:self-auto"
            >
              Explore all
            </Link>
          </div>

          <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {[
              {
                id: 1,
                title: "Bright studio in Downtown",
                price: 1600,
                city: "Toronto",
                img: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d52?q=80&w=1200&auto=format&fit=crop",
              },
              {
                id: 2,
                title: "Cozy private room · shared 2BR",
                price: 980,
                city: "Calgary",
                img: "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1200&auto=format&fit=crop",
              },
              {
                id: 3,
                title: "Modern loft with balcony",
                price: 2100,
                city: "Vancouver",
                img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1200&auto=format&fit=crop",
              },
              {
                id: 4,
                title: "Private room near UBC",
                price: 1200,
                city: "Vancouver",
                img: "https://images.unsplash.com/photo-1444419988131-046ed4e5ffd6?q=80&w=1200&auto=format&fit=crop",
              },
            ].map((p) => (
              <Link
                key={p.id}
                href={`/properties/${p.id}`}
                className="card group overflow-hidden"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="line-clamp-1 font-semibold">{p.title}</h3>
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-ink">
                      {p.city}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink">
                    From{" "}
                    <span className="font-semibold text-slate-900">
                      ${p.price}
                    </span>
                    /mo
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA STRIP */}
      <section aria-label="Host CTA" className="relative">
        <Container className="pb-16 md:pb-20">
          <div className="card grid grid-cols-1 items-center gap-4 px-6 py-8 text-center md:grid-cols-3 md:text-left">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold md:text-xl">
                Are you a landlord or property manager?
              </h3>
              <p className="text-sm text-ink">
                List your rooms, sync availability, and get paid with Stripe.
              </p>
            </div>
            <div className="flex justify-center gap-2 md:justify-end">
              <Link href="/host" className="btn btn-primary">
                Become a Host
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                View pricing
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
