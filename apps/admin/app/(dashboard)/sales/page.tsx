import Link from "next/link";
import { Receipt, Search } from "lucide-react";
import { getSession } from "@/lib/auth";
import { formatDate, formatCurrency } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

interface Customer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string;
}

interface Property {
  id: string;
  title: string;
  state: string;
  city: string | null;
}

interface Sale {
  id: string;
  saleNumber: string;
  status: string;
  type: string;
  salePrice: string;
  finalPrice: string;
  totalPaid: string;
  balanceDue: string;
  currency: string;
  createdAt: string;
  customer: Customer;
  property: Property;
  reservation: { reservationNumber: string } | null;
}

interface SalesResponse {
  items: Sale[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

const STATUS_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  DRAFT:            { label: "Draft",            badgeClass: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700" },
  PENDING_APPROVAL: { label: "Pending Approval", badgeClass: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-900" },
  APPROVED:         { label: "Approved",         badgeClass: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/40 dark:text-blue-400 dark:border-blue-900" },
  ACTIVE:           { label: "Active",           badgeClass: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-400 dark:border-green-900" },
  DISPUTED:         { label: "Disputed",         badgeClass: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/40 dark:text-orange-400 dark:border-orange-900" },
  COMPLETED:        { label: "Completed",        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:border-emerald-900" },
  CANCELLED:        { label: "Cancelled",        badgeClass: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-900" },
};

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function SalesPage({ searchParams }: PageProps) {
  const session = await getSession();
  const params = await searchParams;
  const status = params.status ?? "";
  const search = params.search ?? "";
  const page = params.page ?? "1";

  const query = new URLSearchParams({ page, limit: "20" });
  if (status) query.set("status", status);
  if (search) query.set("search", search);

  let data: SalesResponse | null = null;
  try {
    const res = await fetch(`${API_BASE}/sales?${query.toString()}`, {
      headers: { Authorization: `Bearer ${session?.token ?? ""}` },
      cache: "no-store",
    });
    if (res.ok) data = await res.json();
  } catch { /* pass */ }

  const items = data?.items ?? [];
  const meta = data?.meta;

  const STATUSES = [
    { value: "", label: "All statuses" },
    { value: "DRAFT", label: "Draft" },
    { value: "PENDING_APPROVAL", label: "Pending Approval" },
    { value: "APPROVED", label: "Approved" },
    { value: "ACTIVE", label: "Active" },
    { value: "DISPUTED", label: "Disputed" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Sales</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {meta ? `${meta.total} total` : "Manage property sales"}
          </p>
        </div>
        <Receipt className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Filters */}
      <form className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by ref, name, email, property…"
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          name="status"
          defaultValue={status}
          className="h-9 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <button
          type="submit"
          className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Filter
        </button>
        {(search || status) && (
          <Link
            href="/sales"
            className="h-9 flex items-center rounded-md px-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </Link>
        )}
      </form>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        {items.length === 0 ? (
          <div className="p-16 text-center">
            <Receipt className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-medium text-muted-foreground">No sales found</p>
            {(search || status) && (
              <Link href="/sales" className="mt-2 inline-block text-sm text-primary hover:underline">
                Clear filters
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Sale #</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Property</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Customer</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Type</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Final Price</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Balance</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Date</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((sale) => {
                  const cfg = STATUS_CONFIG[sale.status] ?? { label: sale.status, badgeClass: "bg-gray-100 text-gray-600 border-gray-200" };
                  const customerName = [sale.customer.firstName, sale.customer.lastName].filter(Boolean).join(" ") || "—";
                  const balanceDue = Number(sale.balanceDue);
                  return (
                    <tr key={sale.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-muted-foreground">{sale.saleNumber}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-[180px]">
                          <p className="font-medium truncate">{sale.property.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {sale.property.city ? `${sale.property.city}, ` : ""}{sale.property.state}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{customerName}</p>
                        <p className="text-xs text-muted-foreground">{sale.customer.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground capitalize">{sale.type.toLowerCase()}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {formatCurrency(sale.finalPrice)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={balanceDue > 0 ? "font-medium text-amber-600 dark:text-amber-400" : "font-medium text-green-600 dark:text-green-400"}>
                          {balanceDue > 0 ? formatCurrency(sale.balanceDue) : "Paid"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.badgeClass}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs">{formatDate(sale.createdAt)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/sales/${sale.id}`}
                          className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {meta.page > 1 && (
            <Link
              href={`/sales?page=${meta.page - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-muted-foreground">
            Page {meta.page} of {meta.totalPages}
          </span>
          {meta.page < meta.totalPages && (
            <Link
              href={`/sales?page=${meta.page + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
