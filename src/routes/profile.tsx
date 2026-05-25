import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { FilterPills } from "@/components/FilterPills";
import avatarMe from "@/assets/avatar-me.jpg";
import meal1 from "@/assets/meal-1.jpg";
import meal2 from "@/assets/meal-2.jpg";
import meal3 from "@/assets/meal-3.jpg";

const gridImages = [
  meal1, meal2, meal3,
  meal2, meal3, meal1,
  meal3, meal1, meal2,
];

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({
    meta: [
      { title: "COMY — Profile" },
      { name: "description", content: "Your COMY food journal." },
    ],
  }),
});

function Profile() {
  const [filter, setFilter] = useState<string>("All");

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-md px-6 pt-10">
        {/* Avatar + Name + Bio */}
        <div className="flex flex-col items-center text-center">
          <img
            src={avatarMe}
            alt="Sofia"
            className="h-24 w-24 rounded-full object-cover"
          />
          <h1 className="mt-4 text-2xl font-extrabold">Sofia</h1>
          <p className="mt-1.5 max-w-[260px] text-sm font-semibold leading-relaxed text-muted-foreground">
            I eat everything and post most of it. Based in São Paulo.
          </p>

          {/* Counters */}
          <div className="mt-5 flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-lg font-extrabold">128</span>
              <span className="text-xs font-bold text-muted-foreground">
                Following
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-lg font-extrabold">342</span>
              <span className="text-xs font-bold text-muted-foreground">
                Followers
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8">
          <FilterPills value={filter} onChange={setFilter} />
        </div>

        {/* Photo Grid */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {gridImages.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-2xl">
              <img
                src={img}
                alt={`Meal ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
