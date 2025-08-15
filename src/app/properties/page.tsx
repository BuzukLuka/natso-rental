import { Container } from "@/components/Container";
import FiltersBar from "@/components/FiltersBar";
import PropertyGrid from "@/components/PropertyGrid";
import { properties } from "@/data/properties";
import { formatMoney } from "@/utils/currency";

function filterFromParams(obj: Record<string, string | string[] | undefined>) {
  const get = (k: string) => {
    const v = obj[k];
    return Array.isArray(v) ? v[0] : v || "";
  };

  const q = get("q").toLowerCase();
  const type = get("type");
  const min = Number(get("min") || 0);
  const max = Number(get("max") || 0);

  return properties.filter((p) => {
    if (q && !`${p.city} ${p.province} ${p.title}`.toLowerCase().includes(q))
      return false;
    if (type && p.type !== type) return false;
    if (min && p.priceMonthly < min) return false;
    if (max && p.priceMonthly > max) return false;
    return true;
  });
}

export default async function PropertiesPage({
  searchParams,
}: {
  // In Next 14/15 App Router, searchParams is async:
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams; // ✅ must await
  const list = filterFromParams(sp);

  return (
    <Container className="py-8 space-y-4">
      <h1 className="text-2xl font-bold">All rentals</h1>
      <FiltersBar />
      <PropertyGrid items={list} />
      {!!list.length && (
        <p className="mt-4 text-sm text-ink">
          Showing {list.length} result(s). Prices shown are monthly (
          {formatMoney(0).replace("0.00", "…")} est. utilities).
        </p>
      )}
    </Container>
  );
}
