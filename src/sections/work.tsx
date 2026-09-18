import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ImageOff, X } from "lucide-react";
import { AnimatedButton } from "@/components/animated-button";
import { FadeIn } from "@/components/fade-in";
import brandingIdentity from "@/assets/brandidentity.jpeg";
import giftingCollection from "@/assets/brandmockup.jpeg";
import editorialBook from "@/assets/project-monolith.jpg";
import businessStationery from "@/assets/project-aurelia.jpg";

const corporateFilters = [
  "All",
  "Mugs & Cups",
  "T-Shirts",
  "Caps",
  "Keychains",
  "Photo Frames",
  "Trophies",
  "Tote / Canvas Bags",
  "Pillows / Cushions",
  "Water Bottles",
  "Pens",
  "Clocks",
  "Exclusive Gift Sets",
  "Notepads",
] as const;

const printFilters = [
  "All",
  "Brochures",
  "Coffee Table Books",
  "Personalised Table Books",
  "Leaflets",
  "Product Catalogues",
  "Annual Reports",
  "Bill Books",
  "Visiting Cards",
  "Scribble Pads",
  "Business Cards",
  "Calendars — Wall & Desktop",
  "School Diaries",
  "And More Custom Print Solutions",
] as const;

export type WorkGroup =
  | "Print Solutions"
  | "Social Media Posts"
  | "Front End Web Development"
  | "Corporate Gifting"
  | "Laser Cutting & Engraving";

type PortfolioItem = {
  id: string;
  group: WorkGroup;
  title: string;
  categories: readonly string[];
  image: string;
  alt: string;
};

const portfolio: PortfolioItem[] = [
  {
    id: "corporate-branding-collection",
    group: "Corporate Gifting",
    title: "T-Shirts",
    categories: ["Mugs & Cups", "T-Shirts", "Caps", "Tote / Canvas Bags", "Pens"],
    image: brandingIdentity,
    alt: "PrintShine branded T-shirt, cap, tote bag, mug and pen collection",
  },
  {
    id: "corporate-gift-collection",
    group: "Corporate Gifting",
    title: "Exclusive Gift Sets",
    categories: [
      "Mugs & Cups",
      "Caps",
      "Water Bottles",
      "Pens",
      "Exclusive Gift Sets",
      "Notepads",
    ],
    image: giftingCollection,
    alt: "PrintShine curated corporate gift collection with cap, mug, bottle, pen and notepad",
  },
  {
    id: "editorial-book",
    group: "Print Solutions",
    title: "Coffee Table Books",
    categories: ["Coffee Table Books", "Product Catalogues", "Annual Reports"],
    image: editorialBook,
    alt: "Professionally printed architectural book with editorial spreads",
  },
  {
    id: "business-stationery",
    group: "Print Solutions",
    title: "Business Cards",
    categories: ["Visiting Cards", "Business Cards"],
    image: businessStationery,
    alt: "Premium printed business cards presented with branded packaging",
  },
];

