import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Home, Building, MapPin, Layers } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Real Estate",
  description: "Verified residential, commercial, and land listings across Nigeria. Every property is title-checked and inspection-cleared by Ndukego Investments & Properties Ltd.",
};

const OFFERINGS = [
  {
    icon: Home,
    title: "Residential Properties",
    desc: "Homes, apartments, duplexes, bungalows, and luxury residences — for buyers and renters across Nigeria's key markets.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Building,
    title: "Commercial Properties",
    desc: "Office spaces, shops, warehouses, and mixed-use developments — strategically located for maximum business exposure.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: MapPin,
    title: "Land Acquisition",
    desc: "Serviced plots, agricultural land, and prime parcels with verified titles and clear ownership history.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Layers,
    title: "Estate Development",
    desc: "Planned estates with blocks, phases, and shared infrastructure — ideal for investors seeking long-term capital growth.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const PROCESS = [
  { step: "01", title: "Browse & Inquire", desc: "Search our verified listings by location, type, or budget. Submit an inquiry directly from any property page." },
  { step: "02", title: "Inspection", desc: "Our in-house team schedules and accompanies you on a site visit. No surprise on-site experiences." },
  { step: "03", title: "Documentation", desc: "We verify title documents — C of O, Survey Plans, Deed of Assignment — before any payment is made." },
  { step: "04", title: "Handover", desc: "Payment, legal sign-off, and formal handover — all handled step-by-step under our supervision." },
];

export default function RealEstatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-4">Real Estate</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Find your property. Own it with confidence.
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">
              Every listing on Ndukego Homes has passed our title verification and physical
              inspection process — because the biggest financial decision of your life deserves
              that level of certainty.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-xl bg-[#C1121F] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors shadow-sm shadow-[#C1121F]/15"
              >
                Browse Properties <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/contact?message=${encodeURIComponent("Hi, I'm interested in your real estate services and would like to speak with an agent.")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Talk to Us
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* What we offer */}
      <section className="relative py-20 bg-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">What We Cover</p>
            <h2
              className="text-3xl font-bold text-gray-900 mb-12"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every kind of real estate, one trusted team
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {OFFERINGS.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimateIn key={item.title} delay={i * 0.07}>
                  <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} mb-4`}>
                      <Icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">How It Works</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-12" style={{ fontFamily: "var(--font-display)" }}>
              From listing to keys in hand
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((step, i) => (
              <AnimateIn key={step.step} delay={i * 0.08}>
                <div className="rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm h-full">
                  <p
                    className="text-4xl font-bold mb-4"
                    style={{
                      background: "linear-gradient(135deg, rgba(193,18,31,0.55), rgba(193,18,31,0.12))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {step.step}
                  </p>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="relative py-20 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">Why Ndukego</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: "var(--font-display)" }}>
                The Ndukego standard
              </h2>
              <div className="space-y-4">
                {[
                  "Title-verified listings — C of O, Survey Plans, Deed of Assignment confirmed before listing",
                  "In-house inspection team accompanies every site visit",
                  "No hidden charges — transparent pricing from day one",
                  "Legal support through documentation and conveyancing",
                  "Post-handover support for new owners",
                  "Licensed and experienced professionals with 10+ years in Nigerian real estate",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-[#C1121F] mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-600">{point}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={0.12}>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm space-y-5">
                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                  Start your property search
                </h3>
                <p className="text-sm text-gray-500">
                  Browse our full catalogue of verified listings — or speak to our team for a
                  guided search tailored to your budget and goals.
                </p>
                <Link
                  href="/properties"
                  className="block text-center rounded-xl bg-[#C1121F] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors"
                >
                  Browse All Properties
                </Link>
                <div className="relative flex items-center gap-3">
                  <div className="h-px flex-1 bg-gray-100" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="h-px flex-1 bg-gray-100" />
                </div>
                <Link
                  href={`/contact?message=${encodeURIComponent("Hi, I'm interested in your real estate services and would like to speak with an agent.")}`}
                  className="block text-center rounded-xl border border-gray-200 px-6 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Speak to an Agent
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
