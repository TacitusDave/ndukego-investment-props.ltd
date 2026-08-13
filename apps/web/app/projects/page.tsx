import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Layers, Building2 } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { publicFetch } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ongoing and completed real estate developments by Ndukego Investment & Properties Ltd across Nigeria.",
};

const STATUS_LABELS: Record<string, string> = {
  PLANNING: "Upcoming",
  UNDER_DEVELOPMENT: "Ongoing",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

const STATUS_STYLES: Record<string, string> = {
  PLANNING: "bg-amber-100 text-amber-700",
  UNDER_DEVELOPMENT: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-emerald-100 text-emerald-700",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  ARCHIVED: "bg-gray-100 text-gray-500",
};

interface Estate {
  id: string;
  name: string;
  description: string | null;
  shortDescription: string | null;
  status: string;
  state: string;
  city: string | null;
  totalPlots: number | null;
  availablePlots: number | null;
  featured: boolean;
  phases: unknown[];
  blocks: unknown[];
  _count: { properties: number };
}

interface EstatesResponse {
  items: Estate[];
  meta: { total: number };
}

export default async function ProjectsPage() {
  const res = await publicFetch<EstatesResponse>("/estates/public?limit=50");
  const estates = res.data?.items ?? [];

  const totalPlots = estates.reduce((sum, e) => sum + (e.totalPlots ?? 0), 0);
  const uniqueStates = new Set(estates.map((e) => e.state)).size;
  const completedCount = estates.filter((e) => e.status === "COMPLETED").length;

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#A0111C] mb-4">Projects</p>
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

          {estates.length > 0 && (
            <AnimateIn delay={0.1}>
              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-gray-200">
                {[
                  { value: String(estates.length), label: estates.length === 1 ? "Project" : "Projects" },
                  ...(totalPlots > 0 ? [{ value: `${totalPlots.toLocaleString()}+`, label: "Total Plots" }] : []),
                  ...(uniqueStates > 0 ? [{ value: String(uniqueStates), label: uniqueStates === 1 ? "State" : "States" }] : []),
                  ...(completedCount > 0 ? [{ value: String(completedCount), label: "Completed" }] : []),
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-gray-900 tabular-nums">{s.value}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>
          )}
        </div>
      </section>

      {/* Projects list */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {estates.length === 0 ? (
            <AnimateIn>
              <div className="rounded-2xl border border-gray-100 bg-white/80 p-16 text-center">
                <Building2 className="h-10 w-10 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">No projects to show yet. Check back soon.</p>
              </div>
            </AnimateIn>
          ) : (
            <div className="space-y-4">
              {estates.map((estate, i) => {
                const location = [estate.city, estate.state].filter(Boolean).join(", ");
                const desc = estate.shortDescription ?? estate.description;
                const statusLabel = STATUS_LABELS[estate.status] ?? estate.status;
                const statusStyle = STATUS_STYLES[estate.status] ?? "bg-gray-100 text-gray-600";
                const enquiryMsg = encodeURIComponent(
                  `Hi, I'm interested in the ${estate.name} project. Please send me more details.`
                );

                return (
                  <AnimateIn key={estate.id} delay={i * 0.07}>
                    <div className="group rounded-2xl border border-gray-100 bg-white/80 p-7 shadow-sm hover:shadow-md hover:border-[#A0111C]/15 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyle}`}>
                              {statusLabel}
                            </span>
                            {estate.featured && (
                              <span className="rounded-full bg-[#A0111C]/10 px-2.5 py-0.5 text-xs font-semibold text-[#A0111C]">
                                Featured
                              </span>
                            )}
                          </div>
                          <h2 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                            {estate.name}
                          </h2>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 shrink-0">
                          {estate.totalPlots != null && (
                            <span className="flex items-center gap-1.5">
                              <Layers className="h-3.5 w-3.5" />
                              {estate.totalPlots} plots
                            </span>
                          )}
                          {estate._count.properties > 0 && (
                            <span className="flex items-center gap-1.5">
                              <Building2 className="h-3.5 w-3.5" />
                              {estate._count.properties}{" "}
                              {estate._count.properties === 1 ? "property" : "properties"}
                            </span>
                          )}
                        </div>
                      </div>

                      {location && (
                        <div className="flex items-start gap-1.5 text-sm text-gray-400 mb-3">
                          <MapPin className="h-3.5 w-3.5 mt-0.5 text-[#A0111C] shrink-0" />
                          {location}
                        </div>
                      )}

                      {desc && (
                        <p className="text-sm text-gray-500 leading-relaxed mb-5">{desc}</p>
                      )}

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/contact?message=${enquiryMsg}`}
                          className="inline-flex items-center gap-1.5 rounded bg-[#A0111C] px-4 py-2 text-xs font-semibold text-white hover:bg-[#B41523] transition-colors"
                        >
                          Enquire <ArrowRight className="h-3 w-3" />
                        </Link>
                        {estate.availablePlots != null && estate.availablePlots > 0 && (
                          <span className="text-xs text-gray-400">
                            {estate.availablePlots} plot{estate.availablePlots !== 1 ? "s" : ""} available
                          </span>
                        )}
                      </div>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          )}
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
              className="inline-flex items-center gap-2 rounded bg-[#A0111C] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#B41523] transition-colors shadow-sm shadow-[#A0111C]/15"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
