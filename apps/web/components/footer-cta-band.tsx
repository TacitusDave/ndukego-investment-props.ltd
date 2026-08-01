"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function FooterCtaBand() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <div className="relative overflow-hidden bg-[#C1121F]">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3
            className="text-2xl sm:text-3xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to build your wealth?
          </h3>
          <p className="text-white/60 mt-1 text-sm">
            One consultation could change your financial future.
          </p>
        </div>
        <Link
          href={`/contact?message=${encodeURIComponent("Hi, I'd like to book a free consultation with your team.")}`}
          className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-bold text-[#C1121F] hover:bg-gray-50 transition-colors shadow-lg shadow-black/10"
        >
          Book Free Consultation <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
