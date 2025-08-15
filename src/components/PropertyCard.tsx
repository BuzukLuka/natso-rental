"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import RatingStars from "./RatingStars";
import { Property } from "@/types";
import { formatMoney } from "@/utils/currency";
import { useFavorites } from "@/context/FavoritesProvider";

export default function PropertyCard({ p }: { p: Property }) {
  const fav = useFavorites();
  const isFav = fav.has(p.id);

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[4/3]">
        <img
          src={p.images[0]}
          alt={p.title}
          className="h-full w-full object-cover"
        />
        <button
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90"
          aria-label="Toggle favorite"
          onClick={() => fav.toggle(p.id)}
          title={isFav ? "Remove from favorites" : "Save to favorites"}
        >
          <Heart className="size-4" fill={isFav ? "currentColor" : "none"} />
        </button>
        {p.featured && (
          <span className="absolute left-3 top-3 badge bg-white/90">
            Featured
          </span>
        )}
      </div>

      <div className="p-3 md:p-4">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/properties/${p.slug}`}
            className="font-semibold hover:underline line-clamp-1"
          >
            {p.title}
          </Link>
          <RatingStars value={p.rating} />
        </div>
        <p className="mt-1 text-sm text-ink line-clamp-1">
          {p.city}, {p.province}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-ink">
            {p.beds} bed · {p.baths} bath · {p.sizeSqft} sqft
          </div>
          <div className="text-right">
            <div className="font-semibold">
              {formatMoney(p.priceMonthly)}/mo
            </div>
            <div className="text-xs text-ink">Utilities may apply</div>
          </div>
        </div>
      </div>
    </div>
  );
}
