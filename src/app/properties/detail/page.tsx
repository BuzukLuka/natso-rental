import { Container } from "@/components/Container";
import { getPropertyBySlug } from "@/data/properties";
import BookingWidget from "@/components/BookingWidget";
import RatingStars from "@/components/RatingStars";
import { notFound } from "next/navigation";

export default function PropertyDetail({
  params,
}: {
  params: { slug: string };
}) {
  const p = getPropertyBySlug(params.slug);
  if (!p) return notFound();

  return (
    <Container className="py-8">
      <nav className="mb-3 text-sm text-ink">
        <a href="/properties" className="hover:underline">
          All rentals
        </a>{" "}
        · {p.city}, {p.province}
      </nav>

      <h1 className="text-2xl font-bold">{p.title}</h1>
      <div className="mt-1 flex items-center gap-3 text-sm text-ink">
        <RatingStars value={p.rating} />
        <span>· {p.reviewsCount} reviews</span>
        <span>· {p.type.toUpperCase()}</span>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* gallery & description */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {p.images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${p.title} ${i + 1}`}
                className="h-40 w-full rounded-xl object-cover md:h-48"
              />
            ))}
          </div>

          <div className="card p-4">
            <h3 className="font-semibold">About this place</h3>
            <p className="mt-2 text-ink">{p.longDescription}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.amenities.map((a) => (
                <li key={a} className="badge">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* booking */}
        <BookingWidget p={p} />
      </div>
    </Container>
  );
}
