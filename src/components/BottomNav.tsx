import { Home, Plus, Compass, User } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

type NavItem = {
  to: string;
  label: string;
  icon: typeof Home;
  primary?: boolean;
};

const items: NavItem[] = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/post", label: "Post", icon: Plus, primary: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-background/90 backdrop-blur-xl"
      style={{ boxShadow: "var(--shadow-nav)" }}
    >
      <ul className="mx-auto flex max-w-md items-center justify-around px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ to, label, icon: Icon, primary }) => {
          const isActive =
            to === "/" ? pathname === "/" : pathname.startsWith(to);

          return (
            <li key={label}>
              <Link
                to={to}
                className="group flex flex-col items-center gap-0.5 py-1"
              >
                {primary ? (
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform group-hover:scale-105 group-active:scale-95"
                    style={{ boxShadow: "var(--shadow-glow)" }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                )}
                <span
                  className={`text-[10px] font-bold tracking-wide ${
                    isActive && !primary
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
