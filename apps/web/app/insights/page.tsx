import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { InsightsContent } from "./insights-content";

export const metadata: Metadata = {
  title: "Insights",
  description: "Property market analysis, investment guides, and real estate news from Ndukego Investment & Properties Ltd.",
};

export default function InsightsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-16 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#A0111C] mb-4">Insights</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-2xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Market intelligence. Investment clarity.
            </h1>
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              Analysis, guides, and practical advice from the Ndukego team — helping
              you navigate Nigerian real estate and investment with confidence.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Category filters + articles (client component) */}
      <InsightsContent />

      {/* Newsletter CTA */}
      <section className="relative py-16 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Stay informed. Stay ahead.
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Get our latest market insights and investment guides delivered to your inbox.
            </p>
            <Link
              href={`/contact?message=${encodeURIComponent("Hi, I'd like to subscribe to receive your latest market insights and investment guides.")}`}
              className="inline-flex items-center gap-2 rounded bg-[#A0111C] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#B41523] transition-colors shadow-sm shadow-[#A0111C]/15"
            >
              Subscribe via Contact <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
