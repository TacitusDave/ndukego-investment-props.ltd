"use client";

import { useRouter, usePathname } from "next/navigation";

const STATUSES = ["SCHEDULED", "IN_PROGRESS", "COMPLETED", "FAILED", "CANCELLED"];
const TYPES    = ["INITIAL", "FOLLOW_UP", "PRE_SALE", "POST_SALE", "MAINTENANCE", "COMPLIANCE"];

function fmtLabel(s: string) {
  return s.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

interface Props {
  currentStatus: string;
  currentType:   string;
  currentSearch: string;
}

export function InspectionFilters({ currentStatus, currentType, currentSearch }: Props) {
  const router   = useRouter();
  const pathname = usePathname();

  function applyFilters(updates: Record<string, string>) {
    const params = new URLSearchParams();
    const merged = { search: currentSearch, status: currentStatus, type: currentType, ...updates };
    Object.entries(merged).forEach(([k, v]) => { if (v) params.set(k, v); });
    router.push(`${pathname}?${params.toString()}`);
  }

  const hasFilter = currentStatus || currentType || currentSearch;

  const selectCls =
    "h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <input
        type="search"
        placeholder="Search inspections…"
        defaultValue={currentSearch}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring w-56"
        onKeyDown={(e) => {
          if (e.key === "Enter") applyFilters({ search: (e.target as HTMLInputElement).value, page: "" });
        }}
        onBlur={(e) => {
          if (e.target.value !== currentSearch) applyFilters({ search: e.target.value, page: "" });
        }}
      />

      <select
        value={currentStatus}
        onChange={(e) => applyFilters({ status: e.target.value, page: "" })}
        className={selectCls}
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>{fmtLabel(s)}</option>
        ))}
      </select>

      <select
        value={currentType}
        onChange={(e) => applyFilters({ type: e.target.value, page: "" })}
        className={selectCls}
      >
        <option value="">All types</option>
        {TYPES.map((t) => (
          <option key={t} value={t}>{fmtLabel(t)}</option>
        ))}
      </select>

      {hasFilter && (
        <button
          onClick={() => router.push(pathname)}
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
