import Link from "next/link";

export default function EmptyState({
  title = "Nothing to show",
  subtitle = "Try adjusting your filters.",
  action,
}: {
  title?: string;
  subtitle?: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="card p-8 text-center">
      <div
        className="mx-auto mb-3 h-12 w-12 rounded-2xl"
        style={{
          background:
            "conic-gradient(from 180deg, var(--primary), var(--mint), var(--accent), var(--primary))",
        }}
      />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-ink">{subtitle}</p>
      {action && (
        <Link href={action.href} className="mt-4 inline-flex btn btn-primary">
          {action.label}
        </Link>
      )}
    </div>
  );
}
