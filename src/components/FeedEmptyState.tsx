import { Share2, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export function FeedEmptyState() {
  const handleShare = async () => {
    const shareData = {
      title: "Join me on COMY",
      text: "Come share what you're eating on COMY 🍽️",
      url: typeof window !== "undefined" ? window.location.origin : "",
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
      }
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div
        className="relative flex h-28 w-28 items-center justify-center rounded-full"
        style={{ background: "color-mix(in srgb, #FF5C34 12%, transparent)" }}
      >
        <Utensils className="h-14 w-14 text-[#FF5C34]" strokeWidth={1.75} />
        <span className="absolute -right-1 -top-1 text-3xl">✨</span>
      </div>
      <h2 className="mt-6 text-2xl font-black tracking-tight text-[#2A1F1B]">
        Sua timeline tá com fome
      </h2>
      <p className="mt-2 max-w-[280px] text-sm font-semibold leading-relaxed text-[#2A1F1B]/60">
        Segue alguém pra ver o que tá rolando na cozinha!
      </p>
      <motion.button
        type="button"
        onClick={handleShare}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        style={{ boxShadow: "0 6px 18px -6px rgba(255,92,52,0.45)" }}
      >
        <Share2 className="h-4 w-4" strokeWidth={2.5} />
        Share invite link
      </motion.button>
    </div>
  );
}

export function FeedErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div
        className="flex h-28 w-28 items-center justify-center rounded-full text-5xl"
        style={{ background: "color-mix(in srgb, #FF5C34 10%, transparent)" }}
      >
        🍳
      </div>
      <h2 className="mt-6 text-2xl font-black tracking-tight text-[#2A1F1B]">
        Ops, queimamos o prato
      </h2>
      <p className="mt-2 max-w-[280px] text-sm font-semibold leading-relaxed text-[#2A1F1B]/60">
        Nossa cozinha digital deu uma travada. Tenta de novo?
      </p>
      <motion.button
        type="button"
        onClick={onRetry}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        style={{ boxShadow: "0 6px 18px -6px rgba(255,92,52,0.45)" }}
      >
        Try again
      </motion.button>
    </div>
  );
}
