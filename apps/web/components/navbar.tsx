"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, User, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@nhgp/assets";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Real Estate", href: "/services/real-estate" },
      { label: "LPO Financing", href: "/services/lpo-financing" },
      { label: "Investment Financing", href: "/services/investment-financing" },
      { label: "Investment Consultancy", href: "/services/investment-consultancy" },
    ],
  },
  { label: "Properties", href: "/properties" },
  { label: "Projects", href: "/projects" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <LogoIcon width={32} height={32} className="shrink-0" />
            <div className="hidden sm:block">
              <p
                className="text-sm font-semibold leading-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Ndukego Homes
              </p>
              <p className="text-[9px] text-white/40 leading-tight">
                Powered By: Ndukego Investments &amp; Properties Ltd
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                      pathname.startsWith(link.href)
                        ? "text-white"
                        : "text-white/60 hover:text-white",
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", servicesOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-xl overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                    isActive(link.href)
                      ? "text-white"
                      : "text-white/60 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:+2348036096700"
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors duration-150"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden xl:block">+234 803 609 6700</span>
            </a>
            <ThemeToggle />
            <Link
              href="/account"
              className="flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:border-white/40 transition-all duration-150"
            >
              <User className="h-3.5 w-3.5" />
              Account
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-[#C1121F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors duration-150"
            >
              Book Consultation
            </Link>
          </div>

          {/* Mobile: theme + menu */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="rounded-md p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-white/10 backdrop-blur-xl bg-black/80"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 space-y-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.href}>
                    <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/30">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="block pl-6 pr-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "text-white bg-white/8"
                        : "text-white/60 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <div className="pt-2 space-y-2 border-t border-white/10 mt-2">
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-medium text-white/80"
                >
                  <User className="h-4 w-4" />
                  My Account
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg bg-[#C1121F] px-3 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
