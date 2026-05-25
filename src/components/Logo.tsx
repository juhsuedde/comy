import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "primary" | "white";
  className?: string;
  /** Tailwind text-size class controls overall scale (e.g. text-5xl). */
};

/**
 * COMY wordmark — lowercase "comy" where the "o" is replaced by a small
 * plate-with-steam mark. Size is driven by font-size (use Tailwind text-*).
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
  // Sized in em units so it scales with the surrounding font-size.
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      style={{
        width: "0.78em",
        height: "0.78em",
        marginLeft: "0.02em",
        marginRight: "0.02em",
        transform: "translateY(0.04em)",
      }}
      fill="none"
    >
      {/* steam curl */}
      <path
        d="M16 2 C 13.5 4.5, 18.5 6, 16 8.5"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* plate ring */}
      <circle cx="16" cy="20" r="10" stroke={color} strokeWidth="4" />
      {/* plate center */}
      <circle cx="16" cy="20" r="3.2" fill={color} />
    </svg>
  );
}

export default Logo;
