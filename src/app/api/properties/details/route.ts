import { NextResponse } from "next/server";
import { getPropertyBySlug } from "@/data/properties";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const p = getPropertyBySlug(params.slug);
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(p);
}
