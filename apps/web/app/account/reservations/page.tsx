import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { getWebSession } from "@/lib/auth";
import { publicFetch } from "@/lib/api";
import { formatDate, formatCurrency } from "@/lib/utils";

interface Reservation {
  id: string;
  reservationNumber: string;
  status: string;
  reservationAmount: string;
  reservedAt: string;
  expiresAt: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
  notes: string | null;
  property: {
    id: string;
    title: string;
    state: string;
    city: string | null;
    listingPrice: string | null;
    category: string;
  };
}

const STATUS_STYLE: Record<string, { label: string; className: string; description: string }> = {
  PENDING: {
    label: "Pending Review",
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400",
    description: "Our team is reviewing your request and will contact you shortly.",
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
    description: "Your reservation has been confirmed. Our team will be in touch.",
  },
  EXPIRED: {
    label: "Expired",
    className: "bg-gray-100 text-gray-600 dark:bg-zinc-800 dark:text-zinc-500",
    description: "This reservation has expired. You may submit a new request.",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
    description: "This reservation has been cancelled.",
  },
  CONVERTED_TO_SALE: {
    label: "Converted to Sale",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400",
    description: "This reservation has progressed to a sale. Contact us for details.",
  },
};

const CATEGORY_LABEL: Record<string, string> = {
  LAND: "Land", HOUSE: "House", DUPLEX: "Duplex", BUNGALOW: "Bungalow",
  APARTMENT: "Apartment", COMMERCIAL: "Commercial", WAREHOUSE: "Warehouse",
  OFFICE: "Office", SHOP: "Shop", HOTEL: "Hotel", ESTATE_PLOT: "Estate Plot",
  FARM_LAND: "Farm Land", MIXED_USE: "Mixed Use", INDUSTRIAL: "Industrial",
  LUXURY_HOME: "Luxury Home", PROJECT_DEVELOPMENT: "Project Development",
};

export default async function MyReservationsPage() {
  const session = await getWebSession();
  if (!session) return null;

  const { data: reservations } = await publicFetch<Reservation[]>("/reservations/mine", {
    headers: { Authorization: `Bearer ${session.token}` },
    cache: "no-store",
  });

  const items = reservations ?? [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">My Reservations</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {items.length} reservation{items.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <CalendarCheck className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
          <p className="font-medium text-foreground">No reservations yet</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
            Find a property you love and click &quot;Reserve this property&quot; to get started.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 mt-4 rounded-lg bg-[#A0111C] px-4 py-2 text-sm font-medium text-white hover:bg-[#B41523] transition-colors"
          >
            Browse properties <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((res) => {
            const style = STATUS_STYLE[res.status] ?? {
              label: res.status,
              className: "bg-gray-100 text-gray-600",
              description: "",
            };
            return (
              <div key={res.id} className="rounded-xl border bg-card overflow-hidden">
                <div className="flex items-start justify-between gap-4 p-5">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.className}`}>
                        {style.label}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">{res.reservationNumber}</span>
                    </div>
                    <Link
                      href={`/properties/${res.property.id}`}
                      className="font-semibold text-foreground hover:text-secondary transition-colors block truncate"
                    >
                      {res.property.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {CATEGORY_LABEL[res.property.category] ?? res.property.category} ·{" "}
                      {res.property.city ? `${res.property.city}, ` : ""}{res.property.state}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {res.property.listingPrice && (
                      <p className="font-bold text-secondary">{formatCurrency(res.property.listingPrice)}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">Listing price</p>
                  </div>
                </div>

                <div className="border-t bg-muted/30 px-5 py-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <span>Reserved {formatDate(res.reservedAt)}</span>
                  {res.confirmedAt && <span>Confirmed {formatDate(res.confirmedAt)}</span>}
                  {res.status === "PENDING" && (
                    <span>Expires {formatDate(res.expiresAt)}</span>
                  )}
                  {Number(res.reservationAmount) > 0 && (
                    <span>Reservation fee: {formatCurrency(res.reservationAmount)}</span>
                  )}
                </div>

                {style.description && (
                  <div className="border-t px-5 py-2.5">
                    <p className="text-xs text-muted-foreground">{style.description}</p>
                    {res.notes && (
                      <p className="text-xs text-foreground mt-1 font-medium">Note: {res.notes}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
