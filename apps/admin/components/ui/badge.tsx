import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:     "border-transparent bg-white/10 text-white",
        secondary:   "border-transparent bg-[#C1121F] text-white",
        destructive: "border-transparent bg-red-900/40 text-red-400",
        outline:     "border-white/20 text-white/70",

        /* ── Property Status ── */
        DRAFT:                "border-transparent bg-zinc-800 text-zinc-400",
        PENDING_INSPECTION:   "border-transparent bg-amber-900/40 text-amber-400",
        PENDING_VERIFICATION: "border-transparent bg-yellow-900/40 text-yellow-400",
        APPROVED:             "border-transparent bg-blue-900/40 text-blue-400",
        PUBLISHED:            "border-transparent bg-green-900/40 text-green-400",
        RESERVED:             "border-transparent bg-purple-900/40 text-purple-400",
        UNDER_NEGOTIATION:    "border-transparent bg-orange-900/40 text-orange-400",
        UNDER_CONTRACT:       "border-transparent bg-indigo-900/40 text-indigo-400",
        SOLD:                 "border-transparent bg-zinc-800 text-zinc-500",
        ARCHIVED:             "border-transparent bg-zinc-900 text-zinc-600",
        REJECTED:             "border-transparent bg-red-900/40 text-red-400",

        /* ── Estate Status ── */
        PLANNING:         "border-transparent bg-zinc-800 text-zinc-400",
        UNDER_DEVELOPMENT:"border-transparent bg-amber-900/40 text-amber-400",
        ACTIVE:           "border-transparent bg-green-900/40 text-green-400",
        COMPLETED:        "border-transparent bg-blue-900/40 text-blue-400",
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
