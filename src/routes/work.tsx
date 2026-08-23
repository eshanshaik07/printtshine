import { createFileRoute } from "@tanstack/react-router";
import { Work } from "@/sections/work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — Nova Creative" },
      {
        name: "description",
        content:
          "Brand identities, editorial systems, and digital design projects by Nova Creative.",
      },
      { property: "og:title", content: "Selected Work — Nova Creative" },
      {
        property: "og:description",
        content:
          "Brand identities, editorial systems, and digital design projects by Nova Creative.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <div className="pt-24">
      <Work />
    </div>
  );
}
