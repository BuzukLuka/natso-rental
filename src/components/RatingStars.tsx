export default function RatingStars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div
      className="inline-flex items-center gap-0.5"
      aria-label={`${value} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const on = i < full || (i === full && half);
        return (
          <span
            key={i}
            className="text-sm"
            style={{ color: on ? "var(--accent)" : "#e2e8f0" }}
          >
            ★
          </span>
        );
      })}
      <span className="ml-1 text-xs text-ink">{value.toFixed(1)}</span>
    </div>
  );
}
