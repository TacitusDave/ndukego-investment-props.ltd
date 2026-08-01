import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, Shield, Clock, BarChart3 } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Investment Financing",
  description: "Structured investment plans with transparent ROI timelines. Grow your capital with Ndukego Investments & Properties Ltd.",
};

const PLANS = [
  {
    label: "Short-Term",
    duration: "3 – 6 months",
    desc: "Ideal for capital preservation with modest growth. Suitable for those entering structured investing for the first time.",
    color: "border-emerald-200 bg-emerald-50/50",
    labelColor: "text-emerald-700 bg-emerald-100",
  },
  {
    label: "Medium-Term",
    duration: "6 – 12 months",
    desc: "Balanced approach with stronger returns. Tied to real estate and asset-backed instruments.",
    color: "border-blue-200 bg-blue-50/50",
    labelColor: "text-blue-700 bg-blue-100",
  },
  {
    label: "Long-Term",
    duration: "12 – 24+ months",
    desc: "Maximum compounding potential. Typically linked to property development cycles with the highest structured returns.",
    color: "border-violet-200 bg-violet-50/50",
    labelColor: "text-violet-700 bg-violet-100",
  },
];

const PRINCIPLES = [
  { icon: Shield, title: "Asset-Backed", desc: "Your capital is linked to tangible assets — primarily real estate — not speculative instruments." },
  { icon: BarChart3, title: "Transparent ROI", desc: "We publish clear return timelines before you commit. No hidden fees, no vague promises." },
  { icon: TrendingUp, title: "Structured Plans", desc: "Each plan has defined terms, milestones, and exit conditions — so you always know where you stand." },
  { icon: Clock, title: "Timely Payouts", desc: "Returns are paid on schedule. If there are any delays, you are informed proactively — always." },
];

export default function InvestmentFinancingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-4">Investment Financing</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your money, working as hard as you do.
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">
              We offer structured investment plans with transparent terms, asset-backed
              security, and clear ROI timelines. Whether you&apos;re growing savings or
              building serious wealth — we have a plan for your horizon.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/contact?message=${encodeURIComponent("Hi, I'm interested in your investment financing plans and would like to book a consultation.")}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#C1121F] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors shadow-sm shadow-[#C1121F]/15"
              >
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/contact?message=${encodeURIComponent("Hi, I'd like to learn more about your investment financing plans.")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                Learn More
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Plans */}
      <section className="relative py-20 bg-white/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">Investment Plans</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-12" style={{ fontFamily: "var(--font-display)" }}>
              Choose your investment horizon
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PLANS.map((plan, i) => (
              <AnimateIn key={plan.label} delay={i * 0.08}>
                <div className={`rounded-2xl border ${plan.color} p-7 h-full`}>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4 ${plan.labelColor}`}>
                    {plan.label}
                  </span>
                  <p className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    {plan.duration}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{plan.desc}</p>
                  <Link
                    href={`/contact?message=${encodeURIComponent(`Hi, I'm interested in the ${plan.label} Investment Plan (${plan.duration}) and would like more information.`)}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C1121F] hover:gap-2.5 transition-all"
                  >
                    Enquire <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
          <AnimateIn delay={0.1}>
            <p className="mt-6 text-xs text-gray-400 text-center">
              * Returns vary by plan and market conditions. All plans are asset-backed. Speak to our advisors for specific ROI projections.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Principles */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">Our Principles</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-12" style={{ fontFamily: "var(--font-display)" }}>
              How we protect and grow your capital
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimateIn key={item.title} delay={i * 0.07}>
                  <div className="flex gap-5 rounded-2xl border border-gray-100 bg-white/80 p-6 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C1121F]/8">
                      <Icon className="h-5 w-5 text-[#C1121F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateIn>
              <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">Get Started</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-5" style={{ fontFamily: "var(--font-display)" }}>
                Ready to put your capital to work?
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Book a free consultation with our investment advisors. We&apos;ll review your
                financial goals, risk appetite, and ideal timeline — then propose a plan built
                specifically for you.
              </p>
              <div className="space-y-3">
                {[
                  "No commitment required at consultation",
                  "Clear terms before any funds are placed",
                  "Full documentation provided for every plan",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-[#C1121F] mt-0.5 shrink-0" />
                    <p className="text-sm text-gray-600">{point}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
            <AnimateIn delay={0.12}>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Book your free session
                </h3>
                <p className="text-sm text-gray-400 mb-8">Speak to an investment advisor — no obligation, no pressure.</p>
                <Link
                  href={`/contact?message=${encodeURIComponent("Hi, I'm interested in your investment financing plans and would like to book a consultation.")}`}
                  className="block text-center rounded-xl bg-[#C1121F] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors mb-3"
                >
                  Book Consultation
                </Link>
                <p className="text-center text-xs text-gray-400">Or call: +234 803 609 6700</p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
