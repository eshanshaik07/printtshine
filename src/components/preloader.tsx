import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const PreloaderContext = createContext(true);

/** True once the preloader has finished (or was never shown). */
export function usePreloaderDone() {
  return useContext(PreloaderContext);
}

const EASE = [0.16, 1, 0.3, 1] as const;

export function Preloader({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(true);
  const [done, setDone] = useState(false);
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
            <span className="inline-block px-4">
              <span className="block overflow-visible">
                <motion.span
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.85, ease: EASE }}
                  className="block font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
                >
                  printSh
                  <span className="relative inline-block">
                    ı
                    <span
                      aria-hidden="true"
                      className="preloader-sparkles absolute left-1/2 top-0 h-0 w-0 text-foreground"
                    >
                      {[
                        "-left-6 -top-6 text-sm",
                        "-left-1 -top-9 text-2xl",
                        "left-5 -top-7 text-xs",
                      ].map((className) => (
                        <span
                          key={className}
                          className={`preloader-sparkle absolute block leading-none ${className}`}
                        >
                          ✦
                        </span>
                      ))}
                    </span>
                  </span>
                  ne
                </motion.span>
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </PreloaderContext.Provider>
  );
}
