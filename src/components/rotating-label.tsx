import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const labels = [
  "Graphic Design Studio",
  "Web Developer Studio",
];

export function RotatingLabel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % labels.length);
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block min-w-[12ch] text-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={labels[index]}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {labels[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
