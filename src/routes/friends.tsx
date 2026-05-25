import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, QrCode, Share2 } from "lucide-react";
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
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-md px-5 pt-8 sm:px-6 sm:pt-10">
        {/* HEADER */}
        <header>
          <h1 className="text-3xl font-extrabold">Find Friends</h1>
          <p className="mt-2 text-sm font-semibold" style={{ color: "#AEB8A0" }}>
            See what your people are eating
          </p>
        </header>

        {/* INVITE SECTION */}
        <section
          className="mt-6 rounded-3xl p-5"
          style={{ background: "#FFF1EC" }}
        >
          <h2 className="text-base font-extrabold">Invite friends to COMY</h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Your feed gets better with every friend you add
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onShareLink}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Share2 className="h-4 w-4" strokeWidth={2.5} />
              Share link
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-foreground bg-transparent px-4 py-3 text-sm font-bold text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <QrCode className="h-4 w-4" strokeWidth={2.5} />
              Share QR code
            </button>
          </div>
        </section>

        {/* SEARCH SECTION */}
        <section className="mt-8">
          <h2 className="text-base font-extrabold">Find by username</h2>
          <div className="relative mt-3">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              strokeWidth={2.5}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search @username..."
              className="h-12 w-full rounded-full bg-muted pl-11 pr-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-primary/30"
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

        {/* SUGGESTIONS SECTION */}
        <section className="mt-8">
          <h2 className="text-base font-extrabold">People you may know</h2>
          <p className="mt-1 text-sm font-semibold" style={{ color: "#AEB8A0" }}>
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

        {/* EMPTY STATE */}
        {!hasFriends && (
          <section className="mt-12 flex flex-col items-center px-6 text-center">
            <div className="text-5xl" aria-hidden>
              🍽️
            </div>
            <h3 className="mt-3 text-lg font-extrabold">Your feed is hungry</h3>
            <p
              className="mt-1 text-sm font-semibold"
              style={{ color: "#AEB8A0" }}
            >
              Add friends to start seeing what they eat
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
        className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold">{user.name}</p>
        <p
          className="truncate text-xs font-semibold"
          style={{ color: "#AEB8A0" }}
        >
          {showBio
            ? user.bio ?? ""
            : user.mutuals === 1
              ? "1 mutual friend"
              : `${user.mutuals} mutual friends`}
        </p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={
          followed
            ? "rounded-full px-4 py-2 text-xs font-extrabold text-foreground"
            : "rounded-full bg-primary px-4 py-2 text-xs font-extrabold text-primary-foreground transition-opacity hover:opacity-90"
        }
        style={followed ? { background: "#AEB8A0" } : undefined}
      >
        {followed ? "Following" : "Follow"}
      </button>
    </li>
  );
}
