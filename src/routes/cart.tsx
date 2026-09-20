import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { AnimatedButton } from "@/components/animated-button";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — printShine" },
      {
        name: "description",
        content: "Review your selected printShine products and continue customizing your order.",
      },
      { property: "og:title", content: "Your Cart — printShine" },
      {
        property: "og:description",
        content: "Review your selected printShine products and continue customizing your order.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  return (
    <section className="flex min-h-[78vh] items-center justify-center px-4 pb-20 pt-32 sm:px-6 sm:pt-36 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-xl flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0.8, rotate: -8 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.12, type: "spring", stiffness: 180, damping: 15 }}
          className="mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-border bg-secondary/70 shadow-lg"
        >
          <ShoppingCart className="h-10 w-10 text-foreground" strokeWidth={1.6} />
        </motion.div>

        <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
          Your cart
        </p>
        <h1 className="text-balance font-display text-4xl font-semibold text-foreground sm:text-5xl">
          Nothing here yet
        </h1>
        <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
          Explore our previous work and choose a product you would like us to customize for you.
        </p>

        <div className="mt-8">
          <AnimatedButton href="/work" size="lg" variant="primary">
            Explore Works
            <ArrowRight className="h-4 w-4" />
          </AnimatedButton>
        </div>

        <Link
          to="/"
          className="animated-underline mt-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Return home
        </Link>
      </motion.div>
    </section>
  );
}