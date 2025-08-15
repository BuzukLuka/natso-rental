"use client";
import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-3 text-sm">
      <ol className="flex items-center flex-wrap gap-1 text-ink">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {c.href && !last ? (
                <Link className="hover:underline" href={c.href}>
                  {c.label}
                </Link>
              ) : (
                <span className={last ? "text-slate-900" : ""}>{c.label}</span>
              )}
              {!last && <span className="opacity-50">·</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
