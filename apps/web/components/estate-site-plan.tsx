"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { API_IMAGE_BASE } from "@/lib/api";

// ─── Prototype definitions ─────────────────────────────────────────────────
const PROTOTYPES = [
  {
    id: "fully-detached",
    name: "Fully Detached Duplex",
    swatch: "#7B6FD4",
    rgb: [123, 111, 212] as [number, number, number],
    images: [
      "/prototype/Fully-Detached-Duplex-Prototype.png",
      "/prototype/Fully-Detached-Duplex-Prototype2.png",
    ],
    desc: "A private, standalone two-storey home on its own dedicated plot with no shared walls. Comes with a private driveway, generous compound space, and full perimeter fencing — the most exclusive category in the estate.",
    specs: ["2 Floors", "Private compound", "Private driveway", "No shared walls", "Perimeter fencing"],
  },
  {
    id: "terrace",
    name: "Terrace Duplex",
    swatch: "#C05050",
    rgb: [192, 80, 80] as [number, number, number],
    images: [
      "/prototype/Terrace-Duplex-Prototype.png",
      "/prototype/Terrace-Duplex-Prototype2.png",
    ],
    desc: "Modern two-storey terrace homes built in organized rows, sharing side walls with neighboring units. A structured community feel with excellent value — ideal for young families.",
    specs: ["2 Floors", "Row layout", "Front garden space", "Shared side walls", "Private entrance"],
  },
  {
    id: "semi-detached",
    name: "Semi-Detached Duplex",
    swatch: "#D080C0",
    rgb: [208, 128, 192] as [number, number, number],
    images: [
      "/prototype/Semi-Detached-Duplex-Prototype.png",
      "/prototype/Semi-Detached-Duplex-Prototype2.png",
    ],
    desc: "A two-storey home sharing one wall with a single neighboring unit. Strikes the ideal balance between the privacy of a fully detached home and the affordability of a terrace.",
    specs: ["2 Floors", "One shared wall", "Side garden", "Private driveway", "Compound space"],
  },
  {
    id: "block-of-flats",
    name: "Block of Flats",
    swatch: "#00C8DC",
    rgb: [0, 200, 220] as [number, number, number],
    images: [
      "/prototype/Block-of-Flat-Prototype.png",
      "/prototype/Block-of-Flat-Prototype2.png",
    ],
    desc: "A multi-storey residential building containing multiple self-contained apartments. Each flat is independently accessed and fully fitted. Excellent for investment buyers seeking rental income.",
    specs: ["Multiple floors", "Self-contained units", "Shared lobby", "Car park", "Investment-grade"],
  },
  {
    id: "bungalow",
    name: "Bungalow",
    swatch: "#D4C820",
    rgb: [212, 200, 32] as [number, number, number],
    images: [
      "/prototype/Bungalow-Prototype.png",
      "/prototype/Bungalow-Prototype2.png",
    ],
    desc: "A beautifully designed single-storey home with an expansive floor plan and large surrounding compound. Ideal for families who prefer step-free living and generous outdoor space.",
    specs: ["Single floor", "Large compound", "Open plan living", "Wide frontage", "Easy accessibility"],
  },
  {
    id: "shopping",
    name: "Shopping Complex",
    swatch: "#D48820",
    rgb: [212, 136, 32] as [number, number, number],
    images: ["/prototype/Shopping-Complex-Prototype.png"],
    desc: "A commercial retail complex at the heart of the estate, designed to serve residents and the surrounding community with retail shops, service outlets, and commercial offices.",
    specs: ["Ground + upper floor", "Retail units", "Commercial offices", "Parking area", "24/7 access"],
  },
  {
    id: "school",
    name: "School",
    swatch: "#60B060",
    rgb: [96, 176, 96] as [number, number, number],
    images: [],
    desc: "An educational facility planned for the estate community. Full details and concept designs will be available soon.",
    specs: ["Coming soon"],
    comingSoon: true,
  },
  {
    id: "gatehouse",
    name: "Gatehouse / Powerhouse",
    swatch: "#906040",
    rgb: [144, 96, 64] as [number, number, number],
    images: ["/prototype/Gate-House-Prototype.png"],
    desc: "The estate's main security and power management facility at the entrance gate. Houses security personnel, visitor management systems, and the estate's backup power infrastructure.",
    specs: ["24/7 manned security", "Visitor registration", "CCTV monitoring", "Backup power systems", "Estate gate control"],
  },
] as const;

