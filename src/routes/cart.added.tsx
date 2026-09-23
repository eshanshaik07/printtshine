import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { AnimatedButton } from "@/components/animated-button";
import { useCart } from "@/components/cart-provider";

export const Route = createFileRoute("/cart/added")({
  head: () => ({
    meta: [
      { title: "Added to Cart — printShine" },
      { name: "description", content: "Your selected printShine product was added to your cart." },
      { property: "og:title", content: "Added to Cart — printShine" },
      { property: "og:description", content: "Your selected printShine product was added to your cart." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartAddedPage,
});

function CartAddedPage() {
  const { lastAdded } = useCart();

  return (
    <section className="flex min-h-screen items-center justify-center bg-background px-4 pb-20 pt-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="mx-auto flex max-w-xl flex-col items-center text-center"
      >
        <motion.div
          initial={{ scale: 0.45, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 190, damping: 14 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl"
        >
          <motion.div
            initial={{ scale: 0, rotate: -35 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.18, type: "spring", stiffness: 240, damping: 15 }}
          >
            <Check className="h-11 w-11" strokeWidth={2.2} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="mt-8 font-display text-4xl font-semibold text-foreground sm:text-5xl">
            Added to cart
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
            {lastAdded
              ? `${lastAdded.name} is ready in your cart. Do you want to order something else?`
              : "Your item is ready in your cart. Do you want to order something else?"}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <AnimatedButton href="/cart" size="lg" variant="primary">
              <ShoppingCart className="h-4 w-4" />
              View Cart
            </AnimatedButton>
            <AnimatedButton href="/work" size="lg" variant="outline">
              Explore More
            </AnimatedButton>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}