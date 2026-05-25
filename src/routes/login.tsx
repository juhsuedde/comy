import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: "COMY — Sign in" }],
  }),
});

function Login() {
  return (
    <div className="flex min-h-screen flex-col bg-background px-6 pb-10 pt-16">
      <div className="flex flex-col items-center">
        <Logo className="text-5xl" />
        <p className="mt-2 text-sm font-semibold text-muted-foreground">
          eat together
        </p>
      </div>

      <div className="mx-auto mt-16 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-extrabold">Welcome back</h1>
        <p className="text-sm font-medium text-muted-foreground">
          Sign in to see what your friends are eating today.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm font-medium outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="Password"
          className="h-12 w-full rounded-2xl border border-input bg-background px-4 text-sm font-medium outline-none focus:border-primary"
        />

        <Link
          to="/"
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
