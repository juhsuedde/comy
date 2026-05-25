import { Share2 } from "lucide-react";

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
      /* user cancelled — no-op */
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary text-5xl">
        🍽️
      </div>
      <h2 className="mt-6 text-xl font-extrabold">Your feed is hungry</h2>
      <p className="mt-2 max-w-[260px] text-sm font-medium text-muted-foreground">
        Invite friends to start seeing what they're eating today.
      </p>
      <button
        type="button"
        onClick={handleShare}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition active:scale-95"
      >
        <Share2 className="h-4 w-4" strokeWidth={2.5} />
        Share invite link
      </button>
    </div>
  );
}
