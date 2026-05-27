import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "primary" | "white";
  className?: string;
  /** Tailwind text-size class controls overall scale (e.g. text-5xl). */
};

/**
 * COMY wordmark — lowercase "comy" where the "o" is a clean ring with a
 * central dot, hinting at a plate viewed from above.
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
      <span>c</span>
      <PlateO color={color} />
      <span>my</span>
    </span>
  );
}

function PlateO({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      focusable="false"
      style={{
        width: "0.75em",
        height: "0.75em",
        marginLeft: "0.04em",
        marginRight: "0.04em",
        display: "inline-block",
      }}
      fill="none"
    >
      {/* outer ring — like a clean letter O */}
      <circle
        cx="14"
        cy="14"
        r="9.5"
        stroke={color}
        strokeWidth="2.5"
      />
      {/* inner dot — the plate hint */}
      <circle cx="14" cy="14" r="3" fill={color} />
    </svg>
  );
}

export default Logo;
