export function CardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card overflow-hidden animate-pulse">
          <div className="aspect-[4/3] bg-black/10" />
          <div className="p-3 md:p-4 space-y-2">
            <div className="h-4 w-2/3 rounded bg-black/10" />
            <div className="h-3 w-1/3 rounded bg-black/10" />
            <div className="h-4 w-1/2 rounded bg-black/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] animate-pulse">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 md:h-48 rounded-xl bg-black/10" />
          ))}
        </div>
        <div className="card p-4 space-y-3">
          <div className="h-5 w-40 bg-black/10 rounded" />
          <div className="h-4 w-full bg-black/10 rounded" />
          <div className="h-4 w-2/3 bg-black/10 rounded" />
        </div>
      </div>
      <div className="card p-4 space-y-3">
        <div className="h-7 w-24 bg-black/10 rounded" />
        <div className="h-10 bg-black/10 rounded" />
        <div className="h-10 bg-black/10 rounded" />
        <div className="h-16 bg-black/10 rounded" />
      </div>
    </div>
  );
}
