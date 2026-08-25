import { cn } from "@/lib/utils";

/** Theme-aware printShine monogram. Uses currentColor so it works in light + dark. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="printShine"
      className={cn("h-full w-full text-foreground", className)}
    >
      <rect x="1.5" y="1.5" width="45" height="45" rx="12" stroke="currentColor" strokeWidth="2.5" opacity="0.35" />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontSize="21"
        fontWeight="700"
        fontFamily="var(--font-display, ui-sans-serif), system-ui, sans-serif"
        letterSpacing="-1"
      >
        pS
      </text>
    </svg>
  );
}
