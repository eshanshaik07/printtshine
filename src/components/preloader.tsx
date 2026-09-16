import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const PreloaderContext = createContext(true);

/** True once the preloader has finished (or was never shown). */
export function usePreloaderDone() {
  return useContext(PreloaderContext);
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Preloader({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(true);
  const [done, setDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setActive(false), 2000);
    return () => clearTimeout(t);
  }, []);

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
            initial={false}
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: EASE }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          >
            <span className="relative inline-block px-4">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, ease: EASE }}
                  className="block font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                >
                  printShine
                </motion.span>
              </span>
              <span
                aria-hidden="true"
                className="absolute left-[69%] top-0 h-0 w-0 text-foreground"
              >
                {[
                  { className: "-left-5 -top-5 text-[11px]", delay: 0 },
                  { className: "-left-1 -top-8 text-base", delay: 0.22 },
                  { className: "left-4 -top-5 text-[9px]", delay: 0.44 },
                ].map((sparkle) => (
                  <motion.span
                    key={sparkle.className}
                    className={`absolute block leading-none ${sparkle.className}`}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={
                      prefersReducedMotion
                        ? { opacity: 0.85, scale: 1 }
                        : {
                            opacity: [0.2, 1, 0.2, 0.2],
                            scale: [0.65, 1.15, 0.65, 0.65],
                          }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 1.35,
                            delay: 0.55 + sparkle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                  >
                    ✦
                  </motion.span>
                ))}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </PreloaderContext.Provider>
  );
}
