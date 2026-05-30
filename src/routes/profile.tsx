import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { FilterPills, type Filter } from "@/components/FilterPills";
import { CURRENT_USER, profileGrid } from "@/lib/mock-data";

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
  const [filter, setFilter] = useState<Filter>("All");

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-32">
      <div className="mx-auto max-w-md px-6 pt-10">
        {/* Avatar + Name + Bio */}
        <div className="flex flex-col items-center text-center">
          <img
            src={CURRENT_USER.avatar_url!}
            alt="Sofia"
            className="h-24 w-24 rounded-full object-cover"
          />
          <h1 className="mt-4 text-2xl font-extrabold">Sofia</h1>
          <p className="mt-1.5 max-w-[260px] text-sm font-semibold leading-relaxed text-[#351E28]/70">
            I eat everything and post most of it. Based in São Paulo.
          </p>

          {/* Counters */}
          <div className="mt-5 flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="font-black text-2xl" style={{ color: "#351E28" }}>128</span>
              <span className="text-xs font-bold" style={{ color: "#351E28" }}>
                Following
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-black text-2xl" style={{ color: "#351E28" }}>342</span>
              <span className="text-xs font-bold" style={{ color: "#351E28" }}>
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
          {profileGrid.map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl">
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
