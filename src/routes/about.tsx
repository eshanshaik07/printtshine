import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/sections/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — printShine" },
      {
        name: "description",
        content:
          "printShine is a minimalist design studio built on restraint, craft, and clarity. Meet the studio behind the work.",
      },
      { property: "og:title", content: "About — printShine" },
      {
        property: "og:description",
        content:
          "printShine is a minimalist design studio built on restraint, craft, and clarity.",
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
