import { useState, useRef, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, X } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const categories = ["Breakfast", "Lunch", "Dinner", "Snack", "Other"] as const;
type Category = (typeof categories)[number];

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
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="mx-auto max-w-md px-6 pt-10">
        {/* Photo Upload Area */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`relative flex h-[42vh] min-h-[200px] w-full flex-col items-center justify-center overflow-hidden transition-colors focus:outline-none ${
            photo
              ? "rounded-3xl"
              : "rounded-3xl border-2 border-dashed border-foreground/15 bg-muted"
          }`}
        >
          {photo ? (
            <>
              <img
                src={photo}
                alt="Meal preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto();
                }}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform active:scale-90"
                aria-label="Remove photo"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 text-foreground/40">
              <Camera className="h-10 w-10" strokeWidth={1.5} />
              <span className="text-sm font-bold">
                Tap to add your meal photo
              </span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </button>

        {/* Title */}
        <div className="mt-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What did you eat?"
            className="w-full bg-transparent text-2xl font-extrabold text-foreground placeholder:text-foreground/30 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="mt-5">
          <div className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-2.5">
              {categories.map((c) => {
                const isActive = c === category;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(isActive ? null : c)}
                    className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all active:scale-95 ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-5">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note, recipe, or vibe..."
            rows={3}
            className="w-full resize-none bg-transparent text-base font-semibold text-foreground placeholder:text-foreground/30 focus:outline-none"
          />
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tagOptions.map(({ label, emoji }) => {
            const isActive = tags.includes(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleTag(label)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition-all active:scale-95 ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary text-foreground/60 hover:bg-secondary/80"
                }`}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Post Button */}
        <button
          type="button"
          onClick={handlePost}
          className="mt-8 flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-base font-extrabold text-primary-foreground transition-transform active:scale-[0.98]"
        >
          Post it
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
