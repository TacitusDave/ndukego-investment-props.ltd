import { Mail, Phone } from "lucide-react";

export function PropertyAgent() {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        Sales Consultant
      </h3>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/default-prop-profile.jpg"
          alt="Sales Consultant"
          className="h-14 w-14 rounded-full object-cover border-2 border-[#C1121F]/20 shrink-0"
        />
        <div>
          <p className="font-semibold text-foreground">Ndukego Properties</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ndukego Investment &amp; Properties Ltd
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <a
          href="mailto:ndukegoinvest.propertiesltd@gmail.com"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Mail className="h-4 w-4 shrink-0 text-[#C1121F]" />
          ndukegoinvest.propertiesltd@gmail.com
        </a>
        <a
          href="tel:+2348036096700"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Phone className="h-4 w-4 shrink-0 text-[#C1121F]" />
          +234 803 609 6700
        </a>
        <a
          href="tel:+2347052955555"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Phone className="h-4 w-4 shrink-0 text-[#C1121F]" />
          +234 705 295 5555
        </a>
      </div>
    </div>
  );
}
