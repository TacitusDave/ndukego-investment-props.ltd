import Link from "next/link";
import { UserCog, Search, Plus } from "lucide-react";
import { getSession } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

interface Department { id: string; name: string }
interface Role { id: string; name: string; code: string }
interface Employee {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  jobTitle: string;
  status: string;
  hireDate: string;
  department: Department | null;
  roles: { role: Role }[];
}
interface PageResponse {
  items: Employee[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

const STATUS_BADGE: Record<string, string> = {
  ACTIVE:     "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/40 dark:text-green-400 dark:border-green-900",
  INACTIVE:   "bg-gray-100 text-gray-600 border-gray-200 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700",
  ON_LEAVE:   "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-400 dark:border-yellow-900",
  TERMINATED: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-400 dark:border-red-900",
};

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function EmployeesPage({ searchParams }: PageProps) {
  const session = await getSession();
  const params = await searchParams;
  const search = params.search ?? "";
  const status = params.status ?? "";
  const page = params.page ?? "1";

  const query = new URLSearchParams({ page, limit: "20" });
  if (search) query.set("search", search);
  if (status) query.set("status", status);

  let data: PageResponse | null = null;
  try {
    const res = await fetch(`${API_BASE}/employees?${query}`, {
      headers: { Authorization: `Bearer ${session?.token ?? ""}` },
      cache: "no-store",
    });
    if (res.ok) data = await res.json();
  } catch { /* pass */ }

  const items = data?.items ?? [];
  const meta = data?.meta;

  const STATUSES = [
    { value: "", label: "All statuses" },
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
    { value: "ON_LEAVE", label: "On Leave" },
    { value: "TERMINATED", label: "Terminated" },
  ];

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Employees</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {meta ? `${meta.total} staff members` : "Manage staff accounts and roles"}
          </p>
        </div>
        <Link
          href="/employees/new"
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add employee
        </Link>
      </div>

      <form className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search by name, email, job title…"
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
          <Link href="/employees" className="h-9 flex items-center rounded-md px-3 text-sm text-muted-foreground hover:text-foreground">
            Clear
          </Link>
        )}
      </form>

      <div className="rounded-xl border bg-card overflow-hidden">
        {items.length === 0 ? (
          <div className="p-16 text-center">
            <UserCog className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-medium text-muted-foreground">No employees found</p>
            <Link href="/employees/new" className="mt-3 inline-block text-sm text-primary hover:underline">
              Add your first employee →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Employee</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Job Title</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Department</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Roles</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3">Hired</th>
                  <th className="text-left font-medium text-muted-foreground px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((emp) => {
                  const badge = STATUS_BADGE[emp.status] ?? "bg-gray-100 text-gray-600 border-gray-200";
                  return (
                    <tr key={emp.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium">{emp.firstName} {emp.lastName}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                        <p className="text-xs font-mono text-muted-foreground">{emp.employeeNumber}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">{emp.jobTitle}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">
                        {emp.department?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {emp.roles.length === 0
                            ? <span className="text-xs text-muted-foreground">No roles</span>
                            : emp.roles.map(({ role }) => (
                              <span key={role.id} className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                                {role.name}
                              </span>
                            ))
                          }
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge}`}>
                          {emp.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{formatDate(emp.hireDate)}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/employees/${emp.id}`}
                          className="rounded-md bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/70 transition-colors"
                        >
                          View
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

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {meta.page > 1 && (
            <Link
              href={`/employees?page=${meta.page - 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-muted-foreground">Page {meta.page} of {meta.totalPages}</span>
          {meta.page < meta.totalPages && (
            <Link
              href={`/employees?page=${meta.page + 1}${status ? `&status=${status}` : ""}${search ? `&search=${search}` : ""}`}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
