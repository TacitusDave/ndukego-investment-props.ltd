import Link from "next/link";
import { Upload } from "lucide-react";
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
import { DocumentFilters } from "./document-filters";

interface Document {
  id: string;
  documentNumber: string;
  title: string;
  category: string;
  documentType: string;
  entityType: string;
  status: string;
  securityClassification: string;
  fileSize: number;
  fileExtension: string;
  expirationDate: string | null;
  createdAt: string;
  tags: string[];
}

interface DocumentsResponse {
  items: Document[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

const STATUS_STYLES: Record<string, string> = {
  UPLOADED:  "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-400",
  SCANNING:  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  ASSIGNED:  "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  VERIFIED:  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400",
  APPROVED:  "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  REJECTED:  "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  PUBLISHED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  ARCHIVED:  "bg-zinc-100 text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-500",
  EXPIRED:   "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
};

const CATEGORY_LABEL: Record<string, string> = {
  PROPERTY: "Property",
  ESTATE: "Estate",
  CUSTOMER: "Customer",
  SALES: "Sales",
  FINANCE: "Finance",
  EMPLOYEE: "Employee",
  COMPANY: "Company",
  VENDOR: "Vendor",
  INSPECTION: "Inspection",
  LEGAL: "Legal",
  MARKETING: "Marketing",
  OTHER: "Other",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function DocumentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = params.page ?? "1";
  const search = params.search ?? "";
  const category = params.category ?? "";
  const status = params.status ?? "";
  const entityType = params.entityType ?? "";

  const queryParts = [`page=${page}`, "limit=25"];
  if (search) queryParts.push(`search=${encodeURIComponent(search)}`);
  if (category) queryParts.push(`category=${category}`);
  if (status) queryParts.push(`status=${status}`);
  if (entityType) queryParts.push(`entityType=${entityType}`);

  const { data, error } = await apiFetch<DocumentsResponse>(
    `/documents?${queryParts.join("&")}`,
  );

  return (
    <div className="flex flex-col h-full">
      <Header title="Documents">
        <Button asChild size="sm">
          <Link href="/documents/upload">
            <Upload className="mr-1 h-4 w-4" />
            Upload document
          </Link>
        </Button>
      </Header>

      <div className="flex-1 p-6 space-y-4">
        <DocumentFilters
          currentCategory={category}
          currentStatus={status}
          currentEntityType={entityType}
          currentSearch={search}
        />

        {error && (
          <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
            Failed to load documents: {error}
          </div>
        )}

        {!error && data && (
          <>
            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ref</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Uploaded</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="h-32 text-center text-muted-foreground"
                      >
                        No documents found.{" "}
                        <Link href="/documents/upload" className="underline">
                          Upload the first one
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                  {data.items.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {doc.documentNumber}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/documents/${doc.id}`}
                          className="font-medium hover:underline"
                        >
                          {doc.title}
                        </Link>
                        <div className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wide">
                          {doc.fileExtension}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {CATEGORY_LABEL[doc.category] ?? doc.category}
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {doc.documentType.replace(/_/g, " ").toLowerCase()}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {doc.entityType.replace(/_/g, " ").toLowerCase()}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[doc.status] ?? "bg-slate-100 text-slate-700"}`}
                        >
                          {doc.status.toLowerCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                        {formatBytes(doc.fileSize)}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {doc.expirationDate ? formatDate(doc.expirationDate) : "—"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(doc.createdAt)}
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
                  {Math.min(data.meta.page * data.meta.limit, data.meta.total)}{" "}
                  of {data.meta.total}
                </span>
                <div className="flex gap-2">
                  {data.meta.page > 1 && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/documents?page=${data.meta.page - 1}${category ? `&category=${category}` : ""}${status ? `&status=${status}` : ""}`}
                      >
                        Previous
                      </Link>
                    </Button>
                  )}
                  {data.meta.page < data.meta.totalPages && (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={`/documents?page=${data.meta.page + 1}${category ? `&category=${category}` : ""}${status ? `&status=${status}` : ""}`}
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
