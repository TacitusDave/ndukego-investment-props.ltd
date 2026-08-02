import React from "react";
import Link from "next/link";
import { Building2, Home, Users, TrendingUp, CalendarCheck, Receipt, MessageSquare } from "lucide-react";
import { Header } from "@/components/layout/header";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PropertyStatusBadge } from "../properties/property-status-badge";

interface Stats {
  properties: { total: number; byStatus: Record<string, number> };
  estates: { total: number; byStatus: Record<string, number> };
  customers: { total: number; byStatus: Record<string, number> };
  reservations: { total: number; byStatus: Record<string, number> };
  sales: { total: number; byStatus: Record<string, number> };
  inquiries: { total: number; newCount: number };
  recentProperties: {
    id: string;
    internalNumber: string;
    title: string;
    status: string;
    listingPrice: string | null;
    state: string;
    city: string | null;
    createdAt: string;
    estate: { name: string } | null;
  }[];
  recentActivity: {
    id: string;
    actorEmail: string | null;
    action: string;
    entityType: string | null;
    entityLabel: string | null;
    createdAt: string;
  }[];
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  href,
}: {
  label: string;
  value: number;
  sub?: string;
  icon: React.ElementType;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-md border bg-card p-5 hover:bg-accent/40 transition-colors block"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <p className="text-3xl font-bold tabular-nums">{value.toLocaleString()}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </Link>
  );
}

const ACTION_LABELS: Record<string, string> = {
  CREATE: "Created",
  UPDATE: "Updated",
  DELETE: "Deleted",
  STATUS_CHANGE: "Status changed",
  LOGIN: "Logged in",
  LOGOUT: "Logged out",
  PUBLISH: "Published",
  APPROVE: "Approved",
  REJECT: "Rejected",
  ARCHIVE: "Archived",
};

export default async function DashboardPage() {
  const { data: stats } = await apiFetch<Stats>("/dashboard/stats");

  const published = stats?.properties?.byStatus?.["PUBLISHED"] ?? 0;
  const draft = stats?.properties?.byStatus?.["DRAFT"] ?? 0;
  const pendingCount =
    (stats?.properties?.byStatus?.["PENDING_INSPECTION"] ?? 0) +
    (stats?.properties?.byStatus?.["PENDING_VERIFICATION"] ?? 0);

  // Normalise nested objects so downstream code never hits undefined.total etc.
  const propStats   = stats?.properties   ?? { total: 0, byStatus: {} };
  const estateStats = stats?.estates      ?? { total: 0, byStatus: {} };
  const custStats   = stats?.customers    ?? { total: 0, byStatus: {} };
  const resStats    = stats?.reservations ?? { total: 0, byStatus: {} };
  const saleStats   = stats?.sales        ?? { total: 0, byStatus: {} };
  const iqStats     = stats?.inquiries    ?? { total: 0, newCount: 0 };

  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" />

      <div className="flex-1 p-6 space-y-6">

        {/* Stat tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total properties"
            value={propStats.total}
            sub={`${published} published · ${draft} draft`}
            icon={Home}
            href="/properties"
          />
          <StatCard
            label="Estates"
            value={estateStats.total}
            sub={`${estateStats.byStatus["ACTIVE"] ?? 0} active`}
            icon={Building2}
            href="/estates"
          />
          <StatCard
            label="Customers"
            value={custStats.total}
            sub={`${custStats.byStatus["ACTIVE"] ?? 0} active`}
            icon={Users}
            href="/customers"
          />
          <StatCard
            label="Reservations"
            value={resStats.total}
            sub={`${resStats.byStatus["PENDING"] ?? 0} pending`}
            icon={CalendarCheck}
            href="/reservations"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Sales"
            value={saleStats.total}
            sub={`${saleStats.byStatus["ACTIVE"] ?? 0} active · ${saleStats.byStatus["COMPLETED"] ?? 0} completed`}
            icon={Receipt}
            href="/sales"
          />
          <StatCard
            label="New inquiries"
            value={iqStats.newCount}
            sub={`${iqStats.total} total received`}
            icon={MessageSquare}
            href="/inquiries"
          />
          <StatCard
            label="Published"
            value={published}
            sub={`${pendingCount} pending review`}
            icon={TrendingUp}
            href="/properties?status=PUBLISHED"
          />
          <StatCard
            label="Pending approval"
            value={pendingCount}
            sub="Properties awaiting review"
            icon={Home}
            href="/properties?status=PENDING_INSPECTION"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Recent properties */}
          <div className="lg:col-span-2 rounded-md border bg-card">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-sm font-semibold">Recent properties</h2>
              <Link href="/properties" className="text-xs text-muted-foreground hover:text-foreground">
                View all →
              </Link>
            </div>
            <ul className="divide-y">
              {!stats || stats.recentProperties.length === 0 ? (
                <li className="px-5 py-8 text-center text-sm text-muted-foreground">
                  No properties yet.{" "}
                  <Link href="/properties/new" className="underline">Add one</Link>
                </li>
              ) : stats.recentProperties.map((p) => (
                <li key={p.id} className="flex items-center justify-between px-5 py-3 gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/properties/${p.id}`}
                      className="text-sm font-medium hover:underline truncate block"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {p.city ? `${p.city}, ` : ""}{p.state}
                      {p.estate ? ` · ${p.estate.name}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <PropertyStatusBadge status={p.status} />
                    {p.listingPrice && (
                      <span className="text-sm font-medium tabular-nums hidden sm:block">
                        {formatCurrency(Number(p.listingPrice))}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="space-y-4">

            {/* Property status breakdown */}
            <div className="rounded-md border bg-card p-5 space-y-3">
              <h2 className="text-sm font-semibold">Properties by status</h2>
              {stats && Object.entries(stats.properties.byStatus).length > 0 ? (
                <ul className="space-y-2">
                  {Object.entries(stats.properties.byStatus)
                    .sort((a, b) => b[1] - a[1])
                    .map(([status, count]) => (
                      <li key={status} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground capitalize">
                          {status.replace(/_/g, " ").toLowerCase()}
                        </span>
                        <span className="font-medium tabular-nums">{count}</span>
                      </li>
                    ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">No data yet.</p>
              )}
            </div>

            {/* Recent activity */}
            <div className="rounded-md border bg-card p-5 space-y-3">
              <h2 className="text-sm font-semibold">Recent activity</h2>
              {stats && stats.recentActivity.length > 0 ? (
                <ul className="space-y-2.5">
                  {stats.recentActivity.map((a) => (
                    <li key={a.id} className="text-xs">
                      <p className="text-foreground">
                        <span className="font-medium">{ACTION_LABELS[a.action] ?? a.action}</span>
                        {a.entityLabel ? ` · ${a.entityLabel}` : ""}
                      </p>
                      <p className="text-muted-foreground mt-0.5">
                        {a.actorEmail ?? "System"} · {formatDate(a.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-muted-foreground">No activity yet.</p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
