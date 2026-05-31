import { Home, Plus, ScanFace, User } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: typeof Home;
  primary?: boolean;
};

const items: NavItem[] = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/post", label: "Post", icon: Plus, primary: true },
  { to: "/friends", label: "Friends", icon: ScanFace },
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
        className="pointer-events-auto flex items-center gap-1 px-3 py-2"
        style={{
          background: "#351E28",
          borderRadius: "40px",
          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.35), 0 4px 12px -4px rgba(0,0,0,0.2)",
        }}
      >
        {items.map(({ to, label, icon: Icon, primary }) => {
          const isActive =
            to === "/" ? pathname === "/" : pathname.startsWith(to);

          return (
            <li key={label} className="relative">
              <Link to={to} aria-label={label} className="group block">
                {primary ? (
                  <motion.span
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    style={{ boxShadow: "0 6px 18px -6px rgba(255,92,52,0.55)" }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <div className="relative flex items-center">
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "#FF5C34",
                          boxShadow: "0 0 0 4px rgba(255,92,52,0.18), 0 4px 14px -4px rgba(255,92,52,0.55)",
                        }}
                      />
                    )}
                    <motion.div
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className={cn(
                        "relative z-10 flex items-center gap-1 rounded-full transition-opacity",
                        isActive ? "text-white px-4 py-2 opacity-100" : "text-white/55 px-3 py-2 group-hover:opacity-100 group-hover:text-white",
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 1.75} />
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            key="label"
                            initial={{ opacity: 0, width: 0, x: -4 }}
                            animate={{ opacity: 1, width: "auto", x: 0 }}
                            exit={{ opacity: 0, width: 0, x: -4 }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            className="text-xs font-bold whitespace-nowrap overflow-hidden"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
