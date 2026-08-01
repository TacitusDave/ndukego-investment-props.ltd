import Link from "next/link";
import { MessageSquare, Search, Building2 } from "lucide-react";
import { getSession } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

interface Inquiry {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string;
  message: string | null;
  propertyTitle: string | null;
  status: string;
  createdAt: string;
}

interface PageResponse {
  items: Inquiry[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

const STATUS_BADGE: Record<string, string> = {
  NEW:         "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  CONTACTED:   "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  CONVERTED:   "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  CLOSED:      "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

export default async function InquiriesPage({ searchParams }: PageProps) {
  const session = await getSession();
  const params = await searchParams;
  const search = params.search ?? "";
  const page = params.page ?? "1";

  const query = new URLSearchParams({ page, limit: "20" });
  if (search) query.set("search", search);

  let data: PageResponse | null = null;
  try {
    const res = await fetch(`${API_BASE}/properties/admin/inquiries?${query}`, {
      headers: { Authorization: `Bearer ${session?.token ?? ""}` },
      cache: "no-store",
    });
    if (res.ok) data = await res.json();
  } catch { /* pass */ }

  const items = data?.items ?? [];
  const meta = data?.meta;

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Inquiries</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {meta ? `${meta.total} inquiry${meta.total === 1 ? "" : "s"} from the website` : "Leads from the public website inquiry form"}
          </p>
        </div>
        <MessageSquare className="h-5 w-5 text-muted-foreground" />
      </div>

      <form className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by name, email, property…"
            className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <button
          type="submit"
          className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Search
        </button>
        {search && (
          <Link href="/inquiries" className="h-9 flex items-center rounded-md px-3 text-sm text-muted-foreground hover:text-foreground">
            Clear
          </Link>
        )}
      </form>

      <div className="rounded-xl border bg-card overflow-hidden">
        {items.length === 0 ? (
          <div className="p-16 text-center">
            <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-medium text-muted-foreground">No inquiries yet</p>
            <p className="text-sm text-muted-foreground mt-1">Inquiries submitted through the website will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Contact</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Property Enquired</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Message</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((inquiry) => {
                  const name = [inquiry.firstName, inquiry.lastName].filter(Boolean).join(" ") || "—";
                  const badge = STATUS_BADGE[inquiry.status] ?? "bg-zinc-100 text-zinc-500";
                  return (
                    <tr key={inquiry.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{inquiry.email}</p>
                        <p className="text-xs text-muted-foreground">{inquiry.phone}</p>
                      </td>
                      <td className="px-4 py-3">
                        {inquiry.propertyTitle ? (
                          <div className="flex items-center gap-1.5 text-sm">
                            <Building2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate max-w-[180px]">{inquiry.propertyTitle}</span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">General inquiry</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-muted-foreground max-w-xs truncate">
                          {inquiry.message ?? "—"}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${badge}`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(inquiry.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {meta.page > 1 && (
            <Link href={`/inquiries?page=${meta.page - 1}${search ? `&search=${search}` : ""}`}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">Previous</Link>
          )}
          <span className="text-sm text-muted-foreground">Page {meta.page} of {meta.totalPages}</span>
          {meta.page < meta.totalPages && (
            <Link href={`/inquiries?page=${meta.page + 1}${search ? `&search=${search}` : ""}`}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted">Next</Link>
          )}
        </div>
      )}
    </div>
  );
}
