import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";

import markAsset from "@/assets/printshine-mark.png.asset.json";

const MIN_DISPLAY_MS = 1500;

/** Full-screen loading screen shown while navigating between pages. */
export function RouteLoader() {
  const reduceMotion = useReducedMotion();
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  const [visible, setVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading) {
      // Clear any pending hide and show the loader, recording when it appeared.
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      startTimeRef.current = Date.now();
      setVisible(true);
      return;
    }

    // Navigation finished — enforce the minimum display time.
    const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : MIN_DISPLAY_MS;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      startTimeRef.current = null;
    }, remaining);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="route-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-background"
        >
          <div className="relative grid h-32 w-32 place-items-center">
            {/* loading circle */}
            <motion.svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full text-foreground"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
            >
              <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.12" />
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="70 220"
              />
            </motion.svg>

            {/* flipping logo */}
            <motion.div
              className="h-20 w-20 [transform-style:preserve-3d]"
              animate={reduceMotion ? {} : { rotateY: [0, 180, 360] }}
              transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], repeat: Infinity }}
            >
              <img
                src={markAsset.url}
                alt="printShine logo mark"
                className="h-full w-full object-contain dark:invert dark:brightness-200"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
