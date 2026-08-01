import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Bed, Bath, Maximize2, Building2, Calendar, Eye } from "lucide-react";
import { publicFetch, API_IMAGE_BASE } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { InquiryForm } from "@/components/inquiry-form";
import { ReserveButton } from "@/components/reserve-button";
import { FavoriteButton } from "@/components/favorite-button";
import { PropertyAmenities } from "@/components/property-amenities";
import { PropertyAgent } from "@/components/property-agent";

interface Media {
  id: string;
  url: string;
  title: string | null;
  isCover: boolean;
  sortOrder: number;
}

interface Estate {
  id: string;
  name: string;
  slug: string;
}

interface Property {
  id: string;
  internalNumber: string;
  title: string;
  status: string;
  category: string;
  type: string;
  state: string;
  lga: string | null;
  city: string | null;
  description: string | null;
  shortDescription: string | null;
  listingPrice: string | null;
  landSize: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  installmentAllowed: boolean;
  reservationAmount: string | null;
  viewCount: number;
  amenities: string[];
  mapUrl: string | null;
  latitude: string | null;
  longitude: string | null;
  estate: Estate | null;
  media: Media[];
  createdAt: string;
}

function extractCoordsFromUrl(url: string): { lat: number; lng: number } | null {
  const atMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (atMatch) return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
  const qMatch = url.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (qMatch) return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
  return null;
}

const CATEGORY_LABEL: Record<string, string> = {
  LAND: "Land", HOUSE: "House", DUPLEX: "Duplex", BUNGALOW: "Bungalow",
  APARTMENT: "Apartment", COMMERCIAL: "Commercial", WAREHOUSE: "Warehouse",
  OFFICE: "Office", SHOP: "Shop", HOTEL: "Hotel", ESTATE_PLOT: "Estate Plot",
  FARM_LAND: "Farm Land", MIXED_USE: "Mixed Use", INDUSTRIAL: "Industrial",
  LUXURY_HOME: "Luxury Home", PROJECT_DEVELOPMENT: "Project Development",
};

