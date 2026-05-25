import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/splash")({
  component: Splash,
  head: () => ({
    meta: [{ title: "COMY" }],
  }),
});

function Splash() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center gap-4">
        <Logo className="text-7xl" />
        <p className="text-sm font-semibold text-muted-foreground">
          eat together
        </p>
      </div>
    </div>
  );
}
