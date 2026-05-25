import { Home, Plus, Compass, User } from "lucide-react";
import { Link } from "@tanstack/react-router";

const items = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/post", label: "Post", icon: Plus, primary: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl"
      style={{ boxShadow: "var(--shadow-nav)" }}
    >
      <ul className="mx-auto flex max-w-md items-center justify-around px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        {items.map(({ to, label, icon: Icon, primary }) => (
          <li key={label}>
            <Link
              to={to}
              className="group flex flex-col items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: to === "/" }}
            >
              {primary ? (
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition-transform group-hover:scale-105 group-active:scale-95"
                  style={{ boxShadow: "var(--shadow-glow)" }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2.5} />
                </span>
              ) : (
                <Icon className="h-6 w-6" strokeWidth={2} />
              )}
              <span className="text-[10px] font-medium tracking-wide uppercase">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
