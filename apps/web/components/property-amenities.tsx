const AMENITY_ICONS: Record<string, string> = {
  "Road Access": "🛣️",
  "Electricity": "⚡",
  "Solar Power": "☀️",
  "Generator Backup": "🔋",
  "Water Supply / Borehole": "💧",
  "Drainage System": "🌊",
  "Internet / Fibre": "📡",
  "Perimeter Fencing": "🧱",
  "Security Gate": "🚧",
  "CCTV Surveillance": "📷",
  "Security Post": "💂",
  "24/7 Security": "🛡️",
  "Swimming Pool": "🏊",
  "Garden / Landscaping": "🌿",
  "Balcony / Terrace": "🏠",
  "Garage / Car Park": "🚗",
  "Gym / Fitness Centre": "💪",
  "Air Conditioning": "❄️",
  "Elevator / Lift": "🛗",
  "Smart Home System": "🏡",
  "BQ / Servant Quarters": "🏘️",
  "Golf Course": "⛳",
  "Club House": "🏛️",
  "Children's Playground": "🎠",
  "Sports Court": "🏀",
  "Shopping Complex": "🛍️",
  "School": "🏫",
  "Place of Worship": "⛪",
  "Hospital / Clinic": "🏥",
  "Waste Management": "♻️",
  "Estate Management": "🏢",
  "Laundry Services": "👕",
};

interface Props {
  amenities: string[];
  label?: string;
}

export function PropertyAmenities({ amenities, label = "Amenities & Features" }: Props) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="rounded-xl border bg-card p-5 space-y-4">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-2">
            <span className="text-base leading-none" aria-hidden>
              {AMENITY_ICONS[amenity] ?? "✓"}
            </span>
            <span className="text-sm text-foreground">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
