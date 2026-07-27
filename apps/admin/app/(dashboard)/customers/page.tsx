import Link from "next/link";
import { Plus } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomerFilters } from "./customer-filters";

interface Customer {
  id: string;
  customerNumber: string;
  type: string;
  status: string;
  kycStatus: string;
  firstName: string | null;
  lastName: string | null;
  companyName: string | null;
  email: string;
  phone: string;
  city: string | null;
  state: string | null;
  leadSource: string | null;
  createdAt: string;
  _count: { reservations: number; sales: number };
}

interface CustomersResponse {
  items: Customer[];
  meta: { page: number; limit: number; total: number; totalPages: number };
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

function customerName(c: Customer) {
  if (c.firstName || c.lastName) return `${c.firstName ?? ""} ${c.lastName ?? ""}`.trim();
  return c.companyName ?? c.email;
}

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function CustomersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const status = params.status ?? "";
  const type = params.type ?? "";
  const search = params.search ?? "";

  const queryParts = [`page=${page}`, "limit=25"];
  if (status) queryParts.push(`status=${status}`);
  if (type) queryParts.push(`type=${type}`);
  if (search) queryParts.push(`search=${encodeURIComponent(search)}`);

  const { data, error } = await apiFetch<CustomersResponse>(`/customers?${queryParts.join("&")}`);

  return (
    <div className="flex flex-col h-full">
      <Header title="Customers">
        <Button asChild size="sm">
          <Link href="/customers/new">
            <Plus className="mr-1 h-4 w-4" />
            Add customer
          </Link>
        </Button>
      </Header>

      <div className="flex-1 p-6 space-y-4">
        <CustomerFilters currentStatus={status} currentType={type} currentSearch={search} />

        {error && (
          <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load customers: {error}
          </div>
        )}

        {!error && data && (
          <>
            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ref</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>KYC</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Activity</TableHead>
                    <TableHead>Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                        No customers found.{" "}
                        <Link href="/customers/new" className="underline">Add the first one</Link>
                      </TableCell>
                    </TableRow>
                  )}
                  {data.items.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {c.customerNumber}
                      </TableCell>
                      <TableCell>
                        <Link href={`/customers/${c.id}`} className="font-medium hover:underline">
                          {customerName(c)}
                        </Link>
                        {c.leadSource && (
                          <div className="text-xs text-muted-foreground mt-0.5">via {c.leadSource}</div>
                        )}
                      </TableCell>
                      <TableCell className="text-sm capitalize">
                        {c.type.toLowerCase()}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[c.status] ?? "bg-slate-100 text-slate-700"}`}>
                          {c.status.toLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${KYC_STYLES[c.kycStatus] ?? "bg-slate-100 text-slate-600"}`}>
                          {c.kycStatus.replace(/_/g, " ").toLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div>{c.email}</div>
                        <div className="text-muted-foreground">{c.phone}</div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {c.city ? `${c.city}, ` : ""}{c.state ?? "—"}
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground tabular-nums">
                        {c._count.reservations}R · {c._count.sales}S
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(c.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {data.meta.totalPages > 1 && (
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  {(data.meta.page - 1) * data.meta.limit + 1}–
                  {Math.min(data.meta.page * data.meta.limit, data.meta.total)} of {data.meta.total}
                </span>
                <div className="flex gap-2">
                  {data.meta.page > 1 && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/customers?page=${data.meta.page - 1}${status ? `&status=${status}` : ""}${type ? `&type=${type}` : ""}`}>
                        Previous
                      </Link>
                    </Button>
                  )}
                  {data.meta.page < data.meta.totalPages && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/customers?page=${data.meta.page + 1}${status ? `&status=${status}` : ""}${type ? `&type=${type}` : ""}`}>
                        Next
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
