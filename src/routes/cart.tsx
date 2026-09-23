import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { AnimatedButton } from "@/components/animated-button";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart-provider";

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
  const { items, updateQuantity, removeItem } = useCart();
  const grandTotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const orderDescription = `Hi printShine, we want to order ${items
    .map(
      (item) =>
        `an item ${item.name} of quantity ${item.quantity} of cost ₹${(
          item.unitPrice * item.quantity
        ).toLocaleString("en-IN")}`,
    )
    .join(", ")}.`;

  if (items.length > 0) {
    return (
      <section className="min-h-[78vh] px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold uppercase text-muted-foreground">Your cart</p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-foreground sm:text-5xl">
              Ready to order
            </h1>
          </motion.div>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {items.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                className="grid gap-5 py-6 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-[4/3] w-full rounded-md object-cover sm:w-36"
                />
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-medium text-foreground">{item.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ₹{item.unitPrice.toLocaleString("en-IN")} per item
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Trash2 className="h-4 w-4" />
                    Discard
                  </button>
                </div>
                <div className="flex items-end justify-between gap-5 sm:flex-col sm:items-end">
                  <div className="flex h-11 items-stretch overflow-hidden rounded-md border border-border bg-background">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease ${item.name} quantity`}
                      className="h-full w-11 rounded-none border-r border-border shadow-none"
                    >
                      <Minus />
                    </Button>
                    <input
                      type="number"
                      min="1"
                      inputMode="numeric"
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, Number.parseInt(event.target.value, 10))}
                      aria-label={`${item.name} quantity`}
                      className="w-14 bg-transparent px-1 text-center text-sm font-medium text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.name} quantity`}
                      className="h-full w-11 rounded-none border-l border-border shadow-none"
                    >
                      <Plus />
                    </Button>
                  </div>
                  <strong className="font-display text-xl font-semibold text-foreground">
                    ₹{(item.unitPrice * item.quantity).toLocaleString("en-IN")}
                  </strong>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-stretch justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm text-muted-foreground">Order total</span>
              <p className="mt-1 font-display text-3xl font-semibold text-foreground">
                ₹{grandTotal.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <AnimatedButton href="/work" size="lg" variant="outline">
                Explore More
              </AnimatedButton>
              <AnimatedButton
                href={`/contact?product=${encodeURIComponent(orderDescription)}#contact-us`}
                size="lg"
                variant="primary"
              >
                Order
                <ArrowRight className="h-4 w-4" />
              </AnimatedButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

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