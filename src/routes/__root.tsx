import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/contexts/AuthContext";
import { PageTransition } from "@/components/PageTransition";

import appCss from "../styles.css?url";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFBF7] px-4">
      <div className="max-w-md text-center">
        <div
          className="mx-auto flex h-28 w-28 items-center justify-center rounded-full text-5xl"
          style={{ background: "color-mix(in srgb, #FF5C34 12%, transparent)" }}
        >
          🍽️
        </div>
        <h1 className="mt-6 text-5xl font-black tracking-tight text-[#2A1F1B]">404</h1>
        <h2 className="mt-2 text-lg font-bold text-[#2A1F1B]">Cardápio não encontrado</h2>
        <p className="mt-2 text-sm font-semibold text-[#2A1F1B]/60">
          A página que você procura saiu do menu.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            style={{ boxShadow: "0 6px 18px -6px rgba(255,92,52,0.45)" }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFFBF7] px-4">
      <div className="max-w-md text-center">
        <div
          className="mx-auto flex h-28 w-28 items-center justify-center rounded-full text-5xl"
          style={{ background: "color-mix(in srgb, #FF5C34 12%, transparent)" }}
        >
          🍳
        </div>
        <h1 className="mt-6 text-2xl font-black tracking-tight text-[#2A1F1B]">
          Ops, queimamos o prato
        </h1>
        <p className="mt-2 text-sm font-semibold text-[#2A1F1B]/60">
          Nossa cozinha digital travou. Tenta de novo ou volta pra home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
            style={{ boxShadow: "0 6px 18px -6px rgba(255,92,52,0.45)" }}
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#2A1F1B]/10 bg-transparent px-5 py-3 text-sm font-bold text-[#2A1F1B]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}


export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </AuthProvider>
    </QueryClientProvider>
  );
}

