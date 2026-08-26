import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PreloaderContext = createContext(true);

/** True once the preloader has finished (or was never shown). */
export function usePreloaderDone() {
  return useContext(PreloaderContext);
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Preloader({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setActive(false);
      setDone(true);
      return;
    }
    const t = setTimeout(() => setActive(false), 2200);
    return () => clearTimeout(t);
  }, [reduceMotion]);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  const brand = "printShine";

  return (
    <PreloaderContext.Provider value={done}>
      {children}
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {active && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <div className="relative flex flex-col items-center justify-center overflow-hidden px-4">
              {/* scroll/zoom mask */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "120%", scale: 1.5, opacity: 0 }}
                  animate={{ y: "0%", scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="block font-display text-3xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl"
                >
                  {brand}
                </motion.span>
              </div>

              {/* trailing shine line */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
                className="mt-4 h-px w-24 origin-center bg-foreground/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PreloaderContext.Provider>
  );
}
