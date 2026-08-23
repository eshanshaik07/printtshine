import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Slide = {
  src: string;
  alt: string;
  caption: string;
};

export function HeroCarousel({ slides, interval = 4500 }: { slides: Slide[]; interval?: number }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number, dir: number) => {
      setState([(next + slides.length) % slides.length, dir]);
    },
    [slides.length],
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setState(([i]) => [(i + 1) % slides.length, 1]), interval);
    return () => clearInterval(id);
  }, [paused, interval, slides.length]);

  const active = slides[index]!;

  return (
    <div
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.img
          key={index}
          src={active.src}
          alt={active.alt}
          width={1200}
          height={900}
          loading={index === 0 ? "eager" : "lazy"}
          initial={{ opacity: 0, x: direction > 0 ? "12%" : "-12%", scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: direction > 0 ? "-8%" : "8%", scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-foreground/25 to-transparent" />

      <AnimatePresence mode="wait">
        <motion.div
          key={active.caption}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-6 left-6 rounded-full bg-background/90 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-sm"
        >
          {active.caption}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            onClick={() => go(i, i > index ? 1 : -1)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full bg-background/70 transition-all duration-500",
              i === index ? "w-6 bg-background" : "w-1.5 hover:bg-background",
            )}
          />
        ))}
      </div>

      <button
        onClick={() => go(index - 1, -1)}
        aria-label="Previous image"
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/50 bg-background/80 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-background focus-visible:opacity-100 group-hover:opacity-100"
      >
        <ChevronLeft className="h-4 w-4 text-foreground" />
      </button>
      <button
        onClick={() => go(index + 1, 1)}
        aria-label="Next image"
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border/50 bg-background/80 opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-background focus-visible:opacity-100 group-hover:opacity-100"
      >
        <ChevronRight className="h-4 w-4 text-foreground" />
      </button>
    </div>
  );
}
