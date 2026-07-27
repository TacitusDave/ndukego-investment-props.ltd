import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PropertyStatusBadge } from "./property-status-badge";
import { PropertyFilters } from "./property-filters";

interface Property {
  id: string;
  title: string;
  reference: string;
  status: string;
  category: string;
  propertyType: string;
  state: string;
  city: string;
  sellingPrice: number | null;
  rentalPrice: number | null;
  bedroomCount: number | null;
  bathroomCount: number | null;
  estate?: { name: string } | null;
  createdAt: string;
}

interface PropertiesResponse {
  items: Property[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const status = params.status ?? "";
  const category = params.category ?? "";
  const search = params.search ?? "";

  const queryParts: string[] = [`page=${page}`, "limit=25"];
  if (status) queryParts.push(`status=${status}`);
  if (category) queryParts.push(`category=${category}`);
  if (search) queryParts.push(`search=${encodeURIComponent(search)}`);

  const { data, error } = await apiFetch<PropertiesResponse>(
    `/properties?${queryParts.join("&")}`,
  );

  return (
    <div className="flex flex-col h-full">
      <Header title="Properties">
        <Button asChild size="sm">
          <Link href="/properties/new">
            <Plus className="mr-1 h-4 w-4" />
            Add property
          </Link>
        </Button>
      </Header>

      <div className="flex-1 p-6 space-y-4">
        <PropertyFilters currentStatus={status} currentCategory={category} currentSearch={search} />

        {error && (
          <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load properties: {error}
          </div>
        )}

        {!error && data && (
          <>
            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Estate</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                        No properties found.{" "}
                        <Link href="/properties/new" className="underline">
                          Add the first one
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                  {data.items.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {property.reference}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/properties/${property.id}`}
                          className="font-medium hover:underline"
                        >
                          {property.title}
                        </Link>
                        {property.bedroomCount != null && (
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {property.bedroomCount} bed · {property.bathroomCount} bath
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <PropertyStatusBadge status={property.status} />
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground capitalize">
                        {property.category.replace(/_/g, " ").toLowerCase()}
                      </TableCell>
                      <TableCell className="text-sm">
                        {property.city}, {property.state}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {property.estate?.name ?? "—"}
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">
                        {property.sellingPrice
                          ? formatCurrency(property.sellingPrice)
                          : property.rentalPrice
                            ? `${formatCurrency(property.rentalPrice)}/yr`
                            : "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatDate(property.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {data.meta.totalPages > 1 && (
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Showing {(data.meta.page - 1) * data.meta.limit + 1}–
                  {Math.min(data.meta.page * data.meta.limit, data.meta.total)} of{" "}
                  {data.meta.total} properties
                </span>
                <div className="flex gap-2">
                  {data.meta.page > 1 && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/properties?page=${data.meta.page - 1}${status ? `&status=${status}` : ""}${category ? `&category=${category}` : ""}`}
                      >
                        Previous
                      </Link>
                    </Button>
                  )}
                  {data.meta.page < data.meta.totalPages && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/properties?page=${data.meta.page + 1}${status ? `&status=${status}` : ""}${category ? `&category=${category}` : ""}`}
                      >
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
