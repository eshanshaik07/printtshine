import { motion } from "framer-motion";
import { FadeIn } from "@/components/fade-in";
import { Gift, Printer, PenTool, Share2, Code } from "lucide-react";

const services = [
  {
    icon: Gift,
    title: "Corporate Gifting",
    description:
      "Curated branded merchandise and premium gift sets that leave a lasting impression.",
  },
  {
    icon: Printer,
    title: "Print Solutions",
    description:
      "High-quality business cards, brochures, packaging, and marketing collateral.",
  },
  {
    icon: PenTool,
    title: "Laser Cutting & Engraving",
    description:
      "Precise custom cuts and engravings on acrylic, wood, metal, and more.",
  },
  {
    icon: Share2,
    title: "Social Media Posts",
    description:
      "Engaging graphics and content kits tailored for your brand's online presence.",
  },
  {
    icon: Code,
    title: "Front End Website Developer",
    description:
      "Clean, responsive websites and UI systems built for modern user experiences.",
  },
];

export function Services() {
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

        <div className="mt-20 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group h-full cursor-default bg-background p-8 transition-colors duration-500 hover:bg-secondary"
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
                <motion.div
                  className="mt-6 h-px w-0 bg-foreground/20 transition-all duration-500 group-hover:w-full"
                />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
