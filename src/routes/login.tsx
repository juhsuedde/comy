import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: "COMY — Sign in" }],
  }),
});

function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFFBF7] px-6 pb-10 pt-16">
      <div className="flex flex-col items-center">
        <Logo className="text-5xl" />
        <p className="mt-2 text-sm font-semibold text-[#2A1F1B]/60">eat together</p>
      </div>

      <div className="mx-auto mt-16 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-black tracking-tight text-[#2A1F1B]">Welcome back</h1>
        <p className="text-sm font-semibold text-[#2A1F1B]/60">
          Sign in to see what your friends are eating today.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="h-12 w-full rounded-2xl border-2 border-[#2A1F1B]/10 bg-background px-4 text-sm font-semibold text-[#2A1F1B] placeholder:text-[#2A1F1B]/40 outline-none transition-all focus:border-[#FF5C34] focus:shadow-[0_0_0_4px_rgba(255,92,52,0.12)]"
        />
        <input
          type="password"
          placeholder="Password"
          className="h-12 w-full rounded-2xl border-2 border-[#2A1F1B]/10 bg-background px-4 text-sm font-semibold text-[#2A1F1B] placeholder:text-[#2A1F1B]/40 outline-none transition-all focus:border-[#FF5C34] focus:shadow-[0_0_0_4px_rgba(255,92,52,0.12)]"
        />

        <motion.div whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
          <Link
            to="/"
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground"
            style={{ boxShadow: "0 6px 18px -6px rgba(255,92,52,0.45)" }}
          >
            Sign in
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
