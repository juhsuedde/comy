import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";
import { FilterPills } from "@/components/FilterPills";
import { MealCard } from "@/components/MealCard";
import { MealCardSkeleton } from "@/components/MealCardSkeleton";
import { FeedEmptyState } from "@/components/FeedEmptyState";
import { feedItems } from "@/lib/mock-data";
import { useAuth } from "@/contexts/AuthContext";

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

const meals = feedItems;

const categoryMap: Record<string, string> = {
  "1": "Snack",
  "2": "Lunch",
  "3": "Dinner",
};

function Feed() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const isEmpty = !loading && meals.length === 0;

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="mx-auto max-w-md px-5 pt-8 sm:px-6 sm:pt-10">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <Logo className="text-3xl" />
            <p className="mt-2 text-sm font-semibold text-muted-foreground">
              Hey {user?.username ?? "there"} 👋 what&apos;s everyone eating today?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            >
              <Bell className="h-5 w-5" strokeWidth={2} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
            </button>
            <img
              src={user?.avatar_url ?? ""}
              alt="You"
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
        </div>

        <div className="mt-6">
          <FilterPills />
        </div>
      </header>

      <section className="mx-auto mt-8 max-w-md space-y-8 px-5 sm:px-6">
        {loading ? (
          <>
            <MealCardSkeleton />
            <MealCardSkeleton />
          </>
        ) : isEmpty ? (
          <FeedEmptyState />
        ) : (
          meals.map((m) => <MealCard key={m.id} {...m} />)
        )}
      </section>

      <BottomNav />
    </div>
  );
}
