import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const offerings = [
  { label: "Office Needs", to: "/services" },
  { label: "Customized Corporate Gifts", to: "/services" },
  { label: "Web Designing", to: "/services" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-center">
        <div>
          <a
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-foreground"
          >
            printShine
          </a>
          <p className="mt-2 text-sm text-muted-foreground">
            Minimalist graphic design studio.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          {offerings.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              {item.label}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-border pt-8">
        <p className="text-xs text-muted-foreground">
          © {year} printShine. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
