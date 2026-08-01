import {
  Zap, Sun, Battery, Droplets, Waves, Wifi, Shield, ShieldCheck,
  Lock, Camera, Car, Dumbbell, Wind, ArrowUpDown, Cpu, Building,
  Building2, Flag, ShoppingBag, BookOpen, Recycle, Leaf, Home,
  Star, Activity, CheckCircle, MapPin, Heart, Shirt,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const AMENITY_ICONS: Record<string, LucideIcon> = {
  "Road Access":              MapPin,
  "Electricity":              Zap,
  "Solar Power":              Sun,
  "Generator Backup":         Battery,
  "Water Supply / Borehole":  Droplets,
  "Drainage System":          Waves,
  "Internet / Fibre":         Wifi,
  "Perimeter Fencing":        Shield,
  "Security Gate":            Lock,
  "CCTV Surveillance":        Camera,
  "Security Post":            Shield,
  "24/7 Security":            ShieldCheck,
  "Swimming Pool":            Waves,
  "Garden / Landscaping":     Leaf,
  "Balcony / Terrace":        Home,
  "Garage / Car Park":        Car,
  "Gym / Fitness Centre":     Dumbbell,
  "Air Conditioning":         Wind,
  "Elevator / Lift":          ArrowUpDown,
  "Smart Home System":        Cpu,
  "BQ / Servant Quarters":    Building,
  "Golf Course":              Flag,
  "Club House":               Building2,
  "Children's Playground":    Star,
  "Sports Court":             Activity,
  "Shopping Complex":         ShoppingBag,
  "School":                   BookOpen,
  "Place of Worship":         Building2,
  "Hospital / Clinic":        Heart,
  "Waste Management":         Recycle,
  "Estate Management":        Building2,
  "Laundry Services":         Shirt,
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
        {amenities.map((amenity) => {
          const Icon = AMENITY_ICONS[amenity] ?? CheckCircle;
          return (
            <div key={amenity} className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#C1121F] shrink-0" aria-hidden />
              <span className="text-sm text-foreground">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
