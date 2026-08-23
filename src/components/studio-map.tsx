import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Layers, Maximize2, MapPin } from "lucide-react";

interface StudioMapProps {
  address: string;
  label: string;
}

export function StudioMap({ address, label }: StudioMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [satellite, setSatellite] = useState(false);
  const active = address;
  const [showCard, setShowCard] = useState(true);

  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(active)}&z=15&t=${
    satellite ? "k" : "m"
  }&output=embed`;

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active)}`;

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5"
      >
        <iframe
          key={embedSrc}
          title={`Map showing ${active}`}
          src={embedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />

        {/* Top-right controls */}
        <div className="pointer-events-none absolute right-3 top-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle full screen map"
            className="pointer-events-auto rounded-lg border border-black/10 bg-white/95 p-2 text-neutral-800 shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setSatellite((s) => !s)}
            aria-pressed={satellite}
            className="pointer-events-auto flex items-center gap-2 rounded-lg border border-black/10 bg-white/95 px-3 py-2 text-xs font-medium text-neutral-800 shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            <Layers className="h-3.5 w-3.5" />
            {satellite ? "Map View" : "Satellite View"}
          </button>
        </div>

        {/* Interactive pin */}
        <button
          type="button"
          onClick={() => setShowCard((v) => !v)}
          aria-label="Show location details"
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full"
        >
          <motion.span
            className="block"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="h-9 w-9 fill-red-500 text-white drop-shadow-lg" />
          </motion.span>
        </button>

        {/* Info overlay */}
        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-3 left-3 z-10 max-w-[16rem] rounded-xl border border-black/10 bg-white/95 p-4 text-neutral-900 shadow-lg backdrop-blur"
            >
              <p className="text-[0.65rem] uppercase tracking-widest text-neutral-500">
                Studio location
              </p>
              <p className="mt-1 text-sm font-medium leading-snug">{label}</p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-700"
              >
                Click to Explore
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Search bar */}
      <form onSubmit={onSearch} className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search locations..."
          aria-label="Search locations"
          className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 py-3 pl-11 pr-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none transition-all duration-300 focus:border-primary-foreground/60 focus:bg-primary-foreground/10"
        />
      </form>
    </div>
  );
}
