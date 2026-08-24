import { FloatingElement } from "./floating-element";

/**
 * Ambient floating shapes rendered behind page content.
 * Uses foreground-derived tokens so the shapes stay visible in light and dark themes.
 */
export function FloatingShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <FloatingElement
        className="absolute left-[6%] top-[18%] h-28 w-28 rounded-full border border-foreground/15 dark:border-foreground/25"
        duration={7}
        distance={24}
      />
      <FloatingElement
        className="absolute right-[9%] top-[30%] hidden h-16 w-16 rounded-full bg-foreground/[0.06] dark:bg-foreground/[0.12] sm:block"
        duration={5.5}
        distance={18}
        delay={0.4}
      />
      <FloatingElement
        className="absolute left-[22%] bottom-[22%] hidden h-3 w-3 rounded-full bg-foreground/25 dark:bg-foreground/40 md:block"
        duration={4}
        distance={12}
        delay={0.8}
      />
      <FloatingElement
        className="absolute right-[18%] bottom-[14%] hidden h-40 w-40 rounded-full border border-foreground/10 dark:border-foreground/20 lg:block"
        duration={9}
        distance={30}
        delay={1.2}
      />
      <FloatingElement
        className="absolute left-[45%] top-[8%] hidden h-2 w-2 rounded-full bg-foreground/30 dark:bg-foreground/50 lg:block"
        duration={4.5}
        distance={14}
        delay={1.6}
      />
      <FloatingElement
        className="absolute right-[38%] bottom-[38%] hidden h-24 w-24 rotate-12 rounded-3xl border border-foreground/10 dark:border-foreground/20 xl:block"
        duration={8}
        distance={22}
        delay={2}
      />
    </div>
  );
}
