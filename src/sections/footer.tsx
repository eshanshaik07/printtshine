import { ArrowUpRight, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

const companyLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about", hash: "about" },
] as const;

const serviceLinks = [
  { label: "Corporate Gifting", hash: "corporate-gifting" },
  { label: "Print Solutions", hash: "print-solutions" },
  { label: "Laser Cutting & Engraving", hash: "laser-cutting-engraving" },
  { label: "Social Media Posts", hash: "social-media-posts" },
  { label: "Front-End Website Development", hash: "front-end-website-development" },
] as const;

const workLinks = [
  { label: "Previous Works", hash: "previous-works" },
  { label: "Portfolio", hash: "portfolio" },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/hello.printshine",
    icon: Instagram,
  },
  { label: "Facebook", icon: Facebook },
  { label: "LinkedIn", icon: Linkedin },
  {
    label: "WhatsApp",
    href: "https://wa.me/919291261143",
    icon: MessageCircle,
  },
] as const;

const footerLinkClass =
  "group inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background px-6 py-16 transition-colors duration-500 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_0.8fr_1fr] lg:gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            to="/"
            className="font-display text-2xl font-semibold text-foreground"
          >
            printShine
          </Link>
          <p className="mt-5 font-display text-base font-medium text-foreground">
            Ideas Made. Brands Elevated.
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            PrintShine transforms ideas into memorable brands, products, print,
            and digital experiences.
          </p>

          <div className="mt-7 flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return social.href ? (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-foreground/40 hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ) : (
                <span
                  key={social.label}
                  aria-label={`${social.label} link unavailable`}
                  title={`${social.label} profile coming soon`}
                  className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-border text-muted-foreground/40"
                >
                  <Icon className="h-4 w-4" />
                </span>
              );
            })}
          </div>
        </div>

        <FooterColumn title="Our Company">
          {companyLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={"hash" in item ? item.hash : undefined}
              className={footerLinkClass}
            >
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Services">
          {serviceLinks.map((item) => (
            <Link key={item.label} to="/services" hash={item.hash} className={footerLinkClass}>
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Works">
          {workLinks.map((item) => (
            <Link key={item.label} to="/work" hash={item.hash} className={footerLinkClass}>
              {item.label}
            </Link>
          ))}
        </FooterColumn>

        <FooterColumn title="Get In Touch">
          <p className="max-w-[15rem] text-sm leading-relaxed text-muted-foreground">
            Let&apos;s create something amazing together.
          </p>
          <Link to="/contact" hash="contact-us" className={`${footerLinkClass} text-foreground`}>
            Contact Us
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link to="/contact" hash="help-center" className={footerLinkClass}>
            Help Center
          </Link>
        </FooterColumn>
      </div>

      <div className="mx-auto mt-14 max-w-7xl border-t border-border pt-7">
        <p className="text-xs text-muted-foreground">
          © {year} printShine. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-semibold text-foreground">{title}</h2>
      <div className="mt-5 flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}
