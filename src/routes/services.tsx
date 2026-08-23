import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/sections/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — printShine" },
      {
        name: "description",
        content:
          "Brand identity, print and editorial, illustration, and digital design services from printShine.",
      },
      { property: "og:title", content: "Services — printShine" },
      {
        property: "og:description",
        content:
          "Brand identity, print and editorial, illustration, and digital design services from printShine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="pt-24">
      <Services />
    </div>
  );
}
