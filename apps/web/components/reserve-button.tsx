"use client";

import { useState } from "react";
import { CalendarCheck } from "lucide-react";
import { ReservationModal } from "./reservation-modal";

interface Props {
  propertyId: string;
  propertyTitle: string;
  reservationAmount?: string | null;
}

export function ReserveButton({ propertyId, propertyTitle, reservationAmount }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground hover:bg-secondary/90 transition-colors"
      >
        <CalendarCheck className="h-4 w-4" />
        Reserve this property
      </button>

      {open && (
        <ReservationModal
          propertyId={propertyId}
          propertyTitle={propertyTitle}
          reservationAmount={reservationAmount}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
