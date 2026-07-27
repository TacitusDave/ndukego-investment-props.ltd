"use client";

import { useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransition, useState, useCallback } from "react";

const STATUSES = [
  { value: "DRAFT", label: "Draft" },
  { value: "PENDING_INSPECTION", label: "Pending inspection" },
  { value: "PENDING_VERIFICATION", label: "Pending verification" },
  { value: "APPROVED", label: "Approved" },
  { value: "PUBLISHED", label: "Published" },
  { value: "RESERVED", label: "Reserved" },
  { value: "UNDER_NEGOTIATION", label: "Under negotiation" },
  { value: "UNDER_CONTRACT", label: "Under contract" },
  { value: "SOLD", label: "Sold" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "REJECTED", label: "Rejected" },
];

const CATEGORIES = [
  { value: "LAND", label: "Land" },
  { value: "HOUSE", label: "House" },
  { value: "DUPLEX", label: "Duplex" },
  { value: "BUNGALOW", label: "Bungalow" },
  { value: "APARTMENT", label: "Apartment" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "WAREHOUSE", label: "Warehouse" },
  { value: "OFFICE", label: "Office" },
  { value: "SHOP", label: "Shop" },
  { value: "HOTEL", label: "Hotel" },
  { value: "ESTATE_PLOT", label: "Estate Plot" },
  { value: "FARM_LAND", label: "Farm Land" },
  { value: "MIXED_USE", label: "Mixed Use" },
  { value: "INDUSTRIAL", label: "Industrial" },
  { value: "LUXURY_HOME", label: "Luxury Home" },
  { value: "PROJECT_DEVELOPMENT", label: "Project Development" },
];

interface PropertyFiltersProps {
  currentStatus: string;
  currentCategory: string;
  currentSearch: string;
}

export function PropertyFilters({ currentStatus, currentCategory, currentSearch }: PropertyFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState(currentSearch);

  const applyFilters = useCallback(
    (updates: { status?: string; category?: string; search?: string }) => {
      const params = new URLSearchParams();
      const s = updates.status !== undefined ? updates.status : currentStatus;
      const c = updates.category !== undefined ? updates.category : currentCategory;
      const q = updates.search !== undefined ? updates.search : currentSearch;
      if (s) params.set("status", s);
      if (c) params.set("category", c);
      if (q) params.set("search", q);
      startTransition(() => router.push(`${pathname}?${params.toString()}`));
    },
    [currentStatus, currentCategory, currentSearch, pathname, router],
  );

  const hasFilters = currentStatus || currentCategory || currentSearch;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search title, ref…"
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") applyFilters({ search }); }}
          onBlur={() => { if (search !== currentSearch) applyFilters({ search }); }}
        />
      </div>

      <Select value={currentStatus || "ALL"} onValueChange={(v) => applyFilters({ status: v === "ALL" ? "" : v })}>
        <SelectTrigger className="w-[190px]">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All statuses</SelectItem>
          {STATUSES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={currentCategory || "ALL"} onValueChange={(v) => applyFilters({ category: v === "ALL" ? "" : v })}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All categories</SelectItem>
          {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={() => { setSearch(""); applyFilters({ status: "", category: "", search: "" }); }}>
          <X className="mr-1 h-4 w-4" />Clear
        </Button>
      )}
    </div>
  );
}
