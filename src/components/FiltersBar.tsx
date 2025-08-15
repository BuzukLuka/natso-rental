"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import clsx from "clsx";

const TYPES = [
  { k: "room", label: "Rooms" },
  { k: "studio", label: "Studios" },
  { k: "shared", label: "Shared" },
];

export default function FiltersBar() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const type = sp.get("type") || "";
  const min = sp.get("min") || "";
  const max = sp.get("max") || "";

  const setParam = (k: string, v: string) => {
    const p = new URLSearchParams(sp.toString());
    if (!v) p.delete(k);
    else p.set(k, v);
    router.push(`${pathname}?${p.toString()}`);
  };

  const activeCount = useMemo(() => {
    let n = 0;
    if (type) n++;
    if (min || max) n++;
    return n;
  }, [type, min, max]);

  return (
    <div className="card p-3 md:p-4">
      <div className="flex flex-wrap items-center gap-2">
        {TYPES.map((t) => (
          <button
            key={t.k}
            className={clsx(
              "badge hover:bg-black/5",
              type === t.k && "text-white border-transparent"
            )}
            style={
              type === t.k
                ? {
                    background: `linear-gradient(135deg, var(--primary), var(--mint))`,
                  }
                : {}
            }
            onClick={() => setParam("type", type === t.k ? "" : t.k)}
          >
            {t.label}
          </button>
        ))}

        <div className="mx-2 h-5 w-px bg-black/10" />

        <div className="flex items-center gap-2">
          <input
            placeholder="Min $"
            className="input h-9 w-28"
            inputMode="numeric"
            value={min}
            onChange={(e) => setParam("min", e.target.value)}
          />
          <span className="text-ink">—</span>
          <input
            placeholder="Max $"
            className="input h-9 w-28"
            inputMode="numeric"
            value={max}
            onChange={(e) => setParam("max", e.target.value)}
          />
        </div>

        {activeCount > 0 && (
          <button
            className="ml-auto btn btn-ghost h-9"
            onClick={() => router.push(pathname)}
          >
            Clear filters ({activeCount})
          </button>
        )}
      </div>
    </div>
  );
}
