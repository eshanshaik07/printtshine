import { motion } from "framer-motion";
import giftingAsset from "@/assets/printshine-gifting.webp.asset.json";

const banner = [
  "Office Needs",
  "Customized Corporate Gifts",
  "Web Designing",
];

const columns = [
  {
    title: "What We Create?",
    body: "Smart Identification & Access Accessories: high-durability PVC employee and student badges, personalized lanyards, and visitor passes built to withstand daily wear. Bespoke Corporate Gifts & Swag: custom logo-engraved pens, executive planners, ceramic drinkware, branded apparel, seasonal hampers, and complete onboarding kits. Bulk Apparel & Textile Printing: premium customized polo tees, promotional caps, and staff uniforms featuring sharp, fade-resistant graphics.",
  },
  {
    title: "Why Partner With Us?",
    body: "End-to-End Customization: every product is tailored with your exact logos, color palettes, and messaging. Scalable Production: robust manufacturing capabilities built to fulfil high-volume orders efficiently without compromising accuracy. Nationwide Distribution: seamless logistics providing prompt doorstep dispatch across Hyderabad and to every corner of India. Cost-Effective Excellence: high-grade raw materials paired with cutting-edge production for maximum durability at competitive rates.",
  },
];

export function Capabilities() {
  return (
    <section className="w-full pb-24">
      <div className="w-full bg-foreground py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 text-center font-display text-base font-semibold tracking-tight text-background sm:text-xl lg:px-8">
          {banner.map((item, i) => (
            <span key={item} className="flex items-center gap-4">
              {item}
              {i < banner.length - 1 && (
                <span aria-hidden className="text-background/50">
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:px-8">
        <motion.figure
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          <img
            src={giftingAsset.url}
            alt="printShine branded corporate gifting range: bottle, backpack, notebook, cap, mug, pen and power bank"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.figure>

        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg leading-relaxed text-foreground sm:text-xl"
        >
          Elevate your brand&apos;s physical presence with top-tier merchandise,
          custom accessories, and professional identification products crafted
          right in Hyderabad. printShine delivers end-to-end promotional and
          printing services tailored to the needs of enterprises, educational
          institutions, industrial facilities, and large-scale gatherings.
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl gap-10 px-6 md:grid-cols-2 lg:px-8">
        {columns.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <h2 className="font-display text-xl font-medium tracking-tight text-foreground">
              {col.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {col.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
