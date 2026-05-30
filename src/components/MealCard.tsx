import { useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Sun, Salad, Moon, Cookie, CupSoda, Utensils } from "lucide-react";

type Reaction = { emoji: string; count: number };

interface MealCardProps {
  id?: string;
  image: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  timeAgo: string;
  reactions: Reaction[];
  category?: string;
}

const CATEGORY_MAP: Record<string, { Icon: typeof Sun; color: string; label: string }> = {
  breakfast: { Icon: Sun, color: "#F59E0B", label: "Breakfast" },
  lunch: { Icon: Salad, color: "#10B981", label: "Lunch" },
  dinner: { Icon: Moon, color: "#8B5CF6", label: "Dinner" },
  snack: { Icon: Cookie, color: "#FF5C34", label: "Snack" },
  drink: { Icon: CupSoda, color: "#6B7280", label: "Drink" },
};

export function MealCard({
  id,
  image,
  title,
  authorName,
  authorAvatar,
  timeAgo,
  reactions: initial,
  category,
}: MealCardProps) {
  const cat = category ? CATEGORY_MAP[category.toLowerCase()] : undefined;
  const [reactions, setReactions] = useState(initial);
  const [active, setActive] = useState<string | null>(null);
  const [bouncingEmoji, setBouncingEmoji] = useState<string | null>(null);
  const [pulsingEmoji, setPulsingEmoji] = useState<string | null>(null);

  const toggle = useCallback((emoji: string) => {
    const wasActive = active === emoji;
    setReactions((rs) =>
      rs.map((r) =>
        r.emoji === emoji
          ? { ...r, count: r.count + (wasActive ? -1 : 1) }
          : r,
      ),
    );
    setActive((a) => (a === emoji ? null : emoji));

    setBouncingEmoji(emoji);
    setTimeout(() => {
      setBouncingEmoji((current) => (current === emoji ? null : current));
    }, 200);

    if (!wasActive) {
      setPulsingEmoji(emoji);
      setTimeout(() => {
        setPulsingEmoji((current) => (current === emoji ? null : current));
      }, 400);
    }
  }, [active]);

  return (
    <article className="space-y-3 rounded-[28px] bg-card p-3 pb-4">
      <div className="relative overflow-hidden rounded-2xl">
        <Link
          to={id ? "/meal/$id" : "/"}
          params={id ? { id } : undefined}
          aria-label={`Open ${title}`}
          className="block"
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform active:scale-[0.99]"
          />
        </Link>
        {cat && (
          <div
            className="absolute left-3 top-3 flex h-[26px] items-center gap-1 rounded-full px-[10px] backdrop-blur"
            style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
          >
            <cat.Icon className="h-3 w-3" style={{ color: cat.color }} />
            <span className="text-[11px] font-bold text-[#1A1A1A]">{cat.label}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-3.5">
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
                  ? `bg-primary/15 text-primary ${pulsingEmoji === r.emoji ? "animate-bg-pulse" : ""}`
                  : "bg-secondary text-muted-foreground hover:bg-secondary/70"
              }`}
            >
              <span className={`text-lg leading-none ${bouncingEmoji === r.emoji ? "animate-emoji-bounce" : ""}`}>{r.emoji}</span>
              <span className="font-bold tabular-nums">{r.count}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
}
