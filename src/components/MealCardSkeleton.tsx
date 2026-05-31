export function MealCardSkeleton() {
  return (
    <article className="mb-8 space-y-3 rounded-[28px] p-3 pb-4" style={{ background: "color-mix(in srgb, #2A1F1B 3%, transparent)" }}>
      <div className="aspect-[16/10] w-full skeleton-shimmer rounded-2xl" />
      <div className="space-y-2 px-1 pt-1">
        <div className="h-5 w-3/4 skeleton-shimmer rounded-md" />
        <div className="h-4 w-1/2 skeleton-shimmer rounded-md" />
      </div>
      <div className="flex gap-2 px-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-9 w-14 skeleton-shimmer rounded-full" />
        ))}
      </div>
    </article>
  );
}

export function ProfileGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="aspect-square skeleton-shimmer rounded-xl" />
      ))}
    </div>
  );
}
