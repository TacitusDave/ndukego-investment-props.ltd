import Link from "next/link";
import { ArrowRight, Building2, DollarSign, TrendingUp, Users, Phone, CheckCircle, MapPin } from "lucide-react";
import { publicFetch } from "@/lib/api";
import { PropertyCard, type PropertyCardData } from "@/components/property-card";
import { HomeHero } from "@/components/home-hero";
import { HomeProcess } from "@/components/home-process";
import { AnimateIn } from "@/components/animate-in";

interface PropertiesResponse {
  items: PropertyCardData[];
  meta: { total: number };
}

interface Estate {
  id: string;
  name: string;
  state: string;
  city: string | null;
  shortDescription: string | null;
  totalPlots: number | null;
  availablePlots: number | null;
  coverImageUrl: string | null;
  masterPlanUrl: string | null;
  _count: { properties: number };
}

interface EstatesResponse {
  items: Estate[];
  meta: { total: number };
}

const SERVICES = [
  {
    icon: Building2,
    title: "Real Estate",
    subtitle: "Buy, sell, and develop property across Nigeria",
    href: "/services/real-estate",
    bg: "bg-emerald-50/60 hover:bg-emerald-50",
    border: "border-emerald-100 hover:border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    desc: "Verified residential, commercial, and land listings with full title checks and in-house inspection teams.",
  },
  {
    icon: DollarSign,
    title: "LPO Financing",
    subtitle: "Fast capital for government contracts",
    href: "/services/lpo-financing",
    bg: "bg-blue-50/60 hover:bg-blue-50",
    border: "border-blue-100 hover:border-blue-200",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    desc: "Access working capital against your Local Purchase Orders and government contracts — quick approval, competitive terms.",
  },
  {
    icon: TrendingUp,
    title: "Investment Financing",
    subtitle: "Grow your capital with structured returns",
    href: "/services/investment-financing",
    bg: "bg-violet-50/60 hover:bg-violet-50",
    border: "border-violet-100 hover:border-violet-200",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    desc: "Structured investment plans with transparent ROI timelines for both short and long-term wealth creation goals.",
  },
  {
    icon: Users,
    title: "Investment Consultancy",
    subtitle: "Expert guidance on financial decisions",
    href: "/services/investment-consultancy",
    bg: "bg-amber-50/60 hover:bg-amber-50",
    border: "border-amber-100 hover:border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    desc: "One-on-one financial advisory, portfolio analysis, and market intelligence to help you make smarter decisions.",
  },
];

