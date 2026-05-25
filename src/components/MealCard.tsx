import { useState } from "react";
import { Link } from "@tanstack/react-router";

type Reaction = { emoji: string; count: number };

interface MealCardProps {
  id?: string;
  image: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  reactions: Reaction[];
}

export function MealCard({
  id,
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
    <article className="space-y-3 rounded-[28px] bg-card p-3 pb-4">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-3.5">
          <div className="flex items-center gap-2.5">
            <img
              src={authorAvatar}
              alt={authorName}
              className="h-8 w-8 rounded-full border-2 border-white/90 object-cover"
            />
            <div className="flex items-baseline gap-2 text-white">
              <span className="text-sm font-bold">{authorName}</span>
              <span className="text-xs font-medium" style={{ color: "#AEB8A0" }}>
                · {timeAgo}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-1">
        <h3 className="text-lg font-extrabold leading-snug">{title}</h3>
      </div>

      <div className="flex flex-wrap gap-2 px-1">
        {reactions.map((r) => {
          const isActive = active === r.emoji;
          return (
            <button
              key={r.emoji}
              type="button"
              onClick={() => toggle(r.emoji)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-all active:scale-95 ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/70"
              }`}
            >
              <span className="text-lg leading-none">{r.emoji}</span>
              <span className="font-bold tabular-nums">{r.count}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