type PrototypeId = typeof PROTOTYPES[number]["id"];
type Prototype = typeof PROTOTYPES[number];

// ─── Dynamic prototype format (from admin) ─────────────────────────────────
export interface DynamicBuildingType {
  id: string;
  name: string;
  colorHex: string;
  description?: string;
  images?: string[];
  comingSoon?: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.substring(0, 2), 16),
    parseInt(clean.substring(2, 4), 16),
    parseInt(clean.substring(4, 6), 16),
  ];
}

function toInternalPrototype(bt: DynamicBuildingType): Prototype {
  return {
    id: bt.id as PrototypeId,
    name: bt.name,
    swatch: bt.colorHex,
    rgb: hexToRgb(bt.colorHex),
    images: (bt.images ?? []) as unknown as readonly string[],
    desc: bt.description ?? "",
    specs: [] as unknown as readonly string[],
    comingSoon: bt.comingSoon,
  } as unknown as Prototype;
}

function resolveImageUrl(url: string): string {
  return url.startsWith("/uploads/") ? `${API_IMAGE_BASE}${url}` : url;
}

// ─── Color matching ─────────────────────────────────────────────────────────
function colorDist(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function findPrototypeFrom(r: number, g: number, b: number, prototypes: readonly Prototype[]): Prototype | null {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max - min < 45) return null; // too gray
  if (max < 50) return null;       // too dark
  if (min > 215) return null;      // too white

  let closest: Prototype | null = null;
  let minDist = Infinity;

  for (const proto of prototypes) {
    const [pr, pg, pb] = proto.rgb;
    const d = colorDist(r, g, b, pr, pg, pb);
    if (d < minDist) {
      minDist = d;
      closest = proto as unknown as Prototype;
    }
  }

  return minDist < 130 ? closest : null;
}

// ─── Main component ──────────────────────────────────────────────────────────
interface EstateSitePlanProps {
  sitePlanUrl?: string | null;
  buildingTypes?: DynamicBuildingType[] | null;
}

