import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type ReactNode, useRef, useState } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "default" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
}

type Dir = "left" | "right" | "top" | "bottom";

// Fully-clipped starting inset for each entry direction — the fill grows from
// the edge the cursor entered, so it is hidden until hover reveals it.
const startClip: Record<Dir, string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  top: "inset(0% 0% 100% 0%)",
  bottom: "inset(100% 0% 0% 0%)",
};

function entryDir(e: React.MouseEvent, rect: DOMRect): Dir {
  const relX = (e.clientX - rect.left) / rect.width;
  const relY = (e.clientY - rect.top) / rect.height;
  const fromLeft = relX;
  const fromRight = 1 - relX;
  const fromTop = relY;
  const fromBottom = 1 - relY;
  const min = Math.min(fromLeft, fromRight, fromTop, fromBottom);
  if (min === fromLeft) return "left";
  if (min === fromRight) return "right";
  if (min === fromTop) return "top";
  return "bottom";
}

export function AnimatedButton({
  children,
  variant = "primary",
  size = "default",
  className,
  href,
  onClick,
}: AnimatedButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [dir, setDir] = useState<Dir>("left");

  const handleMouseEnter = (e: React.MouseEvent) => {
    const el = ref.current;
    if (el) setDir(entryDir(e, el.getBoundingClientRect()));
    setHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({ x: (e.clientX - centerX) * 0.15, y: (e.clientY - centerY) * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setHovered(false);
  };

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display font-medium tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  // Fill + text use complementary tokens that flip per theme, so contrast holds
  // in both light and dark mode:
  //   fill = the theme's foreground (ink), text = the theme's background (paper).
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:text-accent-foreground",
    secondary:
      "bg-secondary text-secondary-foreground hover:text-background",
    outline:
      "border border-foreground/20 bg-transparent text-foreground hover:border-foreground hover:text-background",
  };

  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const content = (
    <>
      <motion.span
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          variant === "primary" && "bg-accent",
          variant === "secondary" && "bg-foreground",
          variant === "outline" && "bg-foreground",
        )}
        initial={false}
        animate={{
          clipPath: hovered
            ? "inset(0% 0% 0% 0%)"
            : startClip[dir],
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    className: cn(baseStyles, variants[variant], sizes[size], className),
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...sharedProps}
        transition={{ type: "spring" as const, stiffness: 200, damping: 15, mass: 0.5 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      {...sharedProps}
      transition={{ type: "spring" as const, stiffness: 200, damping: 15, mass: 0.5 }}
    >
      {content}
    </motion.button>
  );
}
