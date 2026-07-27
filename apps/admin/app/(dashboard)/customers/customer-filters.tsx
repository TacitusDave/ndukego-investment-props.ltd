"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition, useState, useCallback } from "react";

const STATUSES = [
  { value: "PROSPECT", label: "Prospect" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "BLACKLISTED", label: "Blacklisted" },
];

const TYPES = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "CORPORATE", label: "Corporate" },
  { value: "INVESTOR", label: "Investor" },
  { value: "AGENT", label: "Agent" },
];

export function CustomerFilters({
  currentStatus,
  currentType,
  currentSearch,
}: {
  currentStatus: string;
  currentType: string;
  currentSearch: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearch);

  const applyFilters = useCallback(
    (updates: { status?: string; type?: string; search?: string }) => {
      const params = new URLSearchParams();
      const s = updates.status !== undefined ? updates.status : currentStatus;
      const t = updates.type !== undefined ? updates.type : currentType;
      const q = updates.search !== undefined ? updates.search : currentSearch;
      if (s) params.set("status", s);
      if (t) params.set("type", t);
      if (q) params.set("search", q);
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [currentStatus, currentType, currentSearch, pathname, router],
  );

  const hasFilters = currentStatus || currentType || currentSearch;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search name, email, phone…"
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") applyFilters({ search }); }}
          onBlur={() => { if (search !== currentSearch) applyFilters({ search }); }}
        />
      </div>

      <select
        value={currentStatus || ""}
        onChange={(e) => applyFilters({ status: e.target.value })}
        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>

      <select
        value={currentType || ""}
        onChange={(e) => applyFilters({ type: e.target.value })}
        className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <option value="">All types</option>
        {TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
      </select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={() => { setSearch(""); applyFilters({ status: "", type: "", search: "" }); }}>
          <X className="mr-1 h-4 w-4" />Clear
        </Button>
      )}
    </div>
  );
}
