import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { publicFetch } from "@/lib/api";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Our Estates",
  description: "Planned communities and residential developments by Ndukego Investments & Properties Ltd.",
};

interface Estate {
  id: string;
  name: string;
  code: string;
  state: string;
  city: string | null;
  status: string;
  totalPlots: number | null;
  availablePlots: number | null;
  shortDescription: string | null;
  _count: { properties: number };
}

interface EstatesResponse {
  items: Estate[];
  meta: { total: number };
}

export default async function EstatesPage() {
  const { data } = await publicFetch<EstatesResponse>("/estates/public?limit=50");
  const estates = data?.items ?? [];

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimateIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-4">Estates</p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight max-w-2xl mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Planned communities built for life.
            </h1>
            <p className="text-lg text-gray-500 max-w-xl leading-relaxed">
              Every Ndukego estate is a fully planned community — with roads, drainage,
              power, security, and green spaces built in from the ground up.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Grid */}
      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {estates.length === 0 ? (
            <AnimateIn>
              <div className="py-20 text-center rounded-2xl border border-gray-100 bg-white/70">
                <p className="text-gray-400 text-sm">No estates listed yet. Check back soon.</p>
              </div>
            </AnimateIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {estates.map((e, i) => (
                <AnimateIn key={e.id} delay={i * 0.06}>
                  <div className="group rounded-2xl border border-gray-100 bg-white/80 p-6 space-y-4 hover:shadow-md hover:border-[#C1121F]/15 transition-all duration-300 flex flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h2
                        className="font-bold text-lg text-gray-900 leading-tight group-hover:text-[#C1121F] transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {e.name}
                      </h2>
                      <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 shrink-0">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-gray-400">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C1121F]" />
                      {e.city ? `${e.city}, ` : ""}{e.state}
                    </div>

                    {e.shortDescription && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
                        {e.shortDescription}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4 mt-auto">
                      <span>{e._count.properties} propert{e._count.properties === 1 ? "y" : "ies"} listed</span>
                      {e.totalPlots && (
                        <span>{e.availablePlots ?? "—"} / {e.totalPlots} plots available</span>
                      )}
                    </div>

                    <Link
                      href={`/estates/${e.id}`}
                      className="flex items-center justify-center gap-2 rounded-xl bg-[#C1121F]/8 border border-[#C1121F]/15 text-[#C1121F] text-sm font-semibold py-2.5 hover:bg-[#C1121F] hover:text-white transition-all duration-200"
                    >
                      Explore estate <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
