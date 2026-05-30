import { useState } from "react";
import { Utensils, Sun, Salad, Moon, Cookie, CupSoda } from "lucide-react";

const filters = [
  { label: "All", Icon: Utensils, bg: "#FFFFFF", border: "#EDEEE9" },
  { label: "Breakfast", Icon: Sun, bg: "#F7FAD0", border: "transparent" },
  { label: "Lunch", Icon: Salad, bg: "#EDFBF4", border: "transparent" },
  { label: "Dinner", Icon: Moon, bg: "#F3F0FA", border: "transparent" },
  { label: "Snack", Icon: Cookie, bg: "#FFF1EC", border: "transparent" },
  { label: "Drink", Icon: CupSoda, bg: "#D7EFFF", border: "transparent" },
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
      <div className="flex w-max gap-2">
        {filters.map((f) => {
          const isActive = f.label === active;
          const Icon = f.Icon;
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
              className="flex min-w-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl border px-2.5 py-2 text-xs font-bold transition-all active:scale-95"
            >
              <Icon className="h-4 w-4" />
              <span>{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

