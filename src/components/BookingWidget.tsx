"use client";
import { useState } from "react";
import { formatMoney } from "@/utils/currency";
import { monthsBetween, iso } from "@/utils/date";
import { Property } from "@/types";
import { useRouter } from "next/navigation";

export default function BookingWidget({ p }: { p: Property }) {
  const router = useRouter();
  const [moveIn, setMoveIn] = useState(iso(new Date(p.availableFrom)));
  const [months, setMonths] = useState(6);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { end } = monthsBetween(moveIn, months);
  const total = p.priceMonthly * months;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId: p.id,
        moveIn,
        months,
        guests,
        name,
        email,
      }),
    });
    if (!res.ok) {
      alert("Failed to create booking");
      return;
    }
    const data = await res.json();
    router.push(
      `/checkout?booking=${encodeURIComponent(data.bookingId)}&amount=${
        data.amountDue
      }`
    );
  };

  return (
    <aside className="card p-4">
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold">{formatMoney(p.priceMonthly)}</div>
        <div className="text-sm text-ink">per month</div>
      </div>

      <form onSubmit={submit} className="mt-3 space-y-3">
        <label className="block">
          <div className="text-sm text-ink mb-1">Move-in date</div>
          <input
            className="input"
            type="date"
            value={moveIn}
            min={iso(new Date())}
            onChange={(e) => setMoveIn(e.target.value)}
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <label className="block">
            <div className="text-sm text-ink mb-1">Months</div>
            <input
              className="input"
              type="number"
              min={1}
              max={12}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
            />
          </label>
          <label className="block">
            <div className="text-sm text-ink mb-1">Guests</div>
            <input
              className="input"
              type="number"
              min={1}
              max={4}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            className="input"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="rounded-xl bg-black/[0.03] p-3 text-sm">
          <div className="flex justify-between">
            <span>Lease end</span>
            <span>{end.toDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">{formatMoney(total)}</span>
          </div>
        </div>

        <button className="btn btn-accent w-full">Request to book</button>
        <p className="text-xs text-ink text-center">
          No charge yet. Host will confirm.
        </p>
      </form>
    </aside>
  );
}
