"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MapPin, Calendar, Users, Search as SearchIcon } from "lucide-react";
import { iso } from "@/utils/date";

export default function SearchBar() {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const [moveIn, setMoveIn] = useState(sp.get("moveIn") || iso(new Date()));
  const [guests, setGuests] = useState(Number(sp.get("guests") || 1));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = new URLSearchParams({ q, moveIn, guests: String(guests) });
    router.push(`/properties?${p.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="w-full rounded-2xl border border-black/10 bg-white p-2 shadow-soft"
    >
      <div className="grid gap-2 md:grid-cols-4">
        <label className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
          <MapPin className="size-4 opacity-60" />
          <input
            className="input border-0 px-0 shadow-none focus:ring-0"
            placeholder="City or neighborhood"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
          <Calendar className="size-4 opacity-60" />
          <input
            className="input border-0 px-0 shadow-none focus:ring-0"
            type="date"
            value={moveIn}
            onChange={(e) => setMoveIn(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
          <Users className="size-4 opacity-60" />
          <input
            className="input border-0 px-0 shadow-none focus:ring-0"
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </label>
        <button className="btn btn-primary">
          <SearchIcon className="mr-2 size-4" />
          Search
        </button>
      </div>
    </form>
  );
}
