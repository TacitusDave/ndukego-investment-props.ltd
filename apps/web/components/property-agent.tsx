import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

interface PropertyAgentProps {
  propertyTitle: string;
  propertyId: string;
}

// UPDATE: replace with the actual sales agent direct line
const AGENT_PHONE = "+2348036096663";
const AGENT_PHONE_DISPLAY = "+234 803 609 6663";

export function PropertyAgent({ propertyTitle, propertyId }: PropertyAgentProps) {
  const enquiryHref = `/contact?message=${encodeURIComponent(
    `Hi, I'm interested in the property "${propertyTitle}" (Ref: ${propertyId}). Please have a sales agent contact me.`
  )}`;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">
        Sales Agent
      </p>

      <div className="mb-5">
        <p className="font-semibold text-gray-900 text-base leading-snug">
          Ndukego Investment &amp; Properties Ltd
        </p>
        <p className="text-sm text-gray-400 mt-0.5">Available Mon – Fri · 8 am – 6 pm WAT</p>
      </div>

      <div className="space-y-2.5">
        {/* Primary CTA — call */}
        <a
          href={`tel:${AGENT_PHONE}`}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#A0111C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B41523] transition-colors shadow-sm shadow-[#A0111C]/15"
        >
          <Phone className="h-4 w-4" />
          {AGENT_PHONE_DISPLAY}
        </a>

        {/* Secondary CTA — enquiry */}
        <Link
          href={enquiryHref}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-[#A0111C]/25 hover:text-[#A0111C] transition-colors"
        >
          <MessageSquare className="h-4 w-4" />
          Send Written Enquiry
        </Link>
      </div>
    </div>
  );
}
