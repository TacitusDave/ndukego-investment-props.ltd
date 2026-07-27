import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Property status variants
        draft: "border-transparent bg-slate-100 text-slate-700",
        pending_review: "border-transparent bg-amber-100 text-amber-700",
        approved: "border-transparent bg-blue-100 text-blue-700",
        published: "border-transparent bg-green-100 text-green-700",
        reserved: "border-transparent bg-purple-100 text-purple-700",
        sold: "border-transparent bg-gray-100 text-gray-700",
        archived: "border-transparent bg-gray-100 text-gray-500",
        rejected: "border-transparent bg-red-100 text-red-700",
        under_offer: "border-transparent bg-orange-100 text-orange-700",
        off_market: "border-transparent bg-zinc-100 text-zinc-600",
        suspended: "border-transparent bg-rose-100 text-rose-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
