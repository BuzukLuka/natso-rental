import { NextResponse } from "next/server";
import { properties } from "@/data/properties";
import { BookingInput, BookingResponse } from "@/types";

export async function POST(req: Request) {
  const body = (await req.json()) as BookingInput;
  const prop = properties.find((p) => p.id === body.propertyId);
  if (!prop)
    return NextResponse.json({ error: "Invalid property" }, { status: 400 });
  if (!body.name || !body.email || !body.moveIn || !body.months) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const amountDue = prop.priceMonthly; // demo: first month
  const payload: BookingResponse = {
    bookingId: `BK-${Date.now()}`,
    amountDue,
    currency: "CAD",
  };
  return NextResponse.json(payload);
}
