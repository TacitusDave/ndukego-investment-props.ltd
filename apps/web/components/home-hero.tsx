"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export function HomeHero({ totalProperties }: { totalProperties: number }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/properties?search=${encodeURIComponent(query.trim())}`);
    else router.push("/properties");
  }

  return (
    <section className="-mt-16 relative min-h-screen flex items-center overflow-hidden bg-[#050505]">
      {/* Background gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(193,18,31,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(193,18,31,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        <div className="max-w-4xl">

          {/* Eyebrow badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60 mb-8 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#C1121F] animate-pulse" />
            Nigeria&apos;s Premier Property &amp; Investment Group
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Build Wealth.<br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #C1121F 0%, #FF4D5A 60%, #C1121F 100%)",
              }}
            >
              Own Property.
            </span>
            <br />
            <span className="text-white">Grow Capital.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-lg sm:text-xl text-white/45 max-w-2xl leading-relaxed mb-10"
          >
            Ndukego Investments &amp; Properties Ltd delivers verified real estate,
            LPO financing, investment capital, and expert consultancy — all under one roof.
          </motion.p>

          {/* Search bar */}
          <motion.form
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            onSubmit={handleSearch}
            className="flex gap-2 max-w-xl mb-6"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search by location, title, or type…"
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/8 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:ring-1 focus:ring-[#C1121F]/50 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-[#C1121F] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors shrink-0"
            >
              Search
            </button>
          </motion.form>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <Link
              href="/properties"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/8 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/12 hover:border-white/30 transition-all backdrop-blur-sm"
            >
              Browse Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded-xl bg-[#C1121F] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>

        {/* Bottom stat strip */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="absolute bottom-12 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 max-w-7xl"
        >
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/8">
            {[
              { value: totalProperties > 0 ? `${totalProperties}+` : "50+", label: "Verified Listings" },
              { value: "10+", label: "Years in Nigeria" },
              { value: "₦500M+", label: "Properties Transacted" },
              { value: "4", label: "Service Lines" },
            ].map((stat) => (
              <div key={stat.label} className="space-y-0.5">
                <p className="text-2xl font-bold text-white tabular-nums">{stat.value}</p>
                <p className="text-xs text-white/35 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
