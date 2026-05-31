import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, QrCode, Share2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { BottomNav } from "@/components/BottomNav";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatarMe from "@/assets/avatar-me.jpg";

export const Route = createFileRoute("/friends")({
  component: Friends,
  head: () => ({
    meta: [
      { title: "COMY — Find Friends" },
      {
        name: "description",
        content: "Find and invite friends to share meals on COMY.",
      },
    ],
  }),
});

type Suggestion = {
  name: string;
  avatar: string;
  mutuals: number;
  bio?: string;
};

const suggestions: Suggestion[] = [
  { name: "@lucas", avatar: avatar1, mutuals: 5, bio: "loves ramen" },
  { name: "@marina", avatar: avatar2, mutuals: 3, bio: "salad season" },
  { name: "@pedro", avatar: avatar3, mutuals: 2, bio: "burger guy" },
  { name: "@sofia.r", avatar: avatarMe, mutuals: 1, bio: "weeknight cook" },
];

const searchResults: Suggestion[] = [
  { name: "@anaeats", avatar: avatar2, mutuals: 0, bio: "brunch enthusiast" },
  { name: "@joaoc", avatar: avatar1, mutuals: 0, bio: "homemade pasta" },
  { name: "@thekitchen", avatar: avatar3, mutuals: 0, bio: "weekend baker" },
];

function Friends() {
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [showShareMenu, setShowShareMenu] = useState(false);
  const hasFriends = Object.values(following).some(Boolean);

  const toggleFollow = (name: string) =>
    setFollowing((prev) => ({ ...prev, [name]: !prev[name] }));

  const onShareLink = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Join me on COMY", url });
      } catch {
        /* user dismissed */
      }
    } else {
      await navigator.clipboard?.writeText(url);
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-32">
      <div className="mx-auto max-w-md px-5 pt-8 sm:px-6 sm:pt-10">
        {/* HEADER */}
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-[#2A1F1B]">Find Friends</h1>
            <p className="mt-2 text-sm font-semibold text-[#2A1F1B]/60">
              See what your people are eating
            </p>
          </div>
          <div className="relative">
            <motion.button
              type="button"
              onClick={() => setShowShareMenu((s) => !s)}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A1F1B]/5 transition-colors hover:bg-[#2A1F1B]/10"
              aria-label="Share invite"
            >
              <Share2 className="h-5 w-5" strokeWidth={2.5} style={{ color: "#FF5C34" }} />
            </motion.button>
            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-2xl border border-[#2A1F1B]/10 bg-background"
                  style={{ boxShadow: "0 10px 30px -10px rgba(42,31,27,0.2)" }}
                >
                  <button
                    type="button"
                    onClick={onShareLink}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-[#2A1F1B] transition-colors hover:bg-[#2A1F1B]/5"
                  >
                    <Share2 className="h-4 w-4" strokeWidth={2.5} />
                    Share link
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-bold text-[#2A1F1B] transition-colors hover:bg-[#2A1F1B]/5"
                  >
                    <QrCode className="h-4 w-4" strokeWidth={2.5} />
                    Share QR code
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>


        {/* SEARCH SECTION */}
        <section className="mt-8">
          <h2 className="text-base font-extrabold text-[#2A1F1B]">Find by username</h2>
          <div className="relative mt-3">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2A1F1B]/40"
              strokeWidth={2.5}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search @username..."
              className="h-12 w-full rounded-full card-elevated pl-11 pr-4 text-sm font-semibold text-[#2A1F1B] placeholder:text-[#2A1F1B]/40 outline-none transition-shadow focus:ring-2 focus:ring-[#FF5C34]/40 focus:shadow-[0_0_0_4px_rgba(255,92,52,0.12)]"
            />
          </div>

          {query.trim().length > 0 && (
            <ul className="mt-4 space-y-3">
              {searchResults.map((u) => (
                <UserRow
                  key={u.name}
                  user={u}
                  followed={!!following[u.name]}
                  onToggle={() => toggleFollow(u.name)}
                  showBio
                />
              ))}
            </ul>
          )}
        </section>

        <section className="card-dinner mt-8 rounded-3xl p-5">
          <h2 className="text-base font-extrabold text-[#2A1F1B]">People you may know</h2>
          <p className="mt-1 text-sm font-semibold text-[#2A1F1B]/60">
            Based on your contacts
          </p>
          <ul className="mt-4 space-y-3">
            {suggestions.map((u) => (
              <UserRow
                key={u.name}
                user={u}
                followed={!!following[u.name]}
                onToggle={() => toggleFollow(u.name)}
              />
            ))}
          </ul>
        </section>

        {!hasFriends && (
          <section className="mt-12 flex flex-col items-center px-6 text-center">
            <div className="text-5xl" aria-hidden>🍽️</div>
            <h3 className="mt-3 text-lg font-extrabold text-[#2A1F1B]">Ninguém por aqui ainda...</h3>
            <p className="mt-1 text-sm font-semibold text-[#2A1F1B]/60">
              Que tal convidar aquela pessoa que sempre posta comida no Instagram?
            </p>
          </section>
        )}
      </div>

      <BottomNav />
    </div>
  );
}


function UserRow({
  user,
  followed,
  onToggle,
  showBio,
}: {
  user: Suggestion;
  followed: boolean;
  onToggle: () => void;
  showBio?: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ring-[#FF5C34]/20"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold text-[#2A1F1B]">{user.name}</p>
        <p className="truncate text-xs font-semibold text-[#2A1F1B]/50">
          {showBio
            ? user.bio ?? ""
            : user.mutuals === 1
              ? "1 mutual friend"
              : `${user.mutuals} mutual friends`}
        </p>
      </div>
      <motion.button
        type="button"
        onClick={onToggle}
        layout
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="flex items-center gap-1 rounded-full px-4 py-2 text-xs font-extrabold"
        style={
          followed
            ? { background: "#AEB8A0", color: "#FFFFFF", border: "2px solid transparent" }
            : { background: "transparent", color: "#FF5C34", border: "2px solid #FF5C34" }
        }
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {followed ? (
            <motion.span
              key="following"
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 4 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-1"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
              Following
            </motion.span>
          ) : (
            <motion.span
              key="follow"
              initial={{ opacity: 0, x: 4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.18 }}
            >
              Follow
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </li>
  );
}