const TYPE_LABEL: Record<string, string> = {
  RESIDENTIAL: "Residential", COMMERCIAL: "Commercial", INDUSTRIAL: "Industrial",
  AGRICULTURAL: "Agricultural", INVESTMENT: "Investment", MIXED_USE: "Mixed Use",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await publicFetch<Property>(`/properties/public/${id}`);
  if (!data) return { title: "Property not found" };
  return {
    title: data.title,
    description: data.shortDescription ?? `${CATEGORY_LABEL[data.category] ?? data.category} in ${data.city ?? data.state}, Nigeria`,
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: property, error } = await publicFetch<Property>(`/properties/public/${id}`);

  if (error || !property) notFound();

  function getMapEmbedUrl(): string | null {
    if (property!.latitude && property!.longitude) {
      return `https://maps.google.com/maps?q=${property!.latitude},${property!.longitude}&hl=en&z=17&output=embed`;
    }
    if (property!.mapUrl) {
      const coords = extractCoordsFromUrl(property!.mapUrl);
      if (coords) return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&hl=en&z=17&output=embed`;
    }
    return null;
  }

  const mapEmbedUrl = getMapEmbedUrl();
  const sortedMedia = [...property.media].sort((a, b) => a.sortOrder - b.sortOrder);
  const cover = sortedMedia.find((m) => m.isCover) ?? sortedMedia[0];
  const otherMedia = sortedMedia.filter((m) => m.id !== cover?.id);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/properties" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Properties
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-xs">{property.title}</span>
        </div>
      </div>

      {/* Image gallery */}
      {sortedMedia.length > 0 ? (
        <div className="bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-2">
              {/* Cover image */}
              <div className="flex-1 min-w-0">
                {cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${API_IMAGE_BASE}${cover.url}`}
                    alt={property.title}
                    className="w-full h-80 md:h-[420px] object-cover rounded-lg"
                  />
                )}
              </div>
              {/* Thumbnails */}
              {otherMedia.length > 0 && (
                <div className="hidden md:flex flex-col gap-2 w-40 shrink-0">
                  {otherMedia.slice(0, 3).map((m, i) => (
                    <div key={m.id} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${API_IMAGE_BASE}${m.url}`}
                        alt={m.title ?? `Photo ${i + 2}`}
                        className="w-full h-[133px] object-cover rounded-lg opacity-90"
                      />
                      {i === 2 && otherMedia.length > 3 && (
                        <div className="absolute inset-0 rounded-lg bg-black/60 flex items-center justify-center text-white text-sm font-medium">
                          +{otherMedia.length - 3} more
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--section-alt)] h-64 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No photos available yet</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title & price */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="rounded-full bg-secondary/10 text-secondary px-2.5 py-0.5 text-xs font-semibold">
                  {CATEGORY_LABEL[property.category] ?? property.category}
                </span>
                {property.type && (
                  <span className="rounded-full bg-muted text-muted-foreground px-2.5 py-0.5 text-xs">
                    {TYPE_LABEL[property.type] ?? property.type.replace(/_/g, " ")}
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>
                  {property.city ? `${property.city}, ` : ""}{property.state}
                  {property.lga ? `, ${property.lga}` : ""}
                </span>
              </div>
              {property.estate && (
                <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span>Part of <strong>{property.estate.name}</strong></span>
                </div>
              )}

              <div className="mt-4">
                {property.listingPrice ? (
                  <p className="text-3xl font-bold text-secondary">
                    {formatCurrency(property.listingPrice)}
                  </p>
                ) : (
                  <p className="text-lg font-medium text-muted-foreground">Price on request</p>
                )}
                {property.installmentAllowed && property.reservationAmount && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Installment available · Reserve from {formatCurrency(property.reservationAmount)}
                  </p>
                )}
              </div>
            </div>

            {/* Key specs */}
            {(property.bedrooms || property.bathrooms || property.landSize) && (
              <div className="rounded-xl border bg-card p-5">
                <h2 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
                  Property details
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {property.bedrooms != null && (
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <p className="text-lg font-bold">{property.bedrooms}</p>
                      <p className="text-xs text-muted-foreground">{property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}</p>
                    </div>
                  )}
                  {property.bathrooms != null && (
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <p className="text-lg font-bold">{property.bathrooms}</p>
                      <p className="text-xs text-muted-foreground">{property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}</p>
                    </div>
                  )}
                  {property.landSize && (
                    <div className="flex flex-col items-center gap-1 text-center">
                      <Maximize2 className="h-5 w-5 text-muted-foreground" />
                      <p className="text-lg font-bold">{property.landSize}</p>
                      <p className="text-xs text-muted-foreground">sqm</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {(property.description || property.shortDescription) && (
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <h2 className="font-semibold">About this property</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {property.description ?? property.shortDescription}
                </p>
              </div>
            )}

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <PropertyAmenities amenities={property.amenities} />
            )}

            {/* Location map */}
            {mapEmbedUrl && (
              <div className="space-y-2">
                <h2 className="font-semibold">Location</h2>
                <div className="rounded-xl overflow-hidden border h-64">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property location map"
                  />
                </div>
                {property.mapUrl && (
                  <a
                    href={property.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#C1121F] hover:underline"
                  >
                    Open in Google Maps →
                  </a>
                )}
              </div>
            )}

            {/* More thumbnails (mobile) */}
            {otherMedia.length > 0 && (
              <div className="md:hidden">
                <h2 className="font-semibold mb-3">Photos</h2>
                <div className="grid grid-cols-3 gap-2">
                  {otherMedia.map((m, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={m.id}
                      src={`${API_IMAGE_BASE}${m.url}`}
                      alt={m.title ?? `Photo ${i + 2}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground border-t pt-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Listed {formatDate(property.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {property.viewCount} views
              </span>
              <span className="font-mono">{property.internalNumber}</span>
            </div>
          </div>

          {/* Right: Inquiry card + Agent */}
          <div className="lg:col-span-1 space-y-4">
            <div className="sticky top-24 rounded-xl border bg-card p-6 shadow-sm space-y-5">
              {/* Reserve CTA */}
              {(property.status === "PUBLISHED") && (
                <div className="space-y-2">
                  <h2 className="font-bold text-lg">Ready to secure this property?</h2>
                  <p className="text-sm text-muted-foreground">
                    Submit a reservation request — no payment required online.
                  </p>
                  <ReserveButton
                    propertyId={property.id}
                    propertyTitle={property.title}
                    reservationAmount={property.reservationAmount}
                  />
                </div>
              )}

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs text-muted-foreground">
                  <span className="bg-card px-2">or ask a question</span>
                </div>
              </div>

              {/* Save property */}
              <div className="flex justify-center">
                <FavoriteButton propertyId={property.id} />
              </div>

              {/* Inquiry form */}
              <div>
                <h3 className="font-semibold mb-3">Send an inquiry</h3>
                <InquiryForm propertyId={property.id} propertyTitle={property.title} />
              </div>
            </div>

            {/* Agent card — flows below the inquiry card, not sticky */}
            <PropertyAgent />
          </div>

        </div>
      </div>
    </div>
  );
}
