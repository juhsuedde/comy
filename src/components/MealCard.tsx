import { useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sun, Salad, Moon, Cookie, CupSoda } from "lucide-react";
import { cn } from "@/lib/utils";

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

const categoryTheme = {
  breakfast: { Icon: Sun, label: "Breakfast", bg: "bg-[#E9F056]/10", ring: "ring-[#E9F056]/30", badge: "bg-[#E9F056] text-[#2A1F1B]" },
  lunch:     { Icon: Salad, label: "Lunch",     bg: "bg-[#FF5C34]/10", ring: "ring-[#FF5C34]/20", badge: "bg-[#FF5C34] text-white" },
  dinner:    { Icon: Moon, label: "Dinner",     bg: "bg-[#351E2B]/5",  ring: "ring-[#351E2B]/10", badge: "bg-[#351E2B] text-white" },
  snack:     { Icon: Cookie, label: "Snack",    bg: "bg-[#AEB8A0]/10", ring: "ring-[#AEB8A0]/30", badge: "bg-[#AEB8A0] text-[#2A1F1B]" },
  drink:     { Icon: CupSoda, label: "Drink",   bg: "bg-[#D7EFFF]/20", ring: "ring-[#D7EFFF]/50", badge: "bg-[#D7EFFF] text-[#2A1F1B]" },
} as const;

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
  const themeKey = category?.toLowerCase() as keyof typeof categoryTheme | undefined;
  const theme = themeKey ? categoryTheme[themeKey] : undefined;
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
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "space-y-3 rounded-[28px] p-3 pb-4 transition-all duration-300",
        theme ? theme.bg : "card-elevated",
      )}
    >
      <div className={cn("relative overflow-hidden rounded-2xl", theme?.ring)}>
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
        {theme && (
          <span className={cn("absolute right-3 top-3 flex items-center gap-1 rounded-full px-[10px] py-[3px] text-[11px] font-bold backdrop-blur-sm", theme.badge)}>
            <theme.Icon className="h-3 w-3" />
            {theme.label}
          </span>
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
            <motion.button
              key={r.emoji}
              type="button"
              onClick={() => toggle(r.emoji)}
              whileTap={{ scale: 1.4, rotate: [0, -10, 10, 0] }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-all ${
                isActive
                  ? `bg-primary/15 text-primary ${pulsingEmoji === r.emoji ? "animate-bg-pulse" : ""}`
                  : "bg-secondary text-muted-foreground hover:bg-secondary/70"
              }`}
            >
              <span className={`text-lg leading-none ${bouncingEmoji === r.emoji ? "animate-emoji-bounce" : ""}`}>{r.emoji}</span>
              <span className="font-bold tabular-nums">{r.count}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.article>
  );
}
