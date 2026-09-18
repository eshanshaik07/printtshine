import { createFileRoute } from "@tanstack/react-router";
import { Work, type WorkGroup } from "@/sections/work";

const workGroups: WorkGroup[] = [
  "Print Solutions",
  "Social Media Posts",
  "Front End Web Development",
  "Corporate Gifting",
  "Laser Cutting & Engraving",
];

export const Route = createFileRoute("/work")({
  validateSearch: (search: Record<string, unknown>) => ({
    group:
      typeof search["group"] === "string" &&
      workGroups.includes(search["group"] as WorkGroup)
        ? (search["group"] as WorkGroup)
        : undefined,
    product: typeof search["product"] === "string" ? search["product"] : undefined,
  }),
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
  const search = Route.useSearch();

  return (
    <div className="pt-24">
      <Work
        initialGroup={search.group ?? "Print Solutions"}
        initialFilter={search.product ?? "All"}
      />
    </div>
  );
}
