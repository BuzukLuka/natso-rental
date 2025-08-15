import { Property } from "@/types";
import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ items }: { items: Property[] }) {
  if (items.length === 0) return <p className="text-ink">No rentals found.</p>;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <PropertyCard key={p.id} p={p} />
      ))}
    </div>
  );
}
