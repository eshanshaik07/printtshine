import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/sections/contact";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    product: typeof search["product"] === "string" ? search["product"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact — printShine" },
      {
        name: "description",
        content:
          "Start a project with printShine. Tell us about your brand and we'll reply within two working days.",
      },
      { property: "og:title", content: "Contact — printShine" },
      {
        property: "og:description",
        content:
          "Start a project with printShine. Tell us about your brand and we'll reply within two working days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
  return (
    <div className="pt-24">
      <Contact initialMessage={search.product} />
    </div>
  );
}
