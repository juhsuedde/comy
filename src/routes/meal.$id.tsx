import { useState, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Share2, Send, Sun, Salad, Moon, Cookie, CupSoda, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { CURRENT_USER, mealDetailItems } from "@/lib/mock-data";

const categoryMap = {
  Breakfast: { Icon: Sun, bg: "#F7FAD0" },
  Lunch: { Icon: Salad, bg: "#EDFBF4" },
  Dinner: { Icon: Moon, bg: "#F3F0FA" },
  Snack: { Icon: Cookie, bg: "#FFF1EC" },
  Drink: { Icon: CupSoda, bg: "#D7EFFF" },
  Other: { Icon: Utensils, bg: "#F5F5F3" },
} as const;

type CategoryKey = keyof typeof categoryMap;

const meals = mealDetailItems;

export const Route = createFileRoute("/meal/$id")({
  component: MealDetail,
  head: () => ({
    meta: [
      { title: "COMY — Meal" },
      { name: "description", content: "A meal shared by a friend on COMY." },
    ],
  }),
});

function MealDetail() {
  const { id } = Route.useParams();
  const meal = meals[id] ?? meals["1"];
  const cat = categoryMap[meal.category];
  const CatIcon = cat.Icon;

  const [reactions, setReactions] = useState(meal.reactions);
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
    <div className="min-h-screen bg-[#FFFBF7] pb-40">
      {/* Photo */}
      <div className="relative">
        <img
          src={meal.image}
          alt={meal.title}
          className="aspect-square w-full object-cover"
        />
        <Link
          to="/"
          aria-label="Back"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition active:scale-95"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
        </Link>
        <button
          type="button"
          aria-label="Share"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition active:scale-95"
        >
          <Share2 className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="mx-auto max-w-md px-6 pt-5">
        {/* Author row */}
        <div className="flex items-center gap-3">
          <img
            src={meal.authorAvatar}
            alt={meal.authorName}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#2A1F1B]">{meal.authorName}</span>
            <span className="text-xs font-medium text-[#2A1F1B]/50">· {meal.timeAgo}</span>
          </div>
        </div>

        {/* Category */}
        <div className="mt-4">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-[#2A1F1B]"
            style={{ background: cat.bg }}
          >
            <CatIcon className="h-3.5 w-3.5" />
            {meal.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-3 text-3xl font-black tracking-tight leading-tight text-[#2A1F1B]">
          {meal.title}
        </h1>

        {/* Description */}
        {meal.description && (
          <p className="mt-3 text-base font-medium leading-relaxed text-[#2A1F1B]/70">
            {meal.description}
          </p>
        )}

        {/* Hashtags */}
        {meal.hashtags.length > 0 && (
          <div className="-mx-6 mt-4 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              {meal.hashtags.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1.5 text-xs font-bold"
                  style={{ background: "color-mix(in srgb, #2A1F1B 5%, transparent)", color: "color-mix(in srgb, #2A1F1B 60%, transparent)" }}
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}


        {/* Reactions */}
        <div className="mt-7 flex flex-wrap gap-3">
          {reactions.map((r) => {
            const isActive = active === r.emoji;
            return (
              <motion.button
                key={r.emoji}
                type="button"
                onClick={() => toggle(r.emoji)}
                whileTap={{ scale: 1.3, rotate: [0, -8, 8, 0] }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2.5 transition-all ${
                  isActive ? `bg-primary/15 text-primary ${pulsingEmoji === r.emoji ? "animate-bg-pulse" : ""}` : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                <span className={`text-2xl leading-none ${bouncingEmoji === r.emoji ? "animate-emoji-bounce" : ""}`}>{r.emoji}</span>
                <span className="text-xs font-bold tabular-nums">{r.count}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Comments */}
        <h2 className="mt-8 text-lg font-extrabold text-[#2A1F1B]">
          Comments ({meal.comments.length})
        </h2>
        <ul className="mt-4 space-y-5">
          {meal.comments.map((c, i) => (
            <li key={i} className="flex gap-3">
              <img
                src={c.avatar}
                alt={c.name}
                className="h-9 w-9 flex-shrink-0 rounded-full object-cover ring-2 ring-[#FF5C34]/20"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-[#2A1F1B]">{c.name}</span>
                  <span className="text-xs font-medium text-[#2A1F1B]/50">{c.timeAgo}</span>
                </div>
                <p className="mt-0.5 text-sm font-medium leading-relaxed text-[#2A1F1B]">
                  {c.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Fixed comment input */}
      <div
        className="fixed inset-x-0 z-40 bg-[#FFFBF7] px-4 pt-3"
        style={{ bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + 76px)" }}
      >
        <div className="mx-auto flex max-w-md items-center gap-2.5 rounded-full card-elevated px-3 py-2">
          <img
            src={CURRENT_USER.avatar_url!}
            alt="You"
            className="h-8 w-8 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-sm font-medium text-[#2A1F1B] placeholder:text-[#2A1F1B]/40 focus:outline-none"
          />
          <motion.button
            type="button"
            aria-label="Send"
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
          >
            <Send className="h-4 w-4" strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

