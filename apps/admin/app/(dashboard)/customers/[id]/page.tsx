import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";

interface Customer {
  id: string;
  customerNumber: string;
  type: string;
  status: string;
  kycStatus: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  companyName: string | null;
  email: string;
  phone: string;
  whatsapp: string | null;
  alternatePhone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  occupation: string | null;
  nationality: string;
  leadSource: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  reservations: { id: string; createdAt: string }[];
  sales: { id: string; createdAt: string }[];
}

const STATUS_STYLES: Record<string, string> = {
  PROSPECT: "bg-slate-100 text-slate-700",
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-zinc-100 text-zinc-500",
  BLACKLISTED: "bg-red-100 text-red-700",
};

const KYC_STYLES: Record<string, string> = {
  NOT_STARTED: "bg-slate-100 text-slate-600",
  PENDING: "bg-amber-100 text-amber-700",
  VERIFIED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  EXPIRED: "bg-orange-100 text-orange-700",
};

function displayName(c: Customer) {
  if (c.firstName || c.lastName)
    return [c.firstName, c.middleName, c.lastName].filter(Boolean).join(" ");
  return c.companyName ?? c.email;
}

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: customer, error } = await apiFetch<Customer>(`/customers/${id}`);

  if (error || !customer) notFound();

  return (
    <div className="flex flex-col h-full">
      <Header title={displayName(customer)}>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/customers">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to customers
          </Link>
        </Button>
      </Header>

      <div className="flex-1 p-6 max-w-4xl space-y-6">

        {/* Status bar */}
        <div className="flex items-center gap-4 rounded-md border bg-card p-4">
          <div className="font-mono text-xs text-muted-foreground">{customer.customerNumber}</div>
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[customer.status] ?? ""}`}>
            {customer.status.toLowerCase()}
          </span>
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${KYC_STYLES[customer.kycStatus] ?? ""}`}>
            KYC: {customer.kycStatus.replace(/_/g, " ").toLowerCase()}
          </span>
          <span className="text-xs text-muted-foreground capitalize ml-auto">
            {customer.type.toLowerCase()} · {customer.nationality}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Contact */}
          <div className="rounded-md border bg-card p-5 space-y-3">
            <h2 className="text-sm font-semibold">Contact information</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd><a href={`mailto:${customer.email}`} className="hover:underline">{customer.email}</a></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Phone</dt>
                <dd>{customer.phone}</dd>
              </div>
              {customer.whatsapp && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">WhatsApp</dt>
                  <dd>{customer.whatsapp}</dd>
                </div>
              )}
              {customer.alternatePhone && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Alternate</dt>
                  <dd>{customer.alternatePhone}</dd>
                </div>
              )}
              {customer.address && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Address</dt>
                  <dd className="text-right max-w-[180px]">{customer.address}</dd>
                </div>
              )}
              {(customer.city || customer.state) && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd>{customer.city ? `${customer.city}, ` : ""}{customer.state}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Profile */}
          <div className="rounded-md border bg-card p-5 space-y-3">
            <h2 className="text-sm font-semibold">Profile</h2>
            <dl className="space-y-2 text-sm">
              {customer.occupation && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Occupation</dt>
                  <dd>{customer.occupation}</dd>
                </div>
              )}
              {customer.leadSource && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Lead source</dt>
                  <dd>{customer.leadSource}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Reservations</dt>
                <dd className="tabular-nums">{customer.reservations.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Sales</dt>
                <dd className="tabular-nums">{customer.sales.length}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Created</dt>
                <dd>{formatDate(customer.createdAt)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Updated</dt>
                <dd>{formatDate(customer.updatedAt)}</dd>
              </div>
            </dl>
          </div>

        </div>

        {/* Notes */}
        {customer.notes && (
          <div className="rounded-md border bg-card p-5 space-y-2">
            <h2 className="text-sm font-semibold">Notes</h2>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{customer.notes}</p>
          </div>
        )}

      </div>
    </div>
  );
}
