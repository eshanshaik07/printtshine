import { createFileRoute } from "@tanstack/react-router";
import { Work } from "@/sections/work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Selected Work — printShine" },
      {
        name: "description",
        content:
          "Brand identities, editorial systems, and digital design projects by printShine.",
      },
      { property: "og:title", content: "Selected Work — printShine" },
      {
        property: "og:description",
        content:
          "Brand identities, editorial systems, and digital design projects by printShine.",
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
