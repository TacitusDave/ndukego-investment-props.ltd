import { Header } from "@/components/layout/header";
import { FileText, Shield, FolderOpen, Upload, Clock, Lock } from "lucide-react";

const PLANNED_FEATURES = [
  {
    icon: FolderOpen,
    title: "Document library",
    desc: "Centralised storage for all property and estate documents — title deeds, surveys, approvals, contracts.",
  },
  {
    icon: Shield,
    title: "Title verification records",
    desc: "Track C-of-O, Governor's Consent, and survey plans for every property. Link documents to specific listings.",
  },
  {
    icon: Upload,
    title: "Secure uploads",
    desc: "Upload PDFs, scanned documents, and images. Files are stored securely and linked to properties or customers.",
  },
  {
    icon: Lock,
    title: "Access control",
    desc: "Control which staff members can view, download, or manage sensitive documents.",
  },
  {
    icon: Clock,
    title: "Expiry tracking",
    desc: "Get alerts when documents are approaching expiry — leases, certifications, regulatory permits.",
  },
];

export default function DocumentsPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Documents" />

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl">

          {/* Icon + heading */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 shrink-0">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Document management</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Centralised, secure document storage for properties and customers.
              </p>
            </div>
          </div>

          {/* Status banner */}
          <div className="rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-3 mb-8 flex items-start gap-3">
            <Clock className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Coming in Phase 2</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Document management is currently in development and will be available in the next major release.
              </p>
            </div>
          </div>

          {/* Planned features */}
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            What&apos;s planned
          </h3>
          <div className="space-y-3">
            {PLANNED_FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted shrink-0">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{f.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
