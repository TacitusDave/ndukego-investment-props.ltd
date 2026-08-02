import type { Metadata } from "next";
import Link from "next/link";
import { Building2, DollarSign, TrendingUp, Users, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Real estate, LPO financing, investment financing, and consultancy services from Ndukego Investment & Properties Ltd.",
};

const SERVICES = [
  {
    icon: Building2,
    title: "Real Estate",
    desc: "Verified residential homes, commercial properties, land, and estate development across Nigeria. Every listing is title-checked and inspection-cleared.",
    href: "/services/real-estate",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    border: "border-emerald-100 hover:border-emerald-200",
    bg: "hover:bg-emerald-50/50",
  },
  {
    icon: DollarSign,
    title: "LPO Financing",
    desc: "Access working capital against your Local Purchase Orders and government contracts. Quick assessment, fast disbursement, competitive terms.",
    href: "/services/lpo-financing",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-100 hover:border-blue-200",
    bg: "hover:bg-blue-50/50",
  },
  {
    icon: TrendingUp,
    title: "Investment Financing",
    desc: "Structured capital plans with transparent ROI timelines — from 3-month short-term placements to long-term wealth-building instruments.",
    href: "/services/investment-financing",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    border: "border-violet-100 hover:border-violet-200",
    bg: "hover:bg-violet-50/50",
  },
  {
    icon: Users,
    title: "Investment Consultancy",
    desc: "One-on-one financial advisory, portfolio analysis, and market intelligence to help individuals and businesses make smarter investment decisions.",
    href: "/services/investment-consultancy",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    border: "border-amber-100 hover:border-amber-200",
    bg: "hover:bg-amber-50/50",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-4">What We Offer</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-2xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Four pillars. One trusted group.
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              Ndukego Investment &amp; Properties Ltd brings real estate, financing, and expert
              advisory under one roof — so your wealth journey never has to leave us.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Service cards */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <AnimateIn key={svc.href} delay={i * 0.08}>
                  <Link
                    href={svc.href}
                    className={`group block rounded-2xl border ${svc.border} ${svc.bg} bg-white/70 p-8 transition-all duration-300 shadow-sm hover:shadow-md`}
                  >
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${svc.iconBg} mb-5`}>
                      <Icon className={`h-5 w-5 ${svc.iconColor}`} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                      {svc.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{svc.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C1121F] group-hover:gap-2.5 transition-all">
                      Explore service <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-16 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Not sure where to start?
            </h2>
            <p className="text-gray-500 mb-8">Book a free consultation and we&apos;ll point you in the right direction.</p>
            <Link
              href={`/contact?message=${encodeURIComponent("Hi, I'd like to book a free consultation to learn more about your services.")}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C1121F] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors shadow-sm shadow-[#C1121F]/15"
            >
              Book Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
