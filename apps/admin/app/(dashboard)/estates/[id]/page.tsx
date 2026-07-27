import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { PropertyStatusBadge } from "../../properties/property-status-badge";

interface Estate {
  id: string;
  name: string;
  code: string;
  slug: string;
  status: string;
  state: string;
  lga: string | null;
  city: string | null;
  address: string | null;
  description: string | null;
  totalPlots: number | null;
  availablePlots: number | null;
  totalLandSize: number | null;
  phases: { id: string; name: string; code: string; totalPlots: number | null }[];
  blocks: { id: string; name: string; code: string; section: string | null; totalPlots: number | null }[];
  infrastructure: { id: string; name: string; type: string; description: string | null }[];
  properties: { id: string; internalNumber: string; title: string; status: string; listingPrice: string | null }[];
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  PLANNING: "Planning",
  UNDER_DEVELOPMENT: "Under development",
  ACTIVE: "Active",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
};

export default async function EstateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: estate, error } = await apiFetch<Estate>(`/estates/${id}`);

  if (error || !estate) notFound();

  return (
    <div className="flex flex-col h-full">
      <Header title={estate.name}>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/estates">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to estates
          </Link>
        </Button>
      </Header>

      <div className="flex-1 p-6 space-y-6 max-w-5xl">

        {/* Overview */}
        <div className="rounded-md border bg-card p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">{estate.name}</h2>
              <p className="text-sm text-muted-foreground font-mono">{estate.code}</p>
            </div>
            <Badge variant={estate.status as never}>{STATUS_LABELS[estate.status] ?? estate.status}</Badge>
          </div>
          {estate.description && (
            <p className="text-sm text-muted-foreground">{estate.description}</p>
          )}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground text-xs">Location</dt>
              <dd className="font-medium">{estate.city ? `${estate.city}, ` : ""}{estate.state}</dd>
            </div>
            {estate.lga && (
              <div>
                <dt className="text-muted-foreground text-xs">LGA</dt>
                <dd className="font-medium">{estate.lga}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted-foreground text-xs">Total plots</dt>
              <dd className="font-medium">{estate.totalPlots ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground text-xs">Available plots</dt>
              <dd className="font-medium">{estate.availablePlots ?? "—"}</dd>
            </div>
            {estate.totalLandSize && (
              <div>
                <dt className="text-muted-foreground text-xs">Land size</dt>
                <dd className="font-medium">{estate.totalLandSize.toLocaleString()} sqm</dd>
              </div>
            )}
            <div>
              <dt className="text-muted-foreground text-xs">Created</dt>
              <dd className="font-medium">{formatDate(estate.createdAt)}</dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phases */}
          {estate.phases.length > 0 && (
            <div className="rounded-md border bg-card p-5 space-y-3">
              <h3 className="text-sm font-semibold">Phases ({estate.phases.length})</h3>
              <ul className="space-y-2">
                {estate.phases.map((ph) => (
                  <li key={ph.id} className="flex justify-between text-sm">
                    <span>{ph.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{ph.code}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Blocks */}
          {estate.blocks.length > 0 && (
            <div className="rounded-md border bg-card p-5 space-y-3">
              <h3 className="text-sm font-semibold">Blocks ({estate.blocks.length})</h3>
              <ul className="space-y-2">
                {estate.blocks.map((bl) => (
                  <li key={bl.id} className="flex justify-between text-sm">
                    <span>{bl.name}{bl.section ? ` (${bl.section})` : ""}</span>
                    <span className="font-mono text-xs text-muted-foreground">{bl.code}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Infrastructure */}
          {estate.infrastructure.length > 0 && (
            <div className="rounded-md border bg-card p-5 space-y-3">
              <h3 className="text-sm font-semibold">Infrastructure ({estate.infrastructure.length})</h3>
              <ul className="space-y-2">
                {estate.infrastructure.map((inf) => (
                  <li key={inf.id} className="text-sm">
                    <span className="font-medium">{inf.name}</span>
                    <span className="text-muted-foreground"> · {inf.type}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Properties */}
        {estate.properties.length > 0 && (
          <div className="rounded-md border bg-card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Properties ({estate.properties.length})</h3>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/properties?estateId=${estate.id}`}>View all</Link>
              </Button>
            </div>
            <ul className="divide-y">
              {estate.properties.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2 text-sm">
                  <div>
                    <Link href={`/properties/${p.id}`} className="font-medium hover:underline">
                      {p.title}
                    </Link>
                    <span className="ml-2 font-mono text-xs text-muted-foreground">{p.internalNumber}</span>
                  </div>
                  <PropertyStatusBadge status={p.status} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
