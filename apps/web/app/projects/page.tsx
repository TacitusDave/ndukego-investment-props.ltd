import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Layers } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ongoing and completed real estate developments by Ndukego Investment & Properties Ltd across Nigeria.",
};

const STATUS_STYLES: Record<string, string> = {
  "Ongoing": "bg-blue-100 text-blue-700",
  "Completed": "bg-emerald-100 text-emerald-700",
  "Upcoming": "bg-amber-100 text-amber-700",
};

const PROJECTS = [
  {
    title: "Ndukego Gardens Phase 1",
    location: "Enugu, Enugu State",
    status: "Completed",
    year: "2023",
    type: "Residential Estate",
    desc: "A fully serviced residential estate with 40 plots, road network, drainage, and perimeter fencing. All units sold and handed over.",
    units: "40 plots",
  },
  {
    title: "Ndukego Heights",
    location: "Lekki, Lagos State",
    status: "Ongoing",
    year: "2024–2025",
    type: "Luxury Residential",
    desc: "Premium 3–5 bedroom duplexes in a gated community with 24/7 security, solar power infrastructure, and recreational facilities.",
    units: "24 units",
  },
  {
    title: "Ndukego Commercial Hub",
    location: "Awka, Anambra State",
    status: "Ongoing",
    year: "2024–2026",
    type: "Commercial Development",
    desc: "A mixed-use commercial complex with office spaces, retail units, and a business lounge — designed for modern enterprise needs.",
    units: "18 commercial spaces",
  },
  {
    title: "Green Valley Estate",
    location: "Asaba, Delta State",
    status: "Upcoming",
    year: "2025",
    type: "Serviced Plots",
    desc: "Affordable serviced plots in a fast-growing corridor with access to major roads, power, and water infrastructure.",
    units: "80 plots",
  },
  {
    title: "Ndukego Gardens Phase 2",
    location: "Enugu, Enugu State",
    status: "Upcoming",
    year: "2025–2026",
    type: "Residential Estate",
    desc: "The second phase of our flagship Enugu estate — expanding the community with 60 additional plots and upgraded infrastructure.",
    units: "60 plots",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-4">Projects</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-2xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Where we build. What we deliver.
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
              From residential estates to commercial hubs — every Ndukego project is built
              to the highest standards of quality, transparency, and community value.
            </p>
          </AnimateIn>

          {/* Summary stats */}
          <AnimateIn delay={0.1}>
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
              {[
                { value: "5+", label: "Active & Completed Projects" },
                { value: "200+", label: "Units Delivered" },
                { value: "4", label: "States" },
                { value: "2019", label: "First Project" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-gray-900 tabular-nums">{s.value}</p>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Projects list */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {PROJECTS.map((project, i) => (
              <AnimateIn key={project.title} delay={i * 0.07}>
                <div className="group rounded-2xl border border-gray-100 bg-white/80 p-7 shadow-sm hover:shadow-md hover:border-[#C1121F]/15 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[project.status] ?? "bg-gray-100 text-gray-600"}`}>
                          {project.status}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                          {project.type}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                        {project.title}
                      </h2>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400 shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5" />
                        {project.units}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 text-sm text-gray-400 mb-3">
                    <MapPin className="h-3.5 w-3.5 mt-0.5 text-[#C1121F] shrink-0" />
                    {project.location}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{project.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 bg-white/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimateIn>
            <h2 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Interested in investing in a project?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Early buyers get the best pricing. Contact us to learn about off-plan
              opportunities before public launch.
            </p>
            <Link
              href={`/contact?message=${encodeURIComponent("Hi, I'm interested in your off-plan property opportunities. Please contact me with pricing details.")}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C1121F] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#D62839] transition-colors shadow-sm shadow-[#C1121F]/15"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
