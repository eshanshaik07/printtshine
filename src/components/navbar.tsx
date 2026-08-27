import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AnimatedButton } from "./animated-button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { usePreloaderDone } from "./preloader";
import { ScrambleText } from "./scramble-text";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const MotionLink = motion.create(Link);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const preloaderDone = usePreloaderDone();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-2xl border px-4 py-3 shadow-lg transition-all duration-500 md:rounded-3xl md:px-6",
            scrolled
              ? "border-border/40 bg-background/70 shadow-xl backdrop-blur-2xl"
              : "border-border/30 bg-background/50 shadow-lg backdrop-blur-xl"
          )}
        >
          <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
            <motion.span
              initial={false}
              animate={{ opacity: preloaderDone ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              <ScrambleText text="printShine" />
            </motion.span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-foreground" }}
                className="animated-underline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <AnimatedButton href="/contact" size="default" variant="primary">
              Start a project
            </AnimatedButton>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/80 transition-colors hover:bg-secondary"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-2xl"
          >
            <div className="flex h-full flex-col px-6 py-6">
              <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/70 px-4 py-3 shadow-lg backdrop-blur-xl">
                <span className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  printShine
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/80 transition-colors hover:bg-secondary"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <MotionLink
                    key={link.label}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="font-display text-4xl font-medium text-foreground"
                  >
                    {link.label}
                  </MotionLink>
                ))}
              </nav>

              <div className="mt-auto pb-8">
                <AnimatedButton
                  href="/contact"
                  size="lg"
                  variant="primary"
                  onClick={() => setMobileOpen(false)}
                >
                  Start a project
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
