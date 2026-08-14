"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SELECT_CLASS =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const CATEGORIES = [
  "PROPERTY","ESTATE","CUSTOMER","SALES","FINANCE",
  "EMPLOYEE","COMPANY","VENDOR","INSPECTION","LEGAL","MARKETING","OTHER",
];

const DOCUMENT_TYPES = [
  "CERTIFICATE_OF_OCCUPANCY","RIGHT_OF_OCCUPANCY","GOVERNORS_CONSENT",
  "SURVEY_PLAN","BEACON_COORDINATES","SITE_PLAN","LAYOUT_PLAN",
  "APPROVED_BUILDING_PLAN","DEED_OF_ASSIGNMENT","DEED_OF_CONVEYANCE",
  "LAND_INFORMATION_CERTIFICATE","TITLE_VERIFICATION_REPORT","VALUATION_REPORT",
  "ENVIRONMENTAL_REPORT","TAX_CLEARANCE","LAND_REGISTRY_DOCUMENT",
  "PHOTOGRAPH","DRONE_IMAGE","INSPECTION_REPORT","MASTER_LAYOUT",
  "INFRASTRUCTURE_PLAN","NATIONAL_ID","INTERNATIONAL_PASSPORT",
  "DRIVERS_LICENSE","PROOF_OF_ADDRESS","TAX_IDENTIFICATION","BVN",
  "RESERVATION_FORM","OFFER_LETTER","PURCHASE_AGREEMENT","SALES_AGREEMENT",
  "PAYMENT_SCHEDULE","ALLOCATION_LETTER","HANDOVER_CERTIFICATE",
  "COMPLETION_CERTIFICATE","OWNERSHIP_TRANSFER","PAYMENT_RECEIPT",
  "BANK_DEPOSIT_SLIP","TRANSFER_CONFIRMATION","INVOICE","EMPLOYMENT_LETTER",
  "CAC_REGISTRATION","INSURANCE_POLICY","BUSINESS_LICENSE","CONTRACT","OTHER",
];

const ENTITY_TYPES = [
  "PROPERTY","ESTATE","CUSTOMER","SALE","RESERVATION",
  "INSPECTION","EMPLOYEE","COMPANY","VENDOR","PAYMENT",
];

const SECURITY_LEVELS = [
  { value: "PUBLIC",              label: "Public" },
  { value: "INTERNAL",            label: "Internal (default)" },
  { value: "CONFIDENTIAL",        label: "Confidential" },
  { value: "RESTRICTED",          label: "Restricted" },
  { value: "HIGHLY_CONFIDENTIAL", label: "Highly Confidential" },
];

function formatLabel(str: string) {
  return str.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentUploadForm() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [entityType, setEntityType] = useState("");
  const [entityId, setEntityId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [securityClassification, setSecurityClassification] = useState("INTERNAL");
  const [expirationDate, setExpirationDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f && !title) {
      setTitle(f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { setError("Please select a file"); return; }
    if (!title.trim()) { setError("Title is required"); return; }
    if (!category) { setError("Category is required"); return; }
    if (!documentType) { setError("Document type is required"); return; }
    if (!entityType) { setError("Entity type is required"); return; }
    if (!entityId.trim()) { setError("Entity ID is required"); return; }

    setError(null);
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title.trim());
    fd.append("category", category);
    fd.append("documentType", documentType);
    fd.append("entityType", entityType);
    fd.append("entityId", entityId.trim());
    if (referenceNumber.trim()) fd.append("referenceNumber", referenceNumber.trim());
    fd.append("securityClassification", securityClassification);
    if (expirationDate) fd.append("expirationDate", expirationDate);

    const res = await fetch("/api/proxy/documents/upload", {
      method: "POST",
      body: fd,
    });

    setUploading(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(
        Array.isArray(body.message)
          ? body.message.join(", ")
          : (body.message ?? "Upload failed"),
      );
      return;
    }

    const data = await res.json();
    router.push(`/documents/${data.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* File drop zone */}
      <div
        className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-10 text-center cursor-pointer hover:border-primary/40 transition-colors"
        onClick={() => fileRef.current?.click()}
      >
        {file ? (
          <>
            <FileText className="h-10 w-10 text-primary mb-3" />
            <p className="text-sm font-semibold">{file.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{formatBytes(file.size)}</p>
            <button
              type="button"
              className="absolute top-3 right-3 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-semibold">Click to select a file</p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, Word, Excel, JPEG, PNG — max 20 MB
            </p>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.tiff"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Title */}
      <div className="space-y-1.5">
        <Label htmlFor="title">Document title</Label>
        <Input
          id="title"
          placeholder="e.g. Certificate of Occupancy — Plot 14B"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Category + Document type */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={SELECT_CLASS}
            required
          >
            <option value="">Select category…</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{formatLabel(c)}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="documentType">Document type</Label>
          <select
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className={SELECT_CLASS}
            required
          >
            <option value="">Select type…</option>
            {DOCUMENT_TYPES.map((t) => (
              <option key={t} value={t}>{formatLabel(t)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Entity type + Entity ID */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="entityType">Linked to (entity type)</Label>
          <select
            id="entityType"
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className={SELECT_CLASS}
            required
          >
            <option value="">Select entity…</option>
            {ENTITY_TYPES.map((e) => (
              <option key={e} value={e}>{formatLabel(e)}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="entityId">Entity ID (UUID)</Label>
          <Input
            id="entityId"
            placeholder="Paste the record UUID here"
            value={entityId}
            onChange={(e) => setEntityId(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Reference number + Security */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="referenceNumber">Reference number (optional)</Label>
          <Input
            id="referenceNumber"
            placeholder="e.g. ABUJA/LGA/2024/001"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="securityClassification">Security classification</Label>
          <select
            id="securityClassification"
            value={securityClassification}
            onChange={(e) => setSecurityClassification(e.target.value)}
            className={SELECT_CLASS}
          >
            {SECURITY_LEVELS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Expiration date */}
      <div className="space-y-1.5">
        <Label htmlFor="expirationDate">Expiration date (optional)</Label>
        <Input
          id="expirationDate"
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="max-w-xs"
        />
      </div>

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={uploading}>
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload document
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={uploading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
