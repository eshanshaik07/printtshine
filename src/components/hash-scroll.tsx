import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

export function HashScroll() {
  const hash = useRouterState({ select: (state) => state.location.hash });
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    if (!hash) return;

    const id = decodeURIComponent(hash.replace(/^#/, ""));
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  return null;
}