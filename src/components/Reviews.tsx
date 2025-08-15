"use client";
import { useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string; // ISO
};

export default function Reviews({ slug }: { slug: string }) {
  const [items, setItems] = useState<Review[] | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/reviews/${slug}`);
      setItems(res.ok ? await res.json() : []);
    })();
  }, [slug]);

  if (!items) {
    return (
      <div className="mt-4 animate-pulse space-y-3">
        <div className="h-4 w-40 rounded bg-black/10" />
        <div className="h-20 rounded bg-black/10" />
      </div>
    );
  }

  if (!items.length) {
    return <p className="text-ink">No reviews (yet).</p>;
  }

  return (
    <div className="space-y-4">
      {items.map((r) => (
        <div key={r.id} className="rounded-xl border border-black/5 p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">{r.name}</div>
            <div className="text-xs text-ink">
              {new Date(r.date).toLocaleDateString()}
            </div>
          </div>
          <div className="mt-1 text-amber-500">
            {"★".repeat(Math.round(r.rating))}
            <span className="text-ink"> ({r.rating.toFixed(1)})</span>
          </div>
          <p className="mt-2 text-[15px]">{r.comment}</p>
        </div>
      ))}
    </div>
  );
}
