import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { LogoIcon } from "@nhgp/assets";

const services = [
  { label: "Real Estate", href: "/services/real-estate" },
  { label: "LPO Financing", href: "/services/lpo-financing" },
  { label: "Investment Financing", href: "/services/investment-financing" },
  { label: "Investment Consultancy", href: "/services/investment-consultancy" },
];

const properties = [
  { label: "All Properties", href: "/properties" },
  { label: "Residential", href: "/properties?type=RESIDENTIAL" },
  { label: "Commercial", href: "/properties?type=COMMERCIAL" },
  { label: "Land", href: "/properties?category=LAND" },
  { label: "Our Estates", href: "/estates" },
];

const company = [
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <LogoIcon width={36} height={36} className="shrink-0" />
              <div>
                <p
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ndukego Homes
                </p>
                <p className="text-[9px] text-white/30 leading-tight">
                  Powered By: Ndukego Investments &amp; Properties Ltd
                </p>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Connecting you to trusted, verified real estate and financial
              opportunities across Nigeria — with transparency at every step.
            </p>
            <div className="space-y-2.5 text-sm">
              <a
                href="tel:+2348036096700"
                className="flex items-center gap-2.5 text-white/40 hover:text-white/80 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#C1121F]" />
                +234 803 609 6700
              </a>
              <a
                href="tel:+2347052955555"
                className="flex items-center gap-2.5 text-white/40 hover:text-white/80 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#C1121F]" />
                +234 705 295 5555
              </a>
              <a
                href="mailto:ndukegohomes@gmail.com"
                className="flex items-center gap-2.5 text-white/40 hover:text-white/80 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-[#C1121F]" />
                ndukegohomes@gmail.com
              </a>
              <span className="flex items-center gap-2.5 text-white/40">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C1121F]" />
                Nigeria
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/25">
              Services
            </h3>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/25">
              Properties
            </h3>
            <ul className="space-y-2.5">
              {properties.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/25">
              Company
            </h3>
            <ul className="space-y-2.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-sm text-white/40 hover:text-white/80 transition-colors"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p>
            © {new Date().getFullYear()} Ndukego Investments &amp; Properties Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white/50 transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white/50 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
