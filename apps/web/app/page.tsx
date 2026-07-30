import Link from "next/link";
import { ArrowRight, Building2, DollarSign, TrendingUp, Users, Phone, CheckCircle } from "lucide-react";
import { publicFetch } from "@/lib/api";
import { PropertyCard, type PropertyCardData } from "@/components/property-card";
import { HomeHero } from "@/components/home-hero";
import { HomeProcess } from "@/components/home-process";

interface PropertiesResponse {
  items: PropertyCardData[];
  meta: { total: number };
}

const GRID = {
  backgroundImage:
    "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "60px 60px",
} as const;

const SERVICES = [
  {
    icon: Building2,
    title: "Real Estate",
    subtitle: "Buy, sell, and develop property across Nigeria",
    href: "/services/real-estate",
    desc: "Verified residential, commercial, and land listings with full title checks and in-house inspection teams.",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "border-emerald-500/20",
  },
  {
    icon: DollarSign,
    title: "LPO Financing",
    subtitle: "Fast capital for government contracts",
    href: "/services/lpo-financing",
    desc: "Access working capital against your Local Purchase Orders and government contracts — quick approval, competitive terms.",
    gradient: "from-blue-500/15 via-blue-500/5 to-transparent",
    border: "border-blue-500/15",
  },
  {
    icon: TrendingUp,
    title: "Investment Financing",
    subtitle: "Grow your capital with structured returns",
    href: "/services/investment-financing",
    desc: "Structured investment plans with transparent ROI timelines for both short and long-term wealth creation goals.",
    gradient: "from-violet-500/15 via-violet-500/5 to-transparent",
    border: "border-violet-500/15",
  },
  {
    icon: Users,
    title: "Investment Consultancy",
    subtitle: "Expert guidance on financial decisions",
    href: "/services/investment-consultancy",
    desc: "One-on-one financial advisory, portfolio analysis, and market intelligence to help you make smarter investment decisions.",
    gradient: "from-amber-500/15 via-amber-500/5 to-transparent",
    border: "border-amber-500/15",
  },
];

export default async function HomePage() {
  const [featuredRes, allRes] = await Promise.all([
    publicFetch<PropertiesResponse>("/properties/public?featured=true&limit=6"),
    publicFetch<PropertiesResponse>("/properties/public?limit=1"),
  ]);

  const featured = featuredRes.data?.items ?? [];
  const totalProperties = allRes.data?.meta.total ?? 0;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <HomeHero totalProperties={totalProperties} />

      {/* ── Services ─────────────────────────────────────────── */}
      <section className="relative py-24 bg-[#080808] overflow-hidden">
        {/* Grid */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={GRID} />
        {/* Moving blob — top-left crimson */}
        <div
          aria-hidden
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "55vw", height: "55vw", maxWidth: "700px", maxHeight: "700px",
            top: "-30%", left: "-15%",
            background: "radial-gradient(circle, rgba(193,18,31,0.18) 0%, transparent 65%)",
            filter: "blur(80px)",
            animation: "blob-drift-1 32s ease-in-out infinite",
          }}
        />
        {/* Moving blob — bottom-right */}
        <div
          aria-hidden
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "40vw", height: "40vw", maxWidth: "500px", maxHeight: "500px",
            bottom: "-15%", right: "-10%",
            background: "radial-gradient(circle, rgba(100,5,15,0.15) 0%, transparent 65%)",
            filter: "blur(70px)",
            animation: "blob-drift-2 26s ease-in-out infinite 5s",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C1121F] mb-3">
              What We Do
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white max-w-xl leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Four ways we help you build lasting wealth
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {SERVICES.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className={`group relative rounded-2xl border ${svc.border} bg-white/[0.03] p-8 overflow-hidden hover:bg-white/[0.05] transition-all duration-300`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${svc.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/8">
                      <Icon className="h-5 w-5 text-white/60" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{svc.title}</h3>
                    <p className="text-sm text-white/40 mb-4">{svc.subtitle}</p>
                    <p className="text-sm text-white/30 leading-relaxed mb-6">{svc.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ───────────────────────────────── */}
      <section className="relative py-24 bg-[#050505] overflow-hidden">
        {/* Grid */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={GRID} />
        {/* Subtle centre glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "60vw", height: "60vw", maxWidth: "700px", maxHeight: "700px",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(193,18,31,0.08) 0%, transparent 65%)",
            filter: "blur(90px)",
            animation: "blob-drift-3 35s ease-in-out infinite",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C1121F] mb-3">
                Real Estate
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {featured.length > 0 ? "Featured listings" : "Available properties"}
              </h2>
            </div>
            <Link
              href="/properties"
              className="flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white/80 transition-colors"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-16 text-center">
              <Building2 className="h-10 w-10 mx-auto text-white/15 mb-4" />
              <p className="font-semibold text-white/50">Listings coming soon</p>
              <p className="text-sm text-white/25 mt-2">
                We&apos;re adding new verified properties. Check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <HomeProcess />

      {/* ── Why Trust Us ─────────────────────────────────────── */}
      <section className="relative py-24 bg-[#080808] overflow-hidden">
        {/* Grid */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={GRID} />
        {/* Moving blob — left side */}
        <div
          aria-hidden
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "50vw", height: "50vw", maxWidth: "600px", maxHeight: "600px",
            top: "10%", left: "-20%",
            background: "radial-gradient(circle, rgba(193,18,31,0.12) 0%, transparent 65%)",
            filter: "blur(80px)",
            animation: "blob-drift-2 30s ease-in-out infinite 3s",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#C1121F] mb-3">
                Why Choose Us
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Trust built on transparency and results
              </h2>
              <p className="text-white/40 leading-relaxed mb-8">
                We don&apos;t just list properties — we verify every title, inspect every site,
                and stay with you through every step of the transaction. That&apos;s the Ndukego standard.
              </p>
              <div className="space-y-4">
                {[
                  "Title-verified properties only — no surprises after payment",
                  "In-house inspection team for every listing",
                  "Transparent pricing with no hidden charges",
                  "Licensed professionals with 10+ years in the Nigerian market",
                  "End-to-end support from listing to handover",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-[#C1121F] mt-0.5 shrink-0" />
                    <p className="text-sm text-white/50">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-8">
              <h3 className="text-xl font-bold text-white mb-2">Ready to get started?</h3>
              <p className="text-sm text-white/35 mb-8">
                Call us directly or book a free consultation and we&apos;ll connect you with the right opportunity.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href="tel:+2348036096700"
                  className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 hover:border-white/15 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#C1121F]/10 border border-[#C1121F]/20 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-[#C1121F]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest">Call us</p>
                    <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                      +234 803 609 6700
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+2347052955555"
                  className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-4 hover:border-white/15 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="h-10 w-10 rounded-lg bg-[#C1121F]/10 border border-[#C1121F]/20 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-[#C1121F]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest">Alternate</p>
                    <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                      +234 705 295 5555
                    </p>
                  </div>
                </a>
              </div>

              <Link
                href="/contact"
                className="block w-full rounded-xl bg-[#C1121F] px-6 py-3.5 text-center text-sm font-semibold text-white hover:bg-[#D62839] transition-colors"
              >
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
