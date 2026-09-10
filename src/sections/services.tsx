import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeIn } from "@/components/fade-in";
import { Gift, Printer, PenTool, Share2, Code, ArrowLeft } from "lucide-react";

const services = [
  {
    id: "corporate-gifting",
    icon: Gift,
    title: "Corporate Gifting",
    description:
      "Curated branded merchandise and premium gift sets that leave a lasting impression.",
    detail:
      "We source, brand and pack gift sets that feel considered rather than generic — from onboarding kits for new hires to festive hampers for clients.",
    points: [
      "Custom gift boxes and hampers",
      "Branded apparel, drinkware and desk goods",
      "Bulk orders with consistent finishing",
      "Packaging, inserts and personalised notes",
    ],
  },
  {
    id: "print-solutions",
    icon: Printer,
    title: "Print Solutions",
    description:
      "High-quality business cards, brochures, packaging, and marketing collateral.",
    detail:
      "Offset and digital printing with careful colour control, plus finishes that make a simple piece of paper feel expensive.",
    points: [
      "Business cards, letterheads and stationery",
      "Brochures, catalogues and flyers",
      "Product labels, stickers and packaging",
      "Foiling, spot UV, emboss and matte finishes",
    ],
  },
  {
    id: "laser-cutting-engraving",
    icon: PenTool,
    title: "Laser Cutting & Engraving",
    description:
      "Precise custom cuts and engravings on acrylic, wood, metal, and more.",
    detail:
      "Sharp, repeatable cuts and permanent engraving for signage, awards, and one-off pieces where detail matters.",
    points: [
      "Acrylic, MDF, wood, leather and metal",
      "Signage, name boards and standees",
      "Trophies, awards and keepsakes",
      "Prototype and small-batch production",
    ],
  },
  {
    id: "social-media-posts",
    icon: Share2,
    title: "Social Media Posts",
    description:
      "Engaging graphics and content kits tailored for your brand's online presence.",
    detail:
      "Monthly design kits built around one visual system, so every post looks like it belongs to the same brand.",
    points: [
      "Post, story and reel cover templates",
      "Festival and campaign creatives",
      "Consistent typography and colour system",
      "Ready-to-publish export packs",
    ],
  },
  {
    id: "front-end-website-development",
    icon: Code,
    title: "Front End Website Developer",
    description:
      "Clean, responsive websites and UI systems built for modern user experiences.",
    detail:
      "Fast, responsive front ends built with modern tooling — designed to look right on every screen and easy to extend later.",
    points: [
      "Landing pages and portfolio sites",
      "Responsive layouts and motion detail",
      "Reusable UI components",
      "Performance and basic SEO setup",
    ],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Services() {
  const [active, setActive] = useState<string | null>(null);
  const activeService = services.find((s) => s.title === active) ?? null;

  return (
    <section id="services" className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <FadeIn>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Services
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Thoughtful design
              <br />
              for every touchpoint.
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} className="flex items-end">
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              From first impression to final pixel, we shape cohesive visual
              systems that feel inevitable.
            </p>
          </FadeIn>
        </div>

        <div className="mt-20">
          <AnimatePresence mode="wait" initial={false}>
            {activeService ? (
              <motion.div
                key="detail"
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease }}
                className="overflow-hidden border border-border bg-secondary/40"
              >
                <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
                  <div>
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                      Back
                    </button>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12, duration: 0.5, ease }}
                    >
                      <activeService.icon className="mt-10 h-9 w-9 text-foreground" />
                      <h3 className="mt-6 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                        {activeService.title}
                      </h3>
                      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
                        {activeService.detail}
                      </p>
                    </motion.div>
                  </div>

                  <ul className="flex flex-col justify-center gap-px bg-border">
                    {activeService.points.map((point, i) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.18 + i * 0.08,
                          duration: 0.5,
                          ease,
                        }}
                        className="bg-background px-6 py-5 text-sm leading-relaxed text-foreground"
                      >
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease }}
                className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5"
              >
                {services.map((service, i) => (
                  <FadeIn key={service.title} delay={i * 0.1}>
                    <motion.button
                      id={service.id}
                      type="button"
                      onClick={() => setActive(service.title)}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4, ease }}
                      className="group h-full w-full scroll-mt-32 cursor-pointer bg-background p-8 text-left transition-colors duration-500 hover:bg-secondary"
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <service.icon className="h-7 w-7 text-foreground transition-colors duration-500" />
                      </motion.div>
                      <h3 className="mt-8 font-display text-xl font-medium text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                      <span className="mt-6 block h-px w-0 bg-foreground/20 transition-all duration-500 group-hover:w-full" />
                    </motion.button>
                  </FadeIn>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
