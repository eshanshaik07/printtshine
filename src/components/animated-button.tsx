import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { type ReactNode, useRef, useState } from "react";

const MotionLink = motion.create(Link);

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "inverse";
  size?: "default" | "lg";
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

type Dir = "left" | "right" | "top" | "bottom";

// Which axis grows and where the fill anchors for each cursor-entry direction.
// The fill is a plain rectangle; the button's `overflow-hidden rounded-full`
// clips it to the pill shape, so the moving edge stays clean and straight.
const originFor: Record<Dir, string> = {
  left: "left center",
  right: "right center",
  top: "center top",
  bottom: "center bottom",
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
  type = "button",
  disabled = false,
  onClick,
}: AnimatedButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [dir, setDir] = useState<Dir>("left");

  // Touch devices fire synthetic mouseenter on tap and never a matching
  // mouseleave, which leaves the fill + hover text colour stuck after
  // navigating back. Only react to real pointer (mouse) input.
  const isFinePointer = (e: React.PointerEvent) => e.pointerType === "mouse";

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    setHovered(false);
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (disabled || !isFinePointer(e)) return;
    const el = ref.current;
    if (el) setDir(entryDir(e, el.getBoundingClientRect()));
    setHovered(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (disabled || !isFinePointer(e)) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({ x: (e.clientX - centerX) * 0.15, y: (e.clientY - centerY) * 0.15 });
  };

  const handlePointerLeave = () => {
    if (disabled) return;
    reset();
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
    inverse:
      "border border-primary bg-primary-foreground text-primary hover:border-primary-foreground hover:text-primary-foreground",
  };

  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const isHorizontal = dir === "left" || dir === "right";

  const content = (
    <>
      <motion.span
        className={cn(
          "pointer-events-none absolute inset-0",
          variant === "primary" && "bg-accent",
          variant === "secondary" && "bg-foreground",
          variant === "outline" && "bg-foreground",
          variant === "inverse" && "bg-primary",
        )}
        style={{ transformOrigin: originFor[dir] }}
        initial={false}
        animate={{
          scaleX: isHorizontal ? (hovered ? 1 : 0) : 1,
          scaleY: isHorizontal ? 1 : (hovered ? 1 : 0),
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const sharedProps = {
    onPointerMove: handlePointerMove,
    onPointerEnter: handlePointerEnter,
    onPointerLeave: handlePointerLeave,
    onPointerCancel: reset,
    onPointerUp: (e: React.PointerEvent) => {
      if (!isFinePointer(e)) reset();
    },
    onBlur: reset,
    ...(disabled ? {} : { animate: { x: position.x, y: position.y } }),
    ...(disabled ? {} : { whileHover: { scale: 1.03 } }),
    ...(disabled ? {} : { whileTap: { scale: 0.97 } }),
    className: cn(
      baseStyles,
      variants[variant],
      sizes[size],
      disabled && "cursor-not-allowed opacity-70",
      className,
    ),
  };

  if (href) {
    const internal = href.startsWith("/");
    const Comp = internal ? MotionLink : motion.a;
    const linkProps = internal ? { to: href } : { href };
    return (
      <Comp
        ref={ref as React.RefObject<HTMLAnchorElement>}
        {...(linkProps as never)}
        {...sharedProps}
        transition={{ type: "spring" as const, stiffness: 200, damping: 15, mass: 0.5 }}
      >
        {content}
      </Comp>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...sharedProps}
      transition={{ type: "spring" as const, stiffness: 200, damping: 15, mass: 0.5 }}
    >
      {content}
    </motion.button>
  );
}
