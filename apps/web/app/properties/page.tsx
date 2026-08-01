import type { Metadata } from "next";
import Link from "next/link";
import { SlidersHorizontal, LayoutGrid, Map } from "lucide-react";
import { publicFetch } from "@/lib/api";
import { PropertyCard, type PropertyCardData } from "@/components/property-card";
import type { MapProperty } from "@/components/properties-map-client";
import { PropertiesMapSection } from "@/components/properties-map-section";

export const metadata: Metadata = {
  title: "Properties",
  description: "Browse all available properties from Ndukego Homes Gallery.",
};

interface PropertiesResponse {
  items: PropertyCardData[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

const PROPERTY_TYPES = [
  { value: "", label: "All types" },
  { value: "RESIDENTIAL", label: "Residential" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "INVESTMENT", label: "Investment" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "AGRICULTURAL", label: "Agricultural" },
  { value: "MIXED_USE", label: "Mixed Use" },
];

const CATEGORIES = [
  { value: "", label: "All categories" },
  { value: "HOUSE", label: "House" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "DUPLEX", label: "Duplex" },
  { value: "BUNGALOW", label: "Bungalow" },
  { value: "LUXURY_HOME", label: "Luxury Home" },
  { value: "LAND", label: "Land / Plot" },
  { value: "ESTATE_PLOT", label: "Estate Plot" },
  { value: "FARM_LAND", label: "Farm Land" },
  { value: "COMMERCIAL", label: "Commercial Space" },
  { value: "OFFICE", label: "Office" },
  { value: "SHOP", label: "Shop" },
  { value: "WAREHOUSE", label: "Warehouse" },
  { value: "HOTEL", label: "Hotel" },
  { value: "MIXED_USE", label: "Mixed Use" },
];

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

function buildQueryString(base: Record<string, string | undefined>, overrides: Record<string, string | undefined>) {
  const merged = { ...base, ...overrides };
  return new URLSearchParams(
    Object.entries(merged).filter(([, v]) => v !== undefined && v !== "") as [string, string][]
  ).toString();
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const search = params.search ?? "";
  const type = params.type ?? "";
  const category = params.category ?? "";
  const state = params.state ?? "";
  const estateId = params.estateId ?? "";
  const view = params.view ?? "list";

  const isMapView = view === "map";

  const query = new URLSearchParams({
    page: isMapView ? "1" : page,
    limit: isMapView ? "300" : "12",
  });
  const effectiveSearch = search || state;
  if (effectiveSearch) query.set("search", effectiveSearch);
  if (type) query.set("type", type);
  if (category) query.set("category", category);
  if (estateId) query.set("estateId", estateId);

  const { data, error } = await publicFetch<PropertiesResponse>(
    `/properties/public?${query.toString()}`,
  );

  const items = data?.items ?? [];
  const meta = data?.meta;

  // Build map pins from items that have coordinates
  const mapPins: MapProperty[] = isMapView
    ? items
        .filter((p) => p.latitude && p.longitude)
        .map((p) => ({
          id: p.id,
          title: p.title,
          listingPrice: p.listingPrice,
          latitude: parseFloat(String(p.latitude)),
          longitude: parseFloat(String(p.longitude)),
          coverUrl: p.media.find((m) => m.isCover)?.url ?? p.media[0]?.url ?? null,
        }))
    : [];

  const filterBase = { search, type, category, state, estateId };

  return (
    <>
      {/* Page header */}
      <section className="bg-white/60 border-b border-gray-100 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#C1121F] mb-2">
            Real Estate
          </p>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
            Properties of Ndukego Homes
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Powered by Ndukego Investments &amp; Properties Ltd
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            {meta ? `${meta.total} verified propert${meta.total === 1 ? "y" : "ies"} available` : "Explore our listings"}
          </p>
        </div>
      </section>

      {/* Filters + View toggle */}
      <section className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <form className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter:</span>
            </div>

            <input
              name="search"
              type="text"
              defaultValue={search}
              placeholder="Search title, location…"
              className="h-8 flex-1 min-w-36 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <select
              name="type"
              defaultValue={type}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>

            <select
              name="category"
              defaultValue={category}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <select
              name="state"
              defaultValue={state}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">All states</option>
              {NIGERIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Keep view param when submitting filters */}
            {isMapView && <input type="hidden" name="view" value="map" />}

            <button
              type="submit"
              className="h-8 rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              Apply
            </button>

            {(search || type || category || state) && (
              <Link
                href={`/properties${isMapView ? "?view=map" : ""}`}
                className="h-8 flex items-center rounded-md px-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear filters
              </Link>
            )}

            {/* View toggle */}
            <div className="ml-auto flex items-center gap-1 rounded-md border border-input bg-background p-0.5">
              <Link
                href={`/properties?${buildQueryString(filterBase, { view: "list", page: "1" })}`}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  !isMapView
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                List
              </Link>
              <Link
                href={`/properties?${buildQueryString(filterBase, { view: "map" })}`}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                  isMapView
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Map className="h-3.5 w-3.5" />
                Map
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* MAP VIEW */}
      {isMapView && <PropertiesMapSection mapPins={mapPins} error={error} />}

      {/* LIST VIEW */}
      {!isMapView && (
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive mb-6">
                Failed to load properties. Please try again.
              </div>
            )}

            {!error && items.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-medium text-foreground">No properties found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms.</p>
                <Link
                  href="/properties"
                  className="inline-block mt-4 rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90 transition-colors"
                >
                  Clear all filters
                </Link>
              </div>
            )}

            {items.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>

                {/* Pagination */}
                {meta && meta.totalPages > 1 && (
                  <div className="mt-10 flex items-center justify-center gap-2">
                    {meta.page > 1 && (
                      <Link
                        href={`/properties?${buildQueryString(filterBase, { page: String(meta.page - 1) })}`}
                        className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                      >
                        Previous
                      </Link>
                    )}
                    <span className="text-sm text-muted-foreground px-2">
                      Page {meta.page} of {meta.totalPages}
                    </span>
                    {meta.page < meta.totalPages && (
                      <Link
                        href={`/properties?${buildQueryString(filterBase, { page: String(meta.page + 1) })}`}
                        className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
