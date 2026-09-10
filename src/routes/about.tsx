import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/sections/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — printShine" },
      {
        name: "description",
        content:
          "Meet printShine, where ideas become memorable brands, products, print, and digital experiences.",
      },
      { property: "og:title", content: "About — printShine" },
      {
        property: "og:description",
        content:
          "Meet printShine, where ideas become memorable brands, products, print, and digital experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-24">
      <About />
    </div>
  );
}
