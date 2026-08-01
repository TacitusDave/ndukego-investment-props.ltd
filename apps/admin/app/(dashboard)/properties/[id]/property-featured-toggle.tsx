"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { togglePropertyFeatured } from "@/lib/actions";

export function PropertyFeaturedToggle({
  propertyId,
  featured,
}: {
  propertyId: string;
  featured: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleToggle() {
    setError(null);
    startTransition(async () => {
      const result = await togglePropertyFeatured(propertyId, !featured);
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="rounded-md border bg-card p-5 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
            Featured Listing
          </p>
          <p className="text-sm text-muted-foreground">
            Featured properties appear in the homepage spotlight section.
          </p>
        </div>
        <div
          className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
            featured
              ? "bg-amber-100 text-amber-700"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <Star className={`h-3.5 w-3.5 ${featured ? "fill-amber-500 text-amber-500" : ""}`} />
          {featured ? "Featured" : "Not featured"}
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`w-full rounded-md border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
          featured
            ? "border-destructive/30 text-destructive hover:bg-destructive/5"
            : "border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"
        }`}
      >
        {isPending
          ? "Saving…"
          : featured
          ? "Remove from featured"
          : "Mark as featured"}
      </button>
    </div>
  );
}
