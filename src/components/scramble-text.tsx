import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: "span" | "div";
  mode?: "scramble" | "typewriter";
}

export function ScrambleText({ text, className, as: Tag = "span", mode = "scramble" }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const frameRef = useRef<number | null>(null);
  const iterationRef = useRef(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runningRef = useRef(false);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.getBoundingClientRect().width);
    }
  }, [text, className]);

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

  const runTypewriter = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    setShowCursor(true);

    const deleteSpeed = 55;
    const typeSpeed = 75;
    const pause = 180;
    let index = text.length;

    const clearTimers = () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };

    const tick = () => {
      if (index > 0) {
        index--;
        setDisplay(text.slice(0, index));
        typingRef.current = setTimeout(tick, deleteSpeed);
      } else {
        typingRef.current = setTimeout(() => {
          let i = 0;
          const type = () => {
            if (i <= text.length) {
              setDisplay(text.slice(0, i));
              i++;
              typingRef.current = setTimeout(type, typeSpeed);
            } else {
              setShowCursor(false);
              runningRef.current = false;
            }
          };
          type();
        }, pause);
      }
    };

    tick();
    return clearTimers;
  }, [text]);

  useEffect(() => {
    if (!isHovering) {
      setDisplay(text);
      setShowCursor(false);
      runningRef.current = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (typingRef.current) clearTimeout(typingRef.current);
      iterationRef.current = 0;
      return;
    }

    if (mode === "scramble") {
      iterationRef.current = 0;
      frameRef.current = requestAnimationFrame(scramble);
    } else {
      runTypewriter();
    }

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [isHovering, scramble, runTypewriter, text, mode]);

  return (
    <>
      <span ref={measureRef} className={cn("invisible absolute whitespace-nowrap", className)} aria-hidden="true">
        {text}
      </span>
      <Tag
        className={cn("inline-flex cursor-pointer items-center whitespace-nowrap text-center", className)}
        style={{ width: width ? `${width}px` : undefined }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setTimeout(() => setIsHovering(false), 800)}
      >
        {display}
        {showCursor && (
          <span className="ml-0.5 inline-block h-[0.9em] w-[0.08em] animate-pulse bg-current align-middle" />
        )}
      </Tag>
    </>
  );
}
