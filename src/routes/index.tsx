import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "COMY — Share what you eat" },
      {
        name: "description",
        content: "COMY is a social food app where friends share what they eat every day.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="mx-auto max-w-md px-6 pt-12 pb-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Design system preview
        </p>
        <h1 className="mt-3 text-5xl">COMY</h1>
        <p className="mt-3 text-base font-light text-muted-foreground">
          A little place to share what you ate today.
        </p>
      </header>

      <section className="mx-auto max-w-md px-6">
        <div
          className="aspect-[4/5] rounded-3xl bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        />
        <div
          className="mt-5 h-32 rounded-3xl bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        />
      </section>

      <BottomNav />
    </div>
  );
}