const groups: WorkGroup[] = [
  "Print Solutions",
  "Social Media Posts",
  "Front End Web Development",
  "Corporate Gifting",
  "Laser Cutting & Engraving",
];
const ease = [0.16, 1, 0.3, 1] as const;

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      whileTap={{ scale: 0.97 }}
      className={`max-w-full rounded-full border px-3 py-2 text-center text-xs font-medium leading-snug transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:px-4 ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {children}
    </motion.button>
  );
}

function PortfolioCard({
  item,
  label,
  onOpen,
}: {
  item: PortfolioItem;
  label: string;
  onOpen: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease }}
      aria-label={`Open ${label} image preview`}
      className="group overflow-hidden rounded-2xl bg-background text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-secondary"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.alt}
          width={800}
          height={600}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border p-4 sm:p-6">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-medium leading-snug text-foreground">{label}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.group}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="h-4 w-4 text-foreground" />
        </span>
      </div>
    </motion.button>
  );
}

function ImagePreview({
  item,
  label,
  onClose,
}: {
  item: PortfolioItem;
  label: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const contactHref = `/contact?product=${encodeURIComponent(label)}#contact`;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${label} image preview`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-background/90 p-4 backdrop-blur-sm sm:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <img
          src={item.image}
          alt=""
          className="h-full w-full scale-110 object-cover opacity-25 blur-3xl"
        />
        <div className="absolute inset-0 bg-background/55" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.5, ease }}
        className="relative z-10 my-auto w-full max-w-5xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-md transition-transform hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-4 sm:top-4"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <div className="flex max-h-[62vh] min-h-64 items-center justify-center bg-secondary/50 p-3 sm:p-6">
            <img
              src={item.image}
              alt={item.alt}
              className="max-h-[56vh] w-auto max-w-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-5 border-t border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {item.group}
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium text-foreground sm:text-3xl">
                {label}
              </h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <AnimatedButton href={contactHref} variant="outline">
                Contact us
              </AnimatedButton>
              <AnimatedButton href={contactHref}>Order Now</AnimatedButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Work({
  initialGroup = "Print Solutions",
  initialFilter = "All",
}: {
  initialGroup?: WorkGroup;
  initialFilter?: string;
}) {
  const [group, setGroup] = useState<WorkGroup>(initialGroup);
  const [filter, setFilter] = useState<string>(initialFilter);
  const [selected, setSelected] = useState<{ item: PortfolioItem; label: string } | null>(
    null,
  );

  const filters =
    group === "Corporate Gifting"
      ? corporateFilters
      : group === "Print Solutions"
        ? printFilters
        : (["All"] as const);
  const visibleItems = useMemo(
    () =>
      portfolio.filter(
        (item) => item.group === group && (filter === "All" || item.categories.includes(filter)),
      ),
    [filter, group],
  );

  const selectGroup = (nextGroup: WorkGroup) => {
    setGroup(nextGroup);
    setFilter("All");
  };

  return (
    <section id="portfolio" className="scroll-mt-28 bg-secondary px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn className="scroll-mt-32">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span id="previous-works" className="scroll-mt-32">
              Previous Works
            </span>
          </span>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
            Projects with presence.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Choose a collection and explore our completed work.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10 sm:mt-12">
          <div className="grid w-full grid-cols-2 gap-1 rounded-2xl border border-border bg-background p-1 sm:inline-flex sm:w-auto sm:gap-0">
            {groups.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => selectGroup(item)}
                aria-pressed={group === item}
                className={`relative flex min-h-16 min-w-0 items-center justify-center rounded-xl px-3 py-3 text-center text-xs font-medium leading-snug transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0 sm:flex-none sm:px-5 sm:text-sm ${
                  index === groups.length - 1 ? "col-span-2 sm:col-auto" : ""
                } ${
                  group === item
                    ? "text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {group === item && (
                  <motion.span
                    layoutId="work-group"
                    className="absolute inset-0 rounded-xl bg-foreground"
                    transition={{ duration: 0.4, ease }}
                  />
                )}
                <span className="relative z-10 max-w-full">{item}</span>
              </button>
            ))}
          </div>
        </FadeIn>

        <div
          className="mt-6 flex max-w-full flex-wrap items-center gap-2 sm:mt-8"
          aria-label={`${group} product filters`}
        >
          {filters.map((item) => (
            <FilterButton key={item} active={filter === item} onClick={() => setFilter(item)}>
              {item}
            </FilterButton>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {visibleItems.length > 0 ? (
            <motion.div
              key={`${group}-${filter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 grid min-w-0 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2"
            >
              {visibleItems.map((item) => {
                const label = filter === "All" ? item.title : filter;
                return (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    label={label}
                    onOpen={() => setSelected({ item, label })}
                  />
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key={`${group}-${filter}-empty`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="mt-10 flex min-h-60 w-full flex-col items-center justify-center border border-dashed border-border bg-background px-5 py-10 text-center sm:mt-12 sm:min-h-72 sm:px-6"
            >
              <ImageOff className="h-7 w-7 text-muted-foreground" />
              <h3 className="mt-5 font-display text-xl font-medium text-foreground">{filter}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Portfolio images for this category will appear here as completed work is added.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selected && (
          <ImagePreview
            item={selected.item}
            label={selected.label}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}