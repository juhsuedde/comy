import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "primary" | "white";
  className?: string;
};

/**
 * COMY wordmark — lowercase "comy" with a single dot (·) between o and m
 * suggesting a crumb, seed, or bite. Clean, minimal, no icon.
 */
export function Logo({ variant = "primary", className }: LogoProps) {
  const color = variant === "white" ? "#FFFFFF" : "#FF5C34";

  return (
    <span
      role="img"
      aria-label="COMY"
      className={cn(
        "inline-flex items-center font-extrabold leading-none tracking-tight select-none",
        className,
      )}
      style={{ color, fontFamily: "Nunito, ui-sans-serif, system-ui, sans-serif" }}
    >
      <span>co</span>
      <span
        aria-hidden="true"
        className="inline-block rounded-full"
        style={{
          width: "0.2em",
          height: "0.2em",
          backgroundColor: color,
          marginLeft: "0.06em",
          marginRight: "0.06em",
          verticalAlign: "middle",
        }}
      />
      <span>my</span>
    </span>
  );
}

export default Logo;
