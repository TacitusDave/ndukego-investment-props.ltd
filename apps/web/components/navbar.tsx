"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, CalendarCheck, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LogoIcon } from "@nhgp/assets";

const NAV_LINKS = [
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const close = () => setMenuOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ── Bar ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-xl bg-white/90 border-b border-black/6 shadow-sm shadow-black/4"
            : "bg-white/0 border-b border-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between relative">

            {/* LEFT — icon CTAs */}
            <div className="flex items-center gap-0.5 z-10">
              <Link
                href="/account"
                title="My Account"
                className="flex items-center justify-center h-9 w-9 rounded-xl text-gray-400 hover:text-[#A0111C] hover:bg-[#A0111C]/8 transition-all duration-200"
              >
                <User className="h-[17px] w-[17px]" />
              </Link>
              <Link
                href="/contact"
                title="Book Consultation"
                className="flex items-center justify-center h-9 w-9 rounded-xl text-gray-400 hover:text-[#A0111C] hover:bg-[#A0111C]/8 transition-all duration-200"
              >
                <CalendarCheck className="h-[17px] w-[17px]" />
              </Link>
            </div>

            {/* CENTRE — brand */}
            <Link
              href="/"
              onClick={close}
              className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group shrink-0"
            >
              <LogoIcon width={28} height={28} />
              <span
                className="text-[11px] font-bold text-gray-900 leading-tight hidden sm:block whitespace-nowrap tracking-widest uppercase"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Ndukego Investment &amp; Properties Ltd
              </span>
            </Link>

            {/* RIGHT — hamburger */}
            <div className="z-10">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="flex items-center justify-center h-9 w-9 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? "x" : "menu"}
                    initial={{ rotate: menuOpen ? -90 : 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: menuOpen ? 90 : -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Full-width dropdown panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Transparent click-outside layer (covers page below the dropdown) */}
            <div
              key="backdrop"
              className="fixed inset-0 z-40"
              style={{ top: "4rem" }}
              onClick={close}
            />

            {/* Panel — edge to edge, no rounded corners, slides in from top */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-16 left-0 right-0 z-50 bg-white/97 backdrop-blur-2xl border-b border-gray-100 shadow-xl shadow-black/6"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">

                {/* Vertical nav list */}
                <nav className="divide-y divide-gray-100">
                  {NAV_LINKS.map((link, i) =>
                    link.children ? (
                      /* Services — always shows sub-items */
                      <div key={link.href}>
                        <div className="flex items-center gap-4 py-4">
                          <span className="text-[11px] tabular-nums text-gray-300 w-5 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="text-lg font-semibold text-gray-800"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {link.label}
                          </span>
                        </div>
                        <div className="pl-9 pb-3 space-y-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={close}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150",
                                isActive(child.href)
                                  ? "text-[#A0111C] bg-[#A0111C]/6 font-semibold"
                                  : "text-gray-500 hover:text-[#A0111C] hover:bg-[#A0111C]/5",
                              )}
                            >
                              <span className="h-1 w-1 rounded-full bg-[#A0111C]/40 shrink-0" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Regular link */
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={close}
                        className={cn(
                          "flex items-center gap-4 py-4 group transition-colors duration-150",
                          isActive(link.href) ? "text-[#A0111C]" : "text-gray-800 hover:text-[#A0111C]",
                        )}
                      >
                        <span className="text-[11px] tabular-nums text-gray-300 w-5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-lg font-semibold"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {link.label}
                        </span>
                        <ArrowRight className="ml-auto h-4 w-4 text-gray-200 group-hover:text-[#A0111C] group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    )
                  )}
                </nav>

                {/* CTA row */}
                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/properties"
                    onClick={close}
                    className="flex-1 flex items-center justify-center gap-2 rounded border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
                  >
                    Browse Properties
                  </Link>
                  <Link
                    href="/contact"
                    onClick={close}
                    className="flex-1 flex items-center justify-center gap-2 rounded bg-[#A0111C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B41523] transition-colors"
                  >
                    Book Consultation
                  </Link>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
