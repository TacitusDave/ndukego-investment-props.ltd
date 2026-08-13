"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";
import { API_IMAGE_BASE } from "@/lib/api";

interface Media {
  id: string;
  url: string;
  title: string | null;
  isCover: boolean;
  sortOrder: number;
}

interface PropertyGalleryProps {
  media: Media[];
  propertyTitle: string;
}

export function PropertyGallery({ media, propertyTitle }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = media.length;

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);
  const lbPrev = useCallback(() => setLightboxIndex((i) => (i - 1 + total) % total), [total]);
  const lbNext = useCallback(() => setLightboxIndex((i) => (i + 1) % total), [total]);

  function openLightbox(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, lbPrev, lbNext]);

  function onTouchStart(e: React.TouchEvent) {
    setTouchStartX(e.touches[0].clientX);
  }

  function onTouchEnd(e: React.TouchEvent, prevFn: () => void, nextFn: () => void) {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? nextFn() : prevFn();
    setTouchStartX(null);
  }

  if (total === 0) return null;

  const current = media[activeIndex];

  return (
    <>
      {/* Main gallery */}
      <div className="select-none">
        {/* Primary image + arrow overlay */}
        <div
          className="relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer group"
          style={{ aspectRatio: "16/9", maxHeight: 500 }}
          onClick={() => openLightbox(activeIndex)}
          onTouchStart={onTouchStart}
          onTouchEnd={(e) => onTouchEnd(e, prev, next)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${API_IMAGE_BASE}${current.url}`}
            alt={current.title ?? propertyTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
          />

          {/* Gradient fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

          {/* Expand hint */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
            <Expand className="h-3.5 w-3.5" />
            Expand
          </div>

          {/* Image counter */}
          {total > 1 && (
            <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-2.5 py-1 text-white text-xs font-medium backdrop-blur-sm">
              {activeIndex + 1} / {total}
            </div>
          )}

          {/* Prev / Next arrows — always visible on mobile, hover-revealed on desktop */}
          {total > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70 opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail strip */}
        {total > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
            {media.map((m, i) => (
              <button
                key={m.id}
                onClick={() => setActiveIndex(i)}
                className={`shrink-0 rounded-lg overflow-hidden ring-2 transition-all ${
                  i === activeIndex
                    ? "ring-[#A0111C] opacity-100 scale-100"
                    : "ring-transparent opacity-55 hover:opacity-80 hover:scale-[1.03]"
                }`}
                style={{ width: 72, height: 50 }}
                aria-label={`View photo ${i + 1}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${API_IMAGE_BASE}${m.url}`}
                  alt={m.title ?? `Photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            aria-label="Close lightbox"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Counter */}
          {total > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black/30 px-3 py-1 text-white text-sm font-medium">
              {lightboxIndex + 1} / {total}
            </div>
          )}

          {/* Prev arrow */}
          {total > 1 && (
            <button
              aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image — stops click-through to backdrop */}
          <div
            className="relative px-16"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={(e) => onTouchEnd(e, lbPrev, lbNext)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={lightboxIndex}
              src={`${API_IMAGE_BASE}${media[lightboxIndex].url}`}
              alt={media[lightboxIndex].title ?? propertyTitle}
              className="max-h-[82vh] max-w-[80vw] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Next arrow */}
          {total > 1 && (
            <button
              aria-label="Next photo"
              onClick={(e) => { e.stopPropagation(); lbNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Thumbnail strip inside lightbox */}
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw]">
              {media.map((m, i) => (
                <button
                  key={m.id}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`shrink-0 rounded overflow-hidden ring-2 transition-all ${
                    i === lightboxIndex ? "ring-white opacity-100" : "ring-transparent opacity-40 hover:opacity-70"
                  }`}
                  style={{ width: 52, height: 36 }}
                  aria-label={`Jump to photo ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${API_IMAGE_BASE}${m.url}`} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
