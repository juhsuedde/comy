import { useState, useRef, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Camera, X, Sun, Salad, Moon, Cookie, CircleEllipsis } from "lucide-react";
import { toast } from "sonner";
import { BottomNav } from "@/components/BottomNav";


const categoryConfig = [
  { label: "Breakfast", Icon: Sun, bg: "#F7FAD0", previewBg: "bg-[#E9F056]/10" },
  { label: "Lunch", Icon: Salad, bg: "#EDFBF4", previewBg: "bg-[#FF5C34]/10" },
  { label: "Dinner", Icon: Moon, bg: "#F3F0FA", previewBg: "bg-[#351E2B]/10" },
  { label: "Snack", Icon: Cookie, bg: "#FFF1EC", previewBg: "bg-[#AEB8A0]/20" },
  { label: "Other", Icon: CircleEllipsis, bg: "#F5F5F3", previewBg: "bg-[#D7EFFF]/20" },
] as const;

type Category = (typeof categoryConfig)[number]["label"];

const tagOptions = [
  { label: "Homemade", emoji: "🏠" },
  { label: "Delivery", emoji: "🛵" },
  { label: "Restaurant", emoji: "🍽️" },
  { label: "Vegan", emoji: "🌱" },
  { label: "Comfort food", emoji: "💛" },
];

export const Route = createFileRoute("/post")({
  component: PostMeal,
  head: () => ({
    meta: [
      { title: "COMY — Post a Meal" },
      { name: "description", content: "Share what you're eating on COMY." },
    ],
  }),
});

function PostMeal() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo);
    };
  }, [photo]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(file);
      });
    }
  };

  const removePhoto = () => {
    setPhoto((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const toggleTag = (label: string) => {
    setTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  const handlePost = () => {
    toast.success("Bon appétit! Sua refeição tá no ar.");
    navigate({ to: "/" });
  };

  const activeCat = categoryConfig.find((c) => c.label === category);
  const accent = activeCat?.label === "Lunch" ? "#FF5C34"
    : activeCat?.label === "Breakfast" ? "#E9F056"
    : activeCat?.label === "Dinner" ? "#351E2B"
    : activeCat?.label === "Snack" ? "#AEB8A0"
    : "#FF5C34";

  return (
    <div className="min-h-screen bg-[#FFFBF7] pb-40">
      <div className="mx-auto max-w-md px-6 pt-10">
        {/* Photo Upload Area */}
        <motion.button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          animate={{
            backgroundColor: photo ? "transparent" : activeCat?.bg ?? "#EDEEE9",
          }}
          className={`relative flex h-[42vh] min-h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl transition-colors focus:outline-none ${
            photo ? "" : "border-2 border-dashed border-[#2A1F1B]/15"
          }`}
        >
          {photo ? (
            <>
              <img src={photo} alt="Meal preview" className="h-full w-full object-cover" />
              <motion.button
                type="button"
                onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </motion.button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-[#2A1F1B]/40">
              <Camera className="h-10 w-10" strokeWidth={1.5} />
              <span className="text-sm font-bold">Tap to add your meal photo</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </motion.button>

        {/* Title */}
        <div className="mt-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What did you eat?"
            className="w-full bg-transparent text-2xl font-extrabold text-[#2A1F1B] placeholder:text-[#2A1F1B]/30 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="mt-5">
          <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2">
              {categoryConfig.map((c) => {
                const isActive = c.label === category;
                const Icon = c.Icon;
                return (
                  <motion.button
                    key={c.label}
                    type="button"
                    onClick={() => setCategory(isActive ? null : c.label)}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    style={{
                      background: isActive ? "var(--primary)" : c.bg,
                      color: isActive ? "var(--primary-foreground)" : "var(--foreground)",
                      borderColor: isActive ? "transparent" : "rgba(42,31,27,0.08)",
                    }}
                    className="flex min-w-[60px] flex-col items-center justify-center gap-0.5 rounded-2xl border px-2.5 py-2 text-xs font-bold"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{c.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Description */}
        <div
          className="mt-5 rounded-2xl border-2 p-3 transition-all"
          style={{
            borderColor: category ? `color-mix(in srgb, ${accent} 35%, transparent)` : "rgba(42,31,27,0.08)",
            boxShadow: category ? `0 0 0 4px color-mix(in srgb, ${accent} 10%, transparent)` : "none",
          }}
        >
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note, recipe, or vibe..."
            rows={3}
            className="w-full resize-none bg-transparent text-base font-semibold text-[#2A1F1B] placeholder:text-[#2A1F1B]/40 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tagOptions.map(({ label, emoji }) => {
            const isActive = tags.includes(label);
            return (
              <motion.button
                key={label}
                type="button"
                onClick={() => toggleTag(label)}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition-colors"
                style={
                  isActive
                    ? { background: "color-mix(in srgb, #FF5C34 18%, transparent)", color: "#FF5C34" }
                    : { background: "color-mix(in srgb, #2A1F1B 5%, transparent)", color: "color-mix(in srgb, #2A1F1B 60%, transparent)" }
                }
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Post Button */}
        {(() => {
          const hasPhoto = !!photo;
          const hasTitle = title.trim().length > 0;
          const isReady = hasPhoto || hasTitle;
          const isComplete = hasPhoto && hasTitle;
          return (
            <motion.button
              type="button"
              onClick={isReady ? handlePost : undefined}
              disabled={!isReady}
              whileTap={isReady ? { scale: 0.97 } : undefined}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={`mt-8 flex w-full items-center justify-center rounded-2xl py-4 text-base font-extrabold ${
                isReady
                  ? "bg-primary text-primary-foreground cursor-pointer"
                  : "bg-[#2A1F1B]/5 text-[#2A1F1B]/40 cursor-not-allowed"
              } ${isComplete ? "animate-gentle-pulse" : ""}`}
              style={isReady ? { boxShadow: "0 6px 18px -6px rgba(255,92,52,0.45)" } : undefined}
            >
              Post it
            </motion.button>
          );
        })()}
      </div>

      <BottomNav />
    </div>
  );
}

