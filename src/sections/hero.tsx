import { motion } from "framer-motion";
import { RotatingLabel } from "@/components/rotating-label";
import { AnimatedButton } from "@/components/animated-button";
import { FloatingElement } from "@/components/floating-element";
import { HeroCarousel, type Slide } from "@/components/hero-carousel";
import heroImage from "@/assets/nova-hero.jpg";
import heroImage2 from "@/assets/nova-hero-2.jpg";
import heroImage3 from "@/assets/nova-hero-3.jpg";
import heroImage4 from "@/assets/nova-hero-4.jpg";
import heroImage5 from "@/assets/nova-hero-5.jpg";

const slides: Slide[] = [
  {
    src: heroImage,
    alt: "Abstract minimalist composition with warm paper texture and ink shapes",
    caption: "Est. 2023",
  },
  {
    src: heroImage2,
    alt: "Bold black ink circle and terracotta dot on warm paper",
    caption: "Brand identity",
  },
  {
    src: heroImage3,
    alt: "Flat lay of branding print samples and business cards in neutral tones",
    caption: "Print & collateral",
  },
  {
    src: heroImage4,
    alt: "Layered typographic posters in cream and black",
    caption: "Editorial systems",
  },
  {
    src: heroImage5,
    alt: "Sculptural plaster forms casting long shadows on a sand backdrop",
    caption: "Art direction",
  },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 lg:px-8">
      {/* Decorative floating shapes */}
      <FloatingElement
        className="absolute left-[10%] top-[20%] hidden h-24 w-24 rounded-full border border-foreground/20 dark:border-foreground/30 lg:block"
        duration={6}
        distance={20}
      />
      <FloatingElement
        className="absolute bottom-[25%] right-[8%] hidden h-16 w-16 rounded-full bg-foreground/[0.08] dark:bg-foreground/[0.15] lg:block"
        duration={5}
        distance={16}
        delay={0.5}
      />
      <FloatingElement
        className="absolute right-[25%] top-[15%] hidden h-3 w-3 rounded-full bg-foreground/25 dark:bg-foreground/45 lg:block"
        duration={4}
        distance={10}
        delay={1}
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex w-fit origin-center items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground"
            whileHover={{ scale: 1.05, rotate: 360 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-foreground"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <RotatingLabel />
          </motion.span>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              Design that
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-muted-foreground sm:text-6xl lg:text-7xl"
            >
              breathes.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            printShine crafts minimalist brands, identities, and digital
            experiences for founders who value clarity over noise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <AnimatedButton href="/contact" size="lg" variant="primary">
              Start a project
            </AnimatedButton>
            <AnimatedButton href="/work" size="lg" variant="outline">
              View work
            </AnimatedButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <HeroCarousel slides={slides} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-6 rounded-full border-2 border-border p-1"
        >
          <motion.div
            className="h-2 w-full rounded-full bg-foreground"
            animate={{ y: [0, 12, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
