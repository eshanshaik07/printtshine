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
    const t = setTimeout(() => setActive(false), 2000);
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

  return (
    <PreloaderContext.Provider value={done}>
      {children}
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {active && (
          <motion.div
            key="preloader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <span className="overflow-hidden px-4">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.85, ease: EASE }}
                className="block font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              >
                printShine
              </motion.span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </PreloaderContext.Provider>
  );
}
