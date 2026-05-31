import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { FilterPills, type Filter } from "@/components/FilterPills";
import { ProfileGridSkeleton } from "@/components/MealCardSkeleton";
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-32">
      <div className="mx-auto max-w-md px-6 pt-10">
        {/* Avatar + Name + Bio */}
        <div className="flex flex-col items-center text-center">
          <div
            className="rounded-full p-[3px]"
            style={{
              background:
                "conic-gradient(from 0deg, #FF5C34, #E9F056, #AEB8A0, #D7EFFF, #FF5C34)",
            }}
          >
            <img
              src={CURRENT_USER.avatar_url!}
              alt="Sofia"
              className="h-24 w-24 rounded-full border-2 border-[#FFFBF7] object-cover"
            />
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-[#2A1F1B]">Sofia</h1>
          <p className="mt-1.5 max-w-[260px] text-sm font-semibold leading-relaxed text-[#2A1F1B]/60">
            I eat everything and post most of it. Based in São Paulo.
          </p>

          <div className="mt-5 flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="font-black text-2xl text-[#2A1F1B]">128</span>
              <span className="text-xs font-bold text-[#2A1F1B]/60">Following</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-black text-2xl text-[#2A1F1B]">342</span>
              <span className="text-xs font-bold text-[#2A1F1B]/60">Followers</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <FilterPills value={filter} onChange={setFilter} />
        </div>

        <div className="mt-6">
          {loading ? (
            <ProfileGridSkeleton />
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {profileGrid.map((img, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`Meal ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
