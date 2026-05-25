import { useState } from "react";

const filters = ["All", "Breakfast", "Lunch", "Dinner", "Snack"] as const;
export type Filter = (typeof filters)[number];

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
          const isActive = f === active;
          return (
            <button
              key={f}
              type="button"
              onClick={() => set(f)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>
    </div>
  );
}
