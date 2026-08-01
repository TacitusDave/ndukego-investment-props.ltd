import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { apiFetch } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import {
  Home, Building2, Users, TrendingUp, FileText, BarChart3,
  MapPin, Calendar, CheckCircle, Clock, XCircle, Archive,
} from "lucide-react";

interface Stats {
  properties: { total: number; byStatus: Record<string, number> };
  estates: { total: number; byStatus: Record<string, number> };
  customers: { total: number; byStatus: Record<string, number> };
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
}

const STATUS_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  DRAFT:               { label: "Draft",              icon: FileText,    color: "text-zinc-400" },
  PENDING_INSPECTION:  { label: "Pending Inspection", icon: Clock,       color: "text-yellow-400" },
  PENDING_VERIFICATION:{ label: "Pending Verification",icon: Clock,      color: "text-yellow-400" },
  APPROVED:            { label: "Approved",            icon: CheckCircle, color: "text-blue-400" },
  PUBLISHED:           { label: "Published",           icon: TrendingUp,  color: "text-green-400" },
  RESERVED:            { label: "Reserved",            icon: Calendar,    color: "text-purple-400" },
  SOLD:                { label: "Sold",                icon: CheckCircle, color: "text-emerald-400" },
  ARCHIVED:            { label: "Archived",            icon: Archive,     color: "text-zinc-500" },
  REJECTED:            { label: "Rejected",            icon: XCircle,     color: "text-red-400" },
};

