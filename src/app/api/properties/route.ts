import { NextResponse } from "next/server";
import { properties } from "@/data/properties";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const type = searchParams.get("type") || "";
  const min = Number(searchParams.get("min") || 0);
  const max = Number(searchParams.get("max") || 0);

  const list = properties.filter((p) => {
    if (q && !`${p.city} ${p.province} ${p.title}`.toLowerCase().includes(q))
      return false;
    if (type && p.type !== type) return false;
    if (min && p.priceMonthly < min) return false;
    if (max && p.priceMonthly > max) return false;
    return true;
  });

  return NextResponse.json({ items: list });
}
