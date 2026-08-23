import { motion } from "framer-motion";
import { FadeIn } from "@/components/fade-in";
import { CountUp } from "@/components/count-up";

const stats = [
  { value: 8, suffix: "+", label: "Years of craft" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 40, suffix: "+", label: "Brand identities" },
];

export function About() {
  return (
    <section id="about" className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              About printShine
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
              Less noise.
              <br />
              More meaning.
            </h2>
          </FadeIn>

          <div className="lg:col-span-7">
            <FadeIn delay={0.1}>
              <p className="text-xl leading-relaxed text-foreground lg:text-2xl">
                We believe the best design disappears. It doesn't shout — it
                guides, reassures, and leaves a lasting impression. printShine
                partners with ambitious teams to build visual systems that feel
                inevitable.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-2xl leading-relaxed text-muted-foreground">
                Our process is collaborative and calm. We start with listening,
                move through exploration, and finish with precision. Every choice
                — type, color, spacing, motion — is made to serve the idea.
              </p>
            </FadeIn>

            <div className="mt-16 grid gap-8 border-t border-border pt-12 sm:grid-cols-3">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.3 + i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center sm:text-left"
                  >
                    <span className="font-display text-4xl font-medium text-foreground">
                      <CountUp end={stat.value} suffix={stat.suffix} duration={2} />
                    </span>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
