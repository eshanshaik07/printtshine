import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/sections/hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "printShine — Graphic Design Studio" },
      {
        name: "description",
        content:
          "printShine is a minimalist graphic design studio crafting brands, identities, and digital experiences with intention.",
      },
      { property: "og:title", content: "printShine — Graphic Design Studio" },
      {
        property: "og:description",
        content:
          "printShine is a minimalist graphic design studio crafting brands, identities, and digital experiences with intention.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Hero />;
}
