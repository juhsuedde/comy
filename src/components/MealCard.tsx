import { useState } from "react";

type Reaction = { emoji: string; count: number };

interface MealCardProps {
  image: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  reactions: Reaction[];
}

export function MealCard({
  image,
  title,
  authorName,
  authorAvatar,
  timeAgo,
  reactions: initial,
}: MealCardProps) {
  const [reactions, setReactions] = useState(initial);
  const [active, setActive] = useState<string | null>(null);

  const toggle = (emoji: string) => {
    setReactions((rs) =>
      rs.map((r) =>
        r.emoji === emoji
          ? { ...r, count: r.count + (active === emoji ? -1 : 1) }
          : r,
      ),
    );
    setActive((a) => (a === emoji ? null : emoji));
  };

  return (
    <article className="space-y-3">
      <div
        className="relative overflow-hidden rounded-3xl bg-muted"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
          <div className="flex items-center gap-2.5">
            <img
              src={authorAvatar}
              alt={authorName}
              className="h-8 w-8 rounded-full border-2 border-white/90 object-cover"
            />
            <div className="flex items-baseline gap-2 text-white">
              <span className="text-sm font-semibold">{authorName}</span>
              <span className="text-xs font-light text-white/75">· {timeAgo}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-1">
        <h3 className="text-xl leading-tight">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2 px-1">
        {reactions.map((r) => {
          const isActive = active === r.emoji;
          return (
            <button
              key={r.emoji}
              type="button"
              onClick={() => toggle(r.emoji)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all active:scale-95 ${
                isActive
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/20"
              }`}
            >
              <span className="text-base leading-none">{r.emoji}</span>
              <span className="font-medium tabular-nums">{r.count}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
