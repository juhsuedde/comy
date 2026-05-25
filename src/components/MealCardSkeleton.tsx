export function MealCardSkeleton() {
  return (
    <article className="space-y-3 rounded-[28px] bg-card p-3 pb-4">
      <div className="aspect-[16/10] w-full animate-pulse rounded-2xl bg-muted" />
      <div className="space-y-2 px-1">
        <div className="h-5 w-3/4 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
      </div>
      <div className="flex gap-2 px-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-14 animate-pulse rounded-full bg-muted" />
        ))}
      </div>
    </article>
  );
}
