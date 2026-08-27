import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "div";
}

export function ScrambleText({ text, className, as: Tag = "span" }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const frameRef = useRef<number | null>(null);
  const iterationRef = useRef(0);

  const scramble = useCallback(() => {
    const length = text.length;
    iterationRef.current += 0.35;

    const next = text
      .split("")
      .map((char, index) => {
        if (char === " ") return " ";
        if (index < Math.floor(iterationRef.current)) {
          return text[index];
        }
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join("");

    setDisplay(next);

    if (iterationRef.current < length + 4) {
      frameRef.current = requestAnimationFrame(scramble);
    } else {
      setDisplay(text);
      iterationRef.current = 0;
    }
  }, [text]);

  useEffect(() => {
    if (!isHovering) {
      setDisplay(text);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      iterationRef.current = 0;
      return;
    }

    iterationRef.current = 0;
    frameRef.current = requestAnimationFrame(scramble);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isHovering, scramble, text]);

  return (
    <Tag
      className={cn("inline-block cursor-pointer whitespace-nowrap", className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setTimeout(() => setIsHovering(false), 800)}
    >
      {display}
    </Tag>
  );
}
