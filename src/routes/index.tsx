import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/sections/hero";
import { Capabilities } from "@/sections/capabilities";
import { Contact } from "@/sections/contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "printShine — Ideas Made. Brands Elevated." },
      {
        name: "description",
        content:
          "PrintShine transforms ideas into memorable brands, products, print, and digital experiences.",
      },
      { property: "og:title", content: "printShine — Ideas Made. Brands Elevated." },
      {
        property: "og:description",
        content:
          "PrintShine transforms ideas into memorable brands, products, print, and digital experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Capabilities />
      <Contact />
    </>
  );
}