function StatTile({
  label,
  value,
  icon: Icon,
  sub,
  accent = false,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border bg-card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
          <p className={`text-3xl font-bold tabular-nums ${accent ? "text-secondary" : "text-foreground"}`}>
            {value}
          </p>
          {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
          <Icon className="h-4 w-4 text-secondary" />
        </div>
      </div>
    </div>
  );
}

function BarRow({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums text-foreground">
          {count} <span className="text-muted-foreground font-normal">({pct}%)</span>
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default async function ReportsPage() {
  const { data: stats } = await apiFetch<Stats>("/dashboard/stats");

  const propTotal = stats?.properties.total ?? 0;
  const propByStatus = stats?.properties.byStatus ?? {};
  const estateTotal = stats?.estates.total ?? 0;
  const customerTotal = stats?.customers.total ?? 0;

  const published  = propByStatus["PUBLISHED"] ?? 0;
  const reserved   = propByStatus["RESERVED"]  ?? 0;
  const sold       = propByStatus["SOLD"]       ?? 0;
  const draft      = propByStatus["DRAFT"]      ?? 0;
  const rejected   = propByStatus["REJECTED"]   ?? 0;

  // Group properties by state for geographic breakdown
  const stateMap: Record<string, number> = {};
  for (const p of stats?.recentProperties ?? []) {
    stateMap[p.state] = (stateMap[p.state] ?? 0) + 1;
  }
  const topStates = Object.entries(stateMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Compute total listing value from recent properties
  const recentTotalValue = stats?.recentProperties.reduce(
    (sum, p) => sum + (p.listingPrice ? Number(p.listingPrice) : 0),
    0,
  ) ?? 0;

  return (
    <div className="flex flex-col h-full">
      <Header title="Reports" />

      <div className="flex-1 overflow-auto p-6 space-y-6">

        {/* Key metrics */}
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatTile label="Total Properties" value={propTotal} icon={Home} sub={`${published} published`} />
            <StatTile label="Total Estates" value={estateTotal} icon={Building2} sub={`${stats?.estates.byStatus["ACTIVE"] ?? 0} active`} />
            <StatTile label="Customers" value={customerTotal} icon={Users} sub={`${stats?.customers.byStatus["ACTIVE"] ?? 0} active`} />
            <StatTile label="Sold Properties" value={sold} icon={TrendingUp} accent sub="All time" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Property pipeline */}
          <div className="rounded-lg border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Property pipeline</h2>
              <Link href="/properties" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                View all →
              </Link>
            </div>
            {propTotal > 0 ? (
              <div className="space-y-3">
                {Object.entries(propByStatus)
                  .sort((a, b) => b[1] - a[1])
                  .map(([status, count]) => {
                    const meta = STATUS_META[status];
                    const barColor =
                      status === "PUBLISHED" ? "bg-green-500" :
                      status === "RESERVED"  ? "bg-purple-500" :
                      status === "SOLD"      ? "bg-emerald-500" :
                      status === "DRAFT"     ? "bg-zinc-500" :
                      status === "REJECTED"  ? "bg-red-500" :
                      status === "ARCHIVED"  ? "bg-zinc-600" :
                      "bg-yellow-500";
                    return (
                      <BarRow
                        key={status}
                        label={meta?.label ?? status.replace(/_/g, " ")}
                        count={count}
                        total={propTotal}
                        color={barColor}
                      />
                    );
                  })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No properties yet.</p>
            )}
          </div>

          {/* Estate status */}
          <div className="rounded-lg border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">Estate status</h2>
              <Link href="/estates" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                View all →
              </Link>
            </div>
            {estateTotal > 0 ? (
              <div className="space-y-3">
                {Object.entries(stats?.estates.byStatus ?? {})
                  .sort((a, b) => b[1] - a[1])
                  .map(([status, count]) => {
                    const barColor =
                      status === "ACTIVE"   ? "bg-green-500" :
                      status === "SOLD_OUT" ? "bg-emerald-500" :
                      status === "DRAFT"    ? "bg-zinc-500" :
                      "bg-yellow-500";
                    return (
                      <BarRow
                        key={status}
                        label={status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                        count={count}
                        total={estateTotal}
                        color={barColor}
                      />
                    );
                  })}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No estates yet.</p>
            )}
          </div>

          {/* Quick stats grid */}
          <div className="rounded-lg border bg-card p-5 space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Conversion snapshot</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Published", value: published, icon: TrendingUp, color: "text-green-400" },
                { label: "Reserved",  value: reserved,  icon: Calendar,   color: "text-purple-400" },
                { label: "Sold",      value: sold,      icon: CheckCircle,color: "text-emerald-400" },
                { label: "Rejected",  value: rejected,  icon: XCircle,    color: "text-red-400" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center gap-3 rounded-lg border border-border p-3">
                  <Icon className={`h-5 w-5 ${color} shrink-0`} />
                  <div>
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-xl font-bold tabular-nums text-foreground">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Geographic breakdown */}
          <div className="rounded-lg border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-secondary shrink-0" />
              <h2 className="text-sm font-semibold text-foreground">Geographic spread (recent listings)</h2>
            </div>
            {topStates.length > 0 ? (
              <div className="space-y-3">
                {topStates.map(([state, count]) => (
                  <BarRow
                    key={state}
                    label={state}
                    count={count}
                    total={stats?.recentProperties.length ?? 1}
                    color="bg-secondary"
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No data — add properties to see geographic breakdown.</p>
            )}
          </div>
        </div>

        {/* Recent listings value table */}
        <section className="rounded-lg border bg-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-secondary" />
              <h2 className="text-sm font-semibold text-foreground">Recent listings</h2>
            </div>
            {recentTotalValue > 0 && (
              <span className="text-xs text-muted-foreground">
                Total value: <span className="font-semibold text-foreground">{formatCurrency(recentTotalValue)}</span>
              </span>
            )}
          </div>

          {(stats?.recentProperties.length ?? 0) > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Property</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Location</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                    <th className="px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {stats!.recentProperties.map((p) => {
                    const meta = STATUS_META[p.status];
                    const Icon = meta?.icon ?? FileText;
                    return (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-3">
                          <Link href={`/properties/${p.id}`} className="font-medium hover:underline text-foreground truncate max-w-xs block">
                            {p.title}
                          </Link>
                          <span className="text-xs text-muted-foreground">{p.internalNumber}</span>
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">
                          {p.city ? `${p.city}, ` : ""}{p.state}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`flex items-center gap-1.5 text-xs font-medium ${meta?.color ?? "text-muted-foreground"}`}>
                            <Icon className="h-3.5 w-3.5 shrink-0" />
                            {meta?.label ?? p.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right font-medium tabular-nums text-foreground">
                          {p.listingPrice ? formatCurrency(Number(p.listingPrice)) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              No properties yet.{" "}
              <Link href="/properties/new" className="text-secondary hover:underline">Add your first listing →</Link>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
