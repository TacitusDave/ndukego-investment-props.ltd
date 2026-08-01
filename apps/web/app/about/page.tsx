import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Eye, TrendingUp, MapPin, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = { title: "About Us — Ndukego Homes Gallery" };

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

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--section-alt)] border-b border-[var(--nav-border)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-3 py-1 text-xs font-medium text-secondary mb-4">
              <MapPin className="h-3 w-3" /> Nigeria&apos;s Trusted Real Estate Partner
            </span>
            <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
              About Ndukego Homes Gallery
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A professional real estate platform powered by Ndukego Investments &amp; Properties Limited —
              connecting buyers, investors, and renters with verified properties across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Ndukego Investments &amp; Properties Limited was founded on a simple belief:
                  real estate transactions in Nigeria should be as straightforward, transparent,
                  and trustworthy as they are in any world-class market.
                </p>
                <p>
                  Over the past decade, we have helped hundreds of families find their homes,
                  supported investors in building wealth through land and commercial acquisitions,
                  and developed estate communities that Nigerians are proud to call home.
                </p>
                <p>
                  Ndukego Homes Gallery is our digital platform — designed to bring the full
                  breadth of our property portfolio online, with the transparency and professionalism
                  our clients expect.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href={`/contact?message=${encodeURIComponent("Hi, I came across the About page and would like to speak with your team.")}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 text-sm font-semibold text-white hover:bg-secondary/90 transition-colors"
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

      {/* Values */}
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

      {/* Mission / Vision */}
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
                To be Nigeria&apos;s most trusted real estate platform, where every transaction
                is conducted with integrity, clarity, and professional excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
