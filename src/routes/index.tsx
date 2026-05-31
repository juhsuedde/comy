import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Bell } from "lucide-react";
import { Logo } from "@/components/Logo";
import { BottomNav } from "@/components/BottomNav";
import { FilterPills } from "@/components/FilterPills";
import { PullToRefresh } from "@/components/PullToRefresh";
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
  const [refreshing, setRefreshing] = useState(false);
  const { scrollY } = useScroll();
  const greetingOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const greetingHeight = useTransform(scrollY, [0, 80], [28, 0]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setRefreshing(false);
  };

  const isEmpty = !loading && !refreshing && meals.length === 0;

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-32">
      <PullToRefresh onRefresh={handleRefresh}>
        <header className="sticky top-0 z-30 mx-auto max-w-md px-5 pt-8 sm:px-6 sm:pt-10 bg-[#FFFBF7]/85 backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <Logo className="text-3xl" />
              <motion.p
                style={{ opacity: greetingOpacity, height: greetingHeight }}
                className="mt-1 text-sm font-semibold text-[#2A1F1B]/60 overflow-hidden"
              >
                Hey {user?.username ?? "there"} 👋 what&apos;s everyone eating today?
              </motion.p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                aria-label="Notifications"
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#2A1F1B] transition-colors hover:bg-[#2A1F1B]/5"
              >
                <Bell className="h-5 w-5" strokeWidth={2} />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
              </motion.button>
              <img
                src={user?.avatar_url ?? ""}
                alt="You"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#FF5C34]/30"
              />
            </div>
          </div>

          <div className="mt-4 pb-3">
            <FilterPills />
          </div>
        </header>

        <section className="mx-auto mt-6 max-w-md px-5 sm:px-6">
          {loading ? (
            <>
              <MealCardSkeleton />
              <MealCardSkeleton />
            </>
          ) : isEmpty ? (
            <FeedEmptyState />
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {meals.map((m) => (
                <motion.div
                  key={m.id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="mb-8"
                >
                  <MealCard {...m} category={categoryMap[m.id]} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </PullToRefresh>

      <BottomNav />
    </div>
  );
}
