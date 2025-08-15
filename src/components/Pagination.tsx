"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function Pagination({
  total,
  pageSize = 9,
}: {
  total: number;
  pageSize?: number;
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = Math.max(1, Number(sp.get("page") || 1));
  const pages = Math.max(1, Math.ceil(total / pageSize));

  const go = (p: number) => {
    const q = new URLSearchParams(sp.toString());
    if (p <= 1) q.delete("page");
    else q.set("page", String(p));
    router.push(`${pathname}?${q.toString()}`);
  };

  if (pages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      <button
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className="btn btn-ghost h-9 disabled:opacity-50"
      >
        Prev
      </button>
      {Array.from({ length: pages }).map((_, i) => {
        const p = i + 1;
        const active = p === page;
        return (
          <button
            key={p}
            onClick={() => go(p)}
            className={clsx(
              "h-9 min-w-9 rounded-full px-3 text-sm",
              active ? "text-white" : "hover:bg-black/5"
            )}
            style={
              active
                ? {
                    background:
                      "linear-gradient(135deg, var(--primary), var(--mint))",
                  }
                : undefined
            }
          >
            {p}
          </button>
        );
      })}
      <button
        onClick={() => go(page + 1)}
        disabled={page >= pages}
        className="btn btn-ghost h-9 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
