import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Share2, Send, Sun, Salad, Moon, Cookie, CupSoda, Utensils } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { CURRENT_USER, mealDetailItems } from "@/lib/mock-data";

const categoryMap = {
  Breakfast: { Icon: Sun, bg: "#FFF8E1" },
  Lunch: { Icon: Salad, bg: "#F0F4EF" },
  Dinner: { Icon: Moon, bg: "#F3F0FA" },
  Snack: { Icon: Cookie, bg: "#FFF1EC" },
  Drink: { Icon: CupSoda, bg: "#E0F2FE" },
  Other: { Icon: Utensils, bg: "#F5F5F3" },
} as const;

type CategoryKey = keyof typeof categoryMap;

const meals = mealDetailItems;

const meals: Record<string, MealData> = {
  "1": {
    image: meal1,
    title: "Miojo com ovo e queijo",
    authorName: "Lucas",
    authorAvatar: avatar1,
    timeAgo: "2h ago",
    category: "Snack",
    description:
      "Aquele miojo de domingo à noite que salva a alma. Ovo mexido na hora e muito queijo derretido por cima.",
    hashtags: ["comfortfood", "domingo", "rápido", "homemade"],
    reactions: [
      { emoji: "😋", count: 12 },
      { emoji: "🤤", count: 5 },
      { emoji: "🔥", count: 3 },
      { emoji: "🥗", count: 1 },
      { emoji: "💛", count: 8 },
    ],
    comments: [
      { name: "Marina", avatar: avatar2, text: "Que delícia, agora deu fome!", timeAgo: "1h ago" },
      { name: "Pedro", avatar: avatar3, text: "Clássico imbatível 🔥", timeAgo: "45m ago" },
      { name: "Sofia", avatar: avatarMe, text: "Manda a receita do ovo!", timeAgo: "20m ago" },
    ],
  },
  "2": {
    image: meal2,
    title: "Salada com frango grelhado e abacate",
    authorName: "Marina",
    authorAvatar: avatar2,
    timeAgo: "4h ago",
    category: "Lunch",
    description: "Almoço leve antes do treino. Tempero simples, azeite e limão.",
    hashtags: ["fitfood", "almoço", "vegan-friendly"],
    reactions: [
      { emoji: "😋", count: 7 },
      { emoji: "🤤", count: 2 },
      { emoji: "🔥", count: 4 },
      { emoji: "🥗", count: 15 },
      { emoji: "💛", count: 6 },
    ],
    comments: [
      { name: "Lucas", avatar: avatar1, text: "Que linda essa salada!", timeAgo: "3h ago" },
      { name: "Sofia", avatar: avatarMe, text: "Vou copiar segunda 🙌", timeAgo: "2h ago" },
      { name: "Pedro", avatar: avatar3, text: "Abacate é vida", timeAgo: "1h ago" },
    ],
  },
  "3": {
    image: meal3,
    title: "Hambúrguer caseiro com fritas",
    authorName: "Pedro",
    authorAvatar: avatar3,
    timeAgo: "6h ago",
    category: "Dinner",
    description: "Sexta à noite pede um burger feito em casa. Pão brioche, cheddar e bacon crocante.",
    hashtags: ["burger", "sextou", "homemade", "comfortfood"],
    reactions: [
      { emoji: "😋", count: 21 },
      { emoji: "🤤", count: 14 },
      { emoji: "🔥", count: 18 },
      { emoji: "🥗", count: 0 },
      { emoji: "💛", count: 9 },
    ],
    comments: [
      { name: "Marina", avatar: avatar2, text: "Tá com cara de profissional!", timeAgo: "5h ago" },
      { name: "Lucas", avatar: avatar1, text: "Quero um agora 🤤", timeAgo: "4h ago" },
      { name: "Sofia", avatar: avatarMe, text: "Receita do pão?", timeAgo: "2h ago" },
    ],
  },
};

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
    <div className="min-h-screen bg-background pb-40">
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
            <span className="text-sm font-bold">{meal.authorName}</span>
            <span className="text-xs font-medium" style={{ color: "#AEB8A0" }}>
              · {meal.timeAgo}
            </span>
          </div>
        </div>

        {/* Category */}
        <div className="mt-4">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ background: cat.bg }}
          >
            <CatIcon className="h-3.5 w-3.5" />
            {meal.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-3 text-3xl font-extrabold leading-tight">
          {meal.title}
        </h1>

        {/* Description */}
        {meal.description && (
          <p className="mt-3 text-base font-medium text-muted-foreground">
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
                  style={{ background: "#EDEEE9", color: "#AEB8A0" }}
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
              <button
                key={r.emoji}
                type="button"
                onClick={() => toggle(r.emoji)}
                className={`flex flex-col items-center gap-1 rounded-2xl px-4 py-2.5 transition-all active:scale-95 ${
                  isActive ? "bg-primary/15 text-primary" : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                <span className="text-2xl leading-none">{r.emoji}</span>
                <span className="text-xs font-bold tabular-nums">{r.count}</span>
              </button>
            );
          })}
        </div>

        {/* Comments */}
        <h2 className="mt-8 text-lg font-extrabold">
          Comments ({meal.comments.length})
        </h2>
        <ul className="mt-4 space-y-5">
          {meal.comments.map((c, i) => (
            <li key={i} className="flex gap-3">
              <img
                src={c.avatar}
                alt={c.name}
                className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold">{c.name}</span>
                  <span className="text-xs font-medium" style={{ color: "#AEB8A0" }}>
                    {c.timeAgo}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium leading-relaxed">
                  {c.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Fixed comment input */}
      <div
        className="fixed inset-x-0 z-40 bg-background px-4 pt-3"
        style={{ bottom: "calc(max(1rem, env(safe-area-inset-bottom)) + 76px)" }}
      >
        <div className="mx-auto flex max-w-md items-center gap-2.5 rounded-full bg-secondary px-3 py-2">
          <img
            src={CURRENT_USER.avatar_url!}
            alt="You"
            className="h-8 w-8 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-sm font-medium placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            aria-label="Send"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition active:scale-95"
          >
            <Send className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
