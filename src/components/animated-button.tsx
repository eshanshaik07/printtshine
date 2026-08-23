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

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    setPosition({ x: distanceX * 0.15, y: distanceY * 0.15 });
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
        initial={{ y: "100%" }}
        animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  const sharedProps = {
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setHovered(true),
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
