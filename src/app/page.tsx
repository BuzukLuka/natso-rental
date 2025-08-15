import { Container } from "@/components/Container";
import SearchBar from "@/components/SearchBar";
import PropertyGrid from "@/components/PropertyGrid";
import { properties } from "@/data/properties";

export default function Home() {
  const featured = properties.filter((p) => p.featured);
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-brand-gradient" />
        <Container className="py-12 md:py-16">
          <p className="badge">🇨🇦 Built for Canada</p>
          <h1 className="mt-4 max-w-3xl text-4xl/tight font-extrabold tracking-tight">
            Find your next room in{" "}
            <span className="bg-[linear-gradient(135deg,var(--primary),var(--mint))] bg-clip-text text-transparent">
              minutes
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-ink">
            Search verified rooms, studios, and shared spaces across major
            Canadian cities.
          </p>
          <div className="mt-6">
            <SearchBar />
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">Featured rentals</h2>
        </div>
        <PropertyGrid items={featured} />
      </Container>
    </>
  );
}
