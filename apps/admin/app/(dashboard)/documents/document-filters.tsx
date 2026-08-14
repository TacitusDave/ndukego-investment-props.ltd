"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition, useState, useCallback } from "react";

const SELECT_CLASS =
  "flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const CATEGORIES = [
  { value: "PROPERTY", label: "Property" },
  { value: "ESTATE", label: "Estate" },
  { value: "CUSTOMER", label: "Customer" },
  { value: "SALES", label: "Sales" },
  { value: "FINANCE", label: "Finance" },
  { value: "EMPLOYEE", label: "Employee" },
  { value: "LEGAL", label: "Legal" },
  { value: "INSPECTION", label: "Inspection" },
  { value: "OTHER", label: "Other" },
];

const STATUSES = [
  { value: "UPLOADED", label: "Uploaded" },
  { value: "VERIFIED", label: "Verified" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
  { value: "PUBLISHED", label: "Published" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "EXPIRED", label: "Expired" },
];

const ENTITY_TYPES = [
  { value: "PROPERTY", label: "Property" },
  { value: "ESTATE", label: "Estate" },
  { value: "CUSTOMER", label: "Customer" },
  { value: "SALE", label: "Sale" },
  { value: "RESERVATION", label: "Reservation" },
];

interface Props {
  currentCategory: string;
  currentStatus: string;
  currentEntityType: string;
  currentSearch: string;
}

export function DocumentFilters({
  currentCategory,
  currentStatus,
  currentEntityType,
  currentSearch,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearch);

  const applyFilters = useCallback(
    (updates: { category?: string; status?: string; entityType?: string; search?: string }) => {
      const params = new URLSearchParams();
      const c = updates.category !== undefined ? updates.category : currentCategory;
      const s = updates.status !== undefined ? updates.status : currentStatus;
      const e = updates.entityType !== undefined ? updates.entityType : currentEntityType;
      const q = updates.search !== undefined ? updates.search : currentSearch;
      if (c) params.set("category", c);
      if (s) params.set("status", s);
      if (e) params.set("entityType", e);
      if (q) params.set("search", q);
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [currentCategory, currentStatus, currentEntityType, currentSearch, pathname, router],
  );

  const hasFilters = currentCategory || currentStatus || currentEntityType || currentSearch;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search title, ref, number…"
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") applyFilters({ search }); }}
          onBlur={() => { if (search !== currentSearch) applyFilters({ search }); }}
        />
      </div>

      <select
        value={currentCategory}
        onChange={(e) => applyFilters({ category: e.target.value })}
        className={SELECT_CLASS}
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      <select
        value={currentStatus}
        onChange={(e) => applyFilters({ status: e.target.value })}
        className={SELECT_CLASS}
      >
        <option value="">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      <select
        value={currentEntityType}
        onChange={(e) => applyFilters({ entityType: e.target.value })}
        className={SELECT_CLASS}
      >
        <option value="">All entities</option>
        {ENTITY_TYPES.map((e) => (
          <option key={e.value} value={e.value}>{e.label}</option>
        ))}
      </select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSearch("");
            applyFilters({ category: "", status: "", entityType: "", search: "" });
          }}
        >
          <X className="mr-1 h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