export default async function HomePage() {
  const [featuredPropRes, allRes, featuredEstateRes] = await Promise.all([
    publicFetch<PropertiesResponse>("/properties/public?featured=true&limit=6"),
    publicFetch<PropertiesResponse>("/properties/public?limit=1"),
    publicFetch<EstatesResponse>("/estates/public?featured=true&limit=4"),
  ]);

  const featuredProperties = featuredPropRes.data?.items ?? [];
  const totalProperties = allRes.data?.meta.total ?? 0;
  const featuredEstates = featuredEstateRes.data?.items ?? [];

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <HomeHero totalProperties={totalProperties} />

      {/* ── Services ─────────────────────────────── */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <AnimateIn>
            <div className="mb-14">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">
                What We Do
              </p>
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 max-w-xl leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Four ways we help you build lasting wealth
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SERVICES.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <AnimateIn key={svc.href} delay={i * 0.08}>
                  <Link
                    href={svc.href}
                    className={`group relative rounded-2xl border ${svc.border} ${svc.bg} p-7 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md block`}
                  >
                    <div className="flex items-start gap-5">
                      <div className={`shrink-0 flex h-11 w-11 items-center justify-center rounded-xl ${svc.iconBg}`}>
                        <Icon className={`h-5 w-5 ${svc.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-gray-900 mb-0.5">{svc.title}</h3>
                        <p className="text-sm text-gray-500 mb-3">{svc.subtitle}</p>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 hidden sm:block">{svc.desc}</p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors">
                          Learn more <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ───────────────────── */}
      <section className="relative py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">
                  Real Estate
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {featuredProperties.length > 0 ? "Featured listings" : "Available properties"}
                </h2>
              </div>
              <Link
                href="/properties"
                className="flex items-center gap-1.5 text-sm font-semibold text-[#C1121F] hover:text-[#D62839] transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateIn>

          {featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((p, i) => (
                <AnimateIn key={p.id} delay={i * 0.07}>
                  <PropertyCard property={p} />
                </AnimateIn>
              ))}
            </div>
          ) : (
            <AnimateIn delay={0.1}>
              <div className="rounded-2xl border border-gray-100 bg-white/70 p-16 text-center shadow-sm">
                <Building2 className="h-10 w-10 mx-auto text-gray-300 mb-4" />
                <p className="font-semibold text-gray-600">Listings coming soon</p>
                <p className="text-sm text-gray-400 mt-2">
                  We&apos;re adding new verified properties. Check back shortly.
                </p>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* ── Featured Estates ──────────────────────── */}
      {featuredEstates.length > 0 && (
        <section className="relative py-24 bg-white/40">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimateIn>
              <div className="flex items-end justify-between mb-14">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">
                    Our Estates
                  </p>
                  <h2
                    className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Planned communities to call home
                  </h2>
                </div>
                <Link
                  href="/estates"
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#C1121F] hover:text-[#D62839] transition-colors"
                >
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimateIn>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredEstates.map((e, i) => (
                <AnimateIn key={e.id} delay={i * 0.1}>
                  <div className="group rounded-2xl border border-gray-100 bg-white/80 shadow-sm hover:shadow-lg hover:border-[#C1121F]/20 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row">
                    {/* Estate details */}
                    <div className="flex-1 p-6 flex flex-col">
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                        <MapPin className="h-3 w-3 text-[#C1121F] shrink-0" />
                        {e.city ? `${e.city}, ` : ""}{e.state}
                      </div>
                      <h3
                        className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#C1121F] transition-colors leading-snug"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {e.name}
                      </h3>
                      {e.shortDescription && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                          {e.shortDescription}
                        </p>
                      )}
                      {e.totalPlots && (
                        <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-gray-800 text-base">{e.availablePlots ?? "—"}</span>
                            <span>plots available</span>
                          </div>
                          <div className="w-px h-8 bg-gray-100" />
                          <div className="flex flex-col gap-0.5">
                            <span className="font-bold text-gray-800 text-base">{e.totalPlots}</span>
                            <span>total plots</span>
                          </div>
                        </div>
                      )}
                      <Link
                        href={`/estates/${e.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C1121F] hover:text-[#D62839] transition-colors mt-auto"
                      >
                        Explore estate <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                    {/* Site plan / cover image panel */}
                    <div className="sm:w-48 lg:w-52 shrink-0 bg-gray-50 border-t sm:border-t-0 sm:border-l border-gray-100 flex flex-col items-center justify-center p-5 gap-3 relative overflow-hidden">
                      {/* subtle pattern */}
                      <div className="absolute inset-0 opacity-[0.035]" style={{
                        backgroundImage: "radial-gradient(circle, #C1121F 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }} />
                      {e.coverImageUrl || e.masterPlanUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={e.masterPlanUrl ?? e.coverImageUrl ?? ""}
                          alt={`${e.name} site plan`}
                          className="relative w-full h-32 sm:h-full object-cover rounded-xl"
                        />
                      ) : (
                        <div className="relative flex flex-col items-center gap-3 text-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-gray-100">
                            <Building2 className="h-6 w-6 text-[#C1121F]" />
                          </div>
                          <p className="text-xs font-semibold text-gray-500 leading-snug">Site Plan<br />Available</p>
                        </div>
                      )}
                      <Link
                        href={`/estates/${e.id}`}
                        className="relative z-10 text-[11px] font-semibold text-[#C1121F] hover:text-[#D62839] transition-colors"
                      >
                        View site plan →
                      </Link>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Process ── */}
      <HomeProcess />

      {/* ── Why Trust Us ─────────────────────────── */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <AnimateIn>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-3">
                  Why Choose Us
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Trust built on transparency and results
                </h2>
                <p className="text-gray-500 leading-relaxed mb-8">
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
                      <p className="text-sm text-gray-600">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.15}>
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to get started?</h3>
                <p className="text-sm text-gray-400 mb-8">
                  Call us directly or book a free consultation and we&apos;ll connect you with the right opportunity.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { label: "Call us", number: "+234 803 609 6700", href: "tel:+2348036096700" },
                    { label: "Alternate", number: "+234 705 295 5555", href: "tel:+2347052955555" },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50/80 px-5 py-4 hover:border-[#C1121F]/20 hover:bg-[#C1121F]/4 transition-all group"
                    >
                      <div className="h-10 w-10 rounded-lg bg-[#C1121F]/8 border border-[#C1121F]/15 flex items-center justify-center shrink-0">
                        <Phone className="h-4 w-4 text-[#C1121F]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-sm font-semibold text-gray-700 group-hover:text-[#C1121F] transition-colors">
                          {item.number}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                <Link
                  href={`/contact?message=${encodeURIComponent("Hi, I'd like to book a free consultation with your team.")}`}
                  className="block w-full rounded-xl bg-[#C1121F] px-6 py-3.5 text-center text-sm font-semibold text-white hover:bg-[#D62839] transition-colors shadow-sm shadow-[#C1121F]/15"
                >
                  Book a Free Consultation
                </Link>
              </div>
            </AnimateIn>

          </div>
        </div>
      </section>
    </>
  );
}
