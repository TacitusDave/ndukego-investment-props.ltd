"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, ShieldCheck, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateDocumentStatus, deleteDocument } from "@/lib/actions";

interface Props {
  documentId: string;
  currentStatus: string;
}

const TRANSITIONS: Record<string, { label: string; status: string; icon: React.ElementType; variant: "default" | "outline" | "destructive" }[]> = {
  UPLOADED:  [
    { label: "Mark verified", status: "VERIFIED", icon: ShieldCheck, variant: "outline" },
    { label: "Approve",       status: "APPROVED", icon: CheckCircle, variant: "default" },
    { label: "Reject",        status: "REJECTED", icon: XCircle,     variant: "destructive" },
  ],
  SCANNING:  [
    { label: "Mark verified", status: "VERIFIED", icon: ShieldCheck, variant: "outline" },
    { label: "Reject",        status: "REJECTED", icon: XCircle,     variant: "destructive" },
  ],
  VERIFIED:  [
    { label: "Approve",       status: "APPROVED", icon: CheckCircle, variant: "default" },
    { label: "Reject",        status: "REJECTED", icon: XCircle,     variant: "destructive" },
  ],
  APPROVED:  [
    { label: "Publish",       status: "PUBLISHED", icon: CheckCircle, variant: "default" },
    { label: "Archive",       status: "ARCHIVED",  icon: Archive,     variant: "outline" },
  ],
  PUBLISHED: [
    { label: "Archive",       status: "ARCHIVED",  icon: Archive, variant: "outline" },
  ],
  REJECTED:  [
    { label: "Re-upload / mark uploaded", status: "UPLOADED", icon: ShieldCheck, variant: "outline" },
  ],
};

export function DocumentStatusActions({ documentId, currentStatus }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const actions = TRANSITIONS[currentStatus] ?? [];

  async function handleStatus(status: string) {
    setError(null);
    startTransition(async () => {
      const result = await updateDocumentStatus(documentId, status);
      if (result.error) { setError(result.error); return; }
      router.refresh();
    });
  }

  async function handleDelete() {
    if (!confirm("Delete this document? This action cannot be undone.")) return;
    setDeleting(true);
    const result = await deleteDocument(documentId);
    setDeleting(false);
    if (result.error) { setError(result.error); return; }
    router.push("/documents");
  }

  return (
    <div className="rounded-xl border bg-card p-5 space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Actions
      </h3>

      {actions.length > 0 && (
        <div className="flex flex-col gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button
                key={action.status}
                variant={action.variant}
                size="sm"
                className="justify-start"
                disabled={isPending || deleting}
                onClick={() => handleStatus(action.status)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      <div className="pt-2 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="justify-start text-destructive hover:text-destructive w-full"
          disabled={isPending || deleting}
          onClick={handleDelete}
        >
          <XCircle className="mr-2 h-4 w-4" />
          {deleting ? "Deleting…" : "Delete document"}
        </Button>
      </div>
    </div>
  );
}
