import { useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { motion } from "framer-motion";
import { ArrowUpRight, RotateCcw } from "lucide-react";
import projectAurelia from "@/assets/project-aurelia.jpg";
import projectMonolith from "@/assets/project-monolith.jpg";
import projectFerme from "@/assets/project-ferme.jpg";
import projectLumen from "@/assets/project-lumen.jpg";

const projects = [
  {
    client: "Aurelia Skincare",
    category: "Brand Identity",
    year: "2025",
    image: projectAurelia,
    alt: "Aurelia Skincare brand identity mockup with packaging and business cards",
    summary:
      "A full identity rebuild for a botanical skincare line — wordmark, packaging system, and a tactile paper palette that carries across every touchpoint.",
    deliverables: ["Logo & wordmark", "Packaging system", "Brand guidelines"],
    result: "+38% shelf recall in retail testing",
  },
  {
    client: "Monolith Architecture",
    category: "Editorial Design",
    year: "2024",
    image: projectMonolith,
    alt: "Monolith Architecture editorial spread with floor plans and typography",
    summary:
      "A 180-page monograph pairing raw structural photography with a strict grid, letting the buildings speak without decoration.",
    deliverables: ["Art direction", "180-page monograph", "Print production"],
    result: "Shortlisted, D&AD Book Design",
  },
  {
    client: "Fermé Coffee",
    category: "Packaging",
    year: "2024",
    image: projectFerme,
    alt: "Fermé Coffee packaging mockup with kraft bags and cups",
    summary:
      "Kraft-first packaging for a small-batch roaster, using a single-ink system that scales across twelve rotating origins.",
    deliverables: ["Packaging design", "Label system", "In-store collateral"],
    result: "12 SKUs shipped in 6 weeks",
  },
  {
    client: "Lumen Journal",
    category: "Digital Design",
    year: "2023",
    image: projectLumen,
    alt: "Lumen Journal digital editorial website on a laptop screen",
    summary:
      "A reading-first digital journal with a typographic scale tuned for long-form essays and a distraction-free article view.",
    deliverables: ["Design system", "Web UI", "Prototype & handoff"],
    result: "2.4× average time on page",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="[perspective:1600px]">
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${project.client} — click to ${flipped ? "hide" : "show"} project details`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped((f) => !f);
          }
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[26rem] w-full cursor-pointer rounded-2xl outline-none [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-secondary sm:h-[30rem]"
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-background [backface-visibility:hidden]">
          <div className="w-full flex-1 overflow-hidden">
            <img
              src={project.image}
              alt={project.alt}
              width={800}
              height={600}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
            />
          </div>
          <div className="flex items-center justify-between border-t border-border p-6">
            <div>
              <h3 className="font-display text-lg font-medium text-foreground">
                {project.client}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary">
              <ArrowUpRight className="h-4 w-4 text-foreground" />
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-background p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {project.category}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{project.year}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-foreground">
              {project.client}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.deliverables.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-end justify-between gap-4 border-t border-border pt-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Result</p>
              <p className="mt-1 font-display text-base text-foreground">{project.result}</p>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary">
              <RotateCcw className="h-4 w-4 text-foreground" />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Work() {
  return (
    <section id="portfolio" className="scroll-mt-28 bg-secondary px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="scroll-mt-32" >
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span id="previous-works" className="scroll-mt-32">Previous Works</span>
          </span>
          <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Projects with presence.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Click any card to flip it and read the details.
          </p>
        </FadeIn>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <FadeIn key={project.client} delay={i * 0.1}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
