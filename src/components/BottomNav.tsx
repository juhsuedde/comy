import { Home, Plus, ScanFace, User } from "lucide-react";
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
  { to: "/friends", label: "Friends", icon: UserPlus },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed inset-x-0 z-50 flex justify-center pointer-events-none"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <ul
        className="pointer-events-auto flex items-center gap-2 px-3 py-2"
        style={{
          background: "#1A1A1A",
          borderRadius: "40px",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.35), 0 4px 12px -4px rgba(0,0,0,0.2)",
        }}
      >
        {items.map(({ to, label, icon: Icon, primary }) => {
          const isActive =
            to === "/" ? pathname === "/" : pathname.startsWith(to);

          return (
            <li key={label}>
              <Link to={to} aria-label={label} className="group block">
                {primary ? (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-105 group-active:scale-95">
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </span>
                ) : (
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                      isActive ? "bg-white/15 text-white" : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
