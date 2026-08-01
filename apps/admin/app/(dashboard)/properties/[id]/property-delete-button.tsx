"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hardDeleteProperty } from "@/lib/actions";

interface Props {
  propertyId: string;
  propertyTitle: string;
}

export function PropertyDeleteButton({ propertyId, propertyTitle }: Props) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const confirmed = typed.trim() === propertyTitle.trim();

  function handleOpen() {
    setTyped("");
    setError(null);
    setOpen(true);
  }

  function handleDelete() {
    if (!confirmed) return;
    startTransition(async () => {
      const result = await hardDeleteProperty(propertyId);
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/properties");
        router.refresh();
      }
    });
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
        onClick={handleOpen}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete permanently
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl border border-gray-200 p-6 space-y-5 mx-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Delete property permanently?</h2>
                <p className="text-sm text-gray-500 mt-1">
                  This will permanently remove <span className="font-medium text-gray-700">"{propertyTitle}"</span> from
                  the database, website, and all uploaded images. This cannot be undone.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-600">
                Type <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-800">{propertyTitle}</span> to confirm
              </label>
              <input
                type="text"
                value={typed}
                onChange={(e) => { setTyped(e.target.value); setError(null); }}
                placeholder="Type the property name exactly"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && confirmed && handleDelete()}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-40"
                onClick={handleDelete}
                disabled={!confirmed || isPending}
              >
                {isPending ? "Deleting…" : "Delete permanently"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
