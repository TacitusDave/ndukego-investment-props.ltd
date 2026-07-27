import { Badge, type BadgeProps } from "@/components/ui/badge";

const STATUS_LABELS: Record<string, string> = {
  DRAFT: "Draft",
  PENDING_INSPECTION: "Pending inspection",
  PENDING_VERIFICATION: "Pending verification",
  APPROVED: "Approved",
  PUBLISHED: "Published",
  RESERVED: "Reserved",
  UNDER_NEGOTIATION: "Under negotiation",
  UNDER_CONTRACT: "Under contract",
  SOLD: "Sold",
  ARCHIVED: "Archived",
  REJECTED: "Rejected",
};

export function PropertyStatusBadge({ status }: { status: string }) {
  return (
    <Badge variant={status as BadgeProps["variant"]}>
      {STATUS_LABELS[status] ?? status}
    </Badge>
  );
}
