import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, TrendingUp, MapPin, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = { title: "About Us — Ndukego Investment & Properties Ltd" };

const VALUES = [
  {
    icon: Shield,
    title: "Trust",
    desc: "Every listing is verified. We confirm title documents and ownership before any property is published.",
  },
  {
    icon: Eye,
    title: "Transparency",
    desc: "No hidden fees, no surprises. Pricing, documentation, and processes are clear from start to finish.",
  },
  {
    icon: TrendingUp,
    title: "Professionalism",
    desc: "Our team brings over a decade of experience across residential, commercial, and land transactions.",
  },
];

const HIGHLIGHTS = [
  "Title-verified listings only",
  "Residential, commercial & land across Nigeria",
  "Dedicated estate developments",
  "Investor-focused opportunities",
  "Professional agency support",
  "Transparent pricing, always",
];

// ── Team data — replace photo: null with the real image URL when ready ──────

const EXECUTIVES = [
  {
    name: "Executive Director",
    title: "Executive Director",
    bio: "Leading the strategic direction and growth of Ndukego Investment & Properties Ltd with over a decade of real estate expertise.",
    photo: null as string | null,
  },
  {
    name: "Managing Director",
    title: "Managing Director",
    bio: "Overseeing daily operations and ensuring every client receives the highest standard of professional service.",
    photo: null as string | null,
  },
  {
    name: "Director of Finance",
    title: "Director of Finance",
    bio: "Driving the company's investment financing and LPO financing divisions with rigorous financial oversight.",
    photo: null as string | null,
  },
];

const TEAM = [
  { name: "Sales Agent", title: "Senior Sales Agent", photo: null as string | null },
  { name: "Sales Agent", title: "Sales Agent", photo: null as string | null },
  { name: "Sales Agent", title: "Sales Agent", photo: null as string | null },
  { name: "Sales Agent", title: "Sales Agent", photo: null as string | null },
];

// ── Placeholder avatar when no photo is provided ─────────────────────────────

function AvatarPlaceholder({ size = "lg" }: { size?: "lg" | "sm" }) {
  const dim = size === "lg" ? "w-28 h-28" : "w-20 h-20";
  return (
    <div className={`${dim} rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center mx-auto`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-1/2 h-1/2 text-gray-300" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-[var(--section-alt)] border-b border-[var(--nav-border)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary mb-4">
              <MapPin className="h-3 w-3" /> Nigeria&apos;s Trusted Real Estate Partner
            </span>
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
              About Ndukego Investment<br />&amp; Properties Limited
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A professional real estate company connecting buyers, investors, and renters
              with verified properties, estates, and investment opportunities across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ndukego Investment &amp; Properties Limited was founded on a simple belief:
                  real estate transactions in Nigeria should be as straightforward, transparent,
                  and trustworthy as they are in any world-class market.
                </p>
                <p>
                  Over the past decade, we have helped hundreds of families find their homes,
                  supported investors in building wealth through land and commercial acquisitions,
                  and developed estate communities that Nigerians are proud to call home.
                </p>
                <p>
                  From our base in Abuja, we serve clients across Nigeria — offering residential
                  and commercial property sales, estate development, LPO financing, and investment
                  consultancy, all under one roof with the professionalism our clients expect.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href={`/contact?message=${encodeURIComponent("Hi, I came across the About page and would like to speak with your team.")}`}
                  className="inline-flex items-center gap-2 rounded bg-secondary px-6 py-3 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors"
                >
                  Talk to our team <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">What we offer</h3>
                <ul className="space-y-2.5">
                  {HIGHLIGHTS.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-secondary shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-card p-5 text-center">
                  <p className="text-3xl font-bold text-secondary">10+</p>
                  <p className="text-xs text-muted-foreground mt-1">Years in real estate</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-5 text-center">
                  <p className="text-3xl font-bold text-secondary">12</p>
                  <p className="text-xs text-muted-foreground mt-1">States covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 bg-[var(--section-alt)] border-t border-[var(--nav-border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Our values</h2>
            <p className="text-muted-foreground mt-2">The principles that guide every transaction we support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 mb-4">
                    <Icon className="h-5 w-5 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Mission</h3>
              <p className="text-foreground leading-relaxed">
                To connect every Nigerian — homebuyer, investor, or renter — with trusted,
                verified real estate opportunities through transparent, professional service.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-3">Vision</h3>
              <p className="text-foreground leading-relaxed">
                To be Nigeria&apos;s most trusted real estate company, where every transaction
                is conducted with integrity, clarity, and professional excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Executives & Directors ── */}
      <section className="py-16 bg-[var(--section-alt)] border-t border-[var(--nav-border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Leadership</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              The executives and directors driving Ndukego Investment &amp; Properties Limited forward.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXECUTIVES.map((person, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-6 text-center flex flex-col items-center gap-4">
                {person.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-28 h-28 rounded-full object-cover border-2 border-border"
                  />
                ) : (
                  <AvatarPlaceholder size="lg" />
                )}
                <div>
                  <p className="font-semibold text-foreground text-base">{person.name}</p>
                  <p className="text-xs font-medium uppercase tracking-widest text-secondary mt-0.5">{person.title}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team / Sales Agents ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-foreground">Our Team</h2>
            <p className="text-muted-foreground mt-2">
              The agents and professionals who serve our clients every day.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {TEAM.map((person, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 text-center flex flex-col items-center gap-3">
                {person.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-border"
                  />
                ) : (
                  <AvatarPlaceholder size="sm" />
                )}
                <div>
                  <p className="font-semibold text-foreground text-sm">{person.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{person.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[var(--section-alt)] border-t border-[var(--nav-border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Ready to work with us?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Whether you are buying, investing, or looking for financing — our team is here to guide you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded bg-secondary px-6 py-3 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors"
            >
              Browse properties <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
