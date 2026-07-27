import { Badge, type BadgeProps } from "@/components/ui/badge";

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  PENDING_REVIEW: "Pending review",
  APPROVED: "Approved",
  PUBLISHED: "Published",
  RESERVED: "Reserved",
  SOLD: "Sold",
  ARCHIVED: "Archived",
  REJECTED: "Rejected",
  UNDER_OFFER: "Under offer",
  OFF_MARKET: "Off market",
  SUSPENDED: "Suspended",
};

const STATUS_VARIANTS: Record<string, BadgeProps["variant"]> = {
  DRAFT: "draft",
  PENDING_REVIEW: "pending_review",
  APPROVED: "approved",
  PUBLISHED: "published",
  RESERVED: "reserved",
  SOLD: "sold",
  ARCHIVED: "archived",
  REJECTED: "rejected",
  UNDER_OFFER: "under_offer",
  OFF_MARKET: "off_market",
  SUSPENDED: "suspended",
};

export function PropertyStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={STATUS_VARIANTS[status] ?? "outline"}>
      {STATUS_LABELS[status] ?? status}
    </Badge>
  );
}
