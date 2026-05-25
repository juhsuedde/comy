import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { FilterPills } from "@/components/FilterPills";

export const Route = createFileRoute("/explore")({
  component: Explore,
  head: () => ({
    meta: [
      { title: "COMY — Explore" },
      { name: "description", content: "Discover meals from the COMY community." },
    ],
  }),
});

function Explore() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="mx-auto max-w-md px-5 pt-8 sm:px-6 sm:pt-10">
        <h1 className="text-3xl font-extrabold">Explore</h1>
        <p className="mt-2 text-base font-medium text-muted-foreground">
          Discover meals from the community.
        </p>

        <div className="mt-5 flex items-center gap-2 rounded-full bg-secondary px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search meals, people, tags..."
            className="flex-1 bg-transparent text-sm font-medium placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <div className="mt-5">
          <FilterPills />
        </div>
      </header>

      <section className="mx-auto mt-6 max-w-md px-5 sm:px-6">
        <div className="flex flex-col items-center px-6 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-4xl">
            🔍
          </div>
          <h2 className="mt-5 text-lg font-extrabold">Nothing here yet</h2>
          <p className="mt-2 max-w-[260px] text-sm font-medium text-muted-foreground">
            Trending meals will appear here as the community grows.
          </p>
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
