import { useState } from "react";

const filters = [
  { label: "All", emoji: "🍽️", bg: "#FFFFFF", border: "#EDEEE9" },
  { label: "Breakfast", emoji: "☀️", bg: "#FFF8E1", border: "transparent" },
  { label: "Lunch", emoji: "🥗", bg: "#F0F4EF", border: "transparent" },
  { label: "Dinner", emoji: "🌙", bg: "#F3F0FA", border: "transparent" },
  { label: "Snack", emoji: "⚡", bg: "#FFF1EC", border: "transparent" },
] as const;

export type Filter = (typeof filters)[number]["label"];

interface Props {
  value?: Filter;
  onChange?: (f: Filter) => void;
}

export function FilterPills({ value, onChange }: Props) {
  const [internal, setInternal] = useState<Filter>("All");
  const active = value ?? internal;
  const set = (f: Filter) => {
    setInternal(f);
    onChange?.(f);
  };

  return (
    <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-2.5">
        {filters.map((f) => {
          const isActive = f.label === active;
          return (
            <button
              key={f.label}
              type="button"
              onClick={() => set(f.label)}
              style={{
                background: isActive ? "var(--primary)" : f.bg,
                color: isActive ? "var(--primary-foreground)" : "var(--foreground)",
                borderColor: isActive ? "transparent" : f.border,
              }}
              className="flex min-w-[78px] flex-col items-center justify-center gap-1 rounded-2xl border px-4 py-2.5 text-xs font-bold transition-all active:scale-95"
            >
              <span className="text-xl leading-none">{f.emoji}</span>
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