export function EstateSitePlan({ sitePlanUrl, buildingTypes }: EstateSitePlanProps = {}) {
  const activePrototypes: readonly Prototype[] =
    buildingTypes && buildingTypes.length > 0
      ? buildingTypes.map(toInternalPrototype)
      : (PROTOTYPES as unknown as readonly Prototype[]);

  const planImageSrc = sitePlanUrl
    ? resolveImageUrl(sitePlanUrl)
    : "/prototype/Site-Plan.png";
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOrigin, setDragOrigin] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  const [selected, setSelected] = useState<Prototype | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  // Load image into hidden canvas for pixel sampling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = planImageSrc;
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
    };
  }, [planImageSrc]);

  // ── Click → color detection ──────────────────────────────────────────────
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (hasDragged) return;

    const canvas = canvasRef.current;
    const imgEl = imgRef.current;
    if (!canvas || !imgEl) return;

    const imgRect = imgEl.getBoundingClientRect();
    const cx = e.clientX;
    const cy = e.clientY;

    if (cx < imgRect.left || cx > imgRect.right || cy < imgRect.top || cy > imgRect.bottom) return;

    const normX = (cx - imgRect.left) / imgRect.width;
    const normY = (cy - imgRect.top) / imgRect.height;

    const px = Math.round(normX * canvas.width);
    const py = Math.round(normY * canvas.height);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [r, g, b, a] = ctx.getImageData(px, py, 1, 1).data;
    if (a < 128) return;

    const proto = findPrototypeFrom(r, g, b, activePrototypes);
    if (proto) {
      setSelected(proto as Prototype);
      setImgIdx(0);
    }
  }

  // ── Pan ──────────────────────────────────────────────────────────────────
  function handleMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    setDragging(true);
    setHasDragged(false);
    setDragOrigin({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - dragOrigin.x;
    const dy = e.clientY - dragOrigin.y;
    if (Math.abs(dx - offset.x) > 3 || Math.abs(dy - offset.y) > 3) setHasDragged(true);
    setOffset({ x: dx, y: dy });
  }, [dragging, dragOrigin]);

  const handleMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // ── Zoom ─────────────────────────────────────────────────────────────────
  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.12 : 0.89;
    setScale(s => Math.min(Math.max(s * delta, 0.4), 6));
  }

  function zoomIn() { setScale(s => Math.min(s * 1.25, 6)); }
  function zoomOut() { setScale(s => Math.max(s * 0.8, 0.4)); }
  function reset() { setScale(1); setOffset({ x: 0, y: 0 }); }

  // ── Close modal on outside click ─────────────────────────────────────────
  function handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    handleClick(e);
  }

  return (
    <div className="space-y-4">

      {/* ── Viewer ─────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50">

        {/* Controls */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
          <button onClick={zoomIn} className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/90 shadow-sm border border-gray-200 hover:bg-white transition-colors">
            <ZoomIn className="h-4 w-4 text-gray-600" />
          </button>
          <button onClick={zoomOut} className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/90 shadow-sm border border-gray-200 hover:bg-white transition-colors">
            <ZoomOut className="h-4 w-4 text-gray-600" />
          </button>
          <button onClick={reset} className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/90 shadow-sm border border-gray-200 hover:bg-white transition-colors">
            <RotateCcw className="h-3.5 w-3.5 text-gray-600" />
          </button>
        </div>

        {/* Hint */}
        <div className="absolute top-3 left-3 z-10">
          <div className="rounded-lg bg-white/90 shadow-sm border border-gray-200 px-3 py-1.5 text-xs text-gray-500 flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-[#C1121F]" />
            Click any coloured plot to view prototype
          </div>
        </div>

        {/* Map canvas area */}
        <div
          ref={containerRef}
          className="h-[520px] w-full overflow-hidden"
          style={{ cursor: dragging ? "grabbing" : "grab" }}
          onClick={handleContainerClick}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
        >
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src={planImageSrc}
              alt="Estate site plan"
              className="max-w-full max-h-full object-contain select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Hidden canvas for pixel sampling */}
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {/* ── Colour legend ──────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-100 bg-white/80 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Plot Type Legend</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {activePrototypes.map((p) => (
            <button
              key={p.id}
              onClick={() => { setSelected(p as Prototype); setImgIdx(0); }}
              className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-3 py-2.5 hover:border-gray-300 hover:shadow-sm transition-all text-left"
            >
              <span
                className="h-4 w-4 shrink-0 rounded-sm"
                style={{ backgroundColor: p.swatch }}
              />
              <span className="text-xs font-medium text-gray-700 leading-tight">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Prototype modal ─────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="h-4 w-4 text-gray-600" />
            </button>

            {/* Image gallery */}
            {selected.images.length > 0 ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveImageUrl(selected.images[imgIdx] as string)}
                  alt={selected.name}
                  className="w-full h-64 sm:h-80 object-cover rounded-t-2xl"
                />
                {selected.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setImgIdx((i) => (i - 1 + selected.images.length) % selected.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={() => setImgIdx((i) => (i + 1) % selected.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {selected.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          className={`h-1.5 rounded-full transition-all ${i === imgIdx ? "w-5 bg-white" : "w-1.5 bg-white/60"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="h-40 rounded-t-2xl flex items-center justify-center" style={{ backgroundColor: selected.swatch + "22" }}>
                <span className="text-sm text-gray-400">Design concept coming soon</span>
              </div>
            )}

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Header */}
              <div className="flex items-center gap-3">
                <span
                  className="h-4 w-4 rounded-sm shrink-0"
                  style={{ backgroundColor: selected.swatch }}
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Prototype</p>
                  <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: "var(--font-display)" }}>
                    {selected.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">{selected.desc}</p>

              {/* Specs */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Key Features</p>
                <div className="flex flex-wrap gap-2">
                  {selected.specs.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {"comingSoon" in selected && selected.comingSoon ? null : (
                <a
                  href={`/contact?message=${encodeURIComponent(`Hi, I'm interested in the ${selected.name} prototype and would like more information.`)}`}
                  className="block w-full rounded-xl bg-[#C1121F] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[#D62839] transition-colors"
                >
                  Enquire about this prototype
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
