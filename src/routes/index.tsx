import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { FilterPills } from "@/components/FilterPills";
import { MealCard } from "@/components/MealCard";
import { MealCardSkeleton } from "@/components/MealCardSkeleton";
import { FeedEmptyState } from "@/components/FeedEmptyState";
import meal1 from "@/assets/meal-1.jpg";
import meal2 from "@/assets/meal-2.jpg";
import meal3 from "@/assets/meal-3.jpg";
import avatarMe from "@/assets/avatar-me.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";

export const Route = createFileRoute("/")({
  component: Feed,
  head: () => ({
    meta: [
      { title: "COMY — Feed" },
      {
        name: "description",
        content: "See what your friends are eating today on COMY.",
      },
    ],
  }),
});

const meals = [
  {
    id: "1",
    image: meal1,
    title: "Miojo com ovo e queijo",
    authorName: "Lucas",
    authorAvatar: avatar1,
    timeAgo: "2h ago",
    reactions: [
      { emoji: "😋", count: 12 },
      { emoji: "🤤", count: 5 },
      { emoji: "🔥", count: 3 },
      { emoji: "🥗", count: 1 },
      { emoji: "💛", count: 8 },
    ],
  },
  {
    id: "2",
    image: meal2,
    title: "Salada com frango grelhado e abacate",
    authorName: "Marina",
    authorAvatar: avatar2,
    timeAgo: "4h ago",
    reactions: [
      { emoji: "😋", count: 7 },
      { emoji: "🤤", count: 2 },
      { emoji: "🔥", count: 4 },
      { emoji: "🥗", count: 15 },
      { emoji: "💛", count: 6 },
    ],
  },
  {
    id: "3",
    image: meal3,
    title: "Hambúrguer caseiro com fritas",
    authorName: "Pedro",
    authorAvatar: avatar3,
    timeAgo: "6h ago",
    reactions: [
      { emoji: "😋", count: 21 },
      { emoji: "🤤", count: 14 },
      { emoji: "🔥", count: 18 },
      { emoji: "🥗", count: 0 },
      { emoji: "💛", count: 9 },
    ],
  },
];

function Feed() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="mx-auto max-w-md px-6 pt-10">
        <div className="flex items-center justify-between">
          <img
            src={avatarMe}
            alt="You"
            className="h-10 w-10 rounded-full object-cover"
          />
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <Bell className="h-5 w-5" strokeWidth={2} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
          </button>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold">
          Hey, Sofia 👋
        </h1>
        <p className="mt-2 text-base font-medium text-muted-foreground">
          What&apos;s everyone eating today?
        </p>

        <div className="mt-6">
          <FilterPills />
        </div>
      </header>

      <section className="mx-auto mt-8 max-w-md space-y-8 px-6">
        {meals.map((m) => (
          <MealCard key={m.title} {...m} />
        ))}
      </section>

      <BottomNav />
    </div>
  );
}
