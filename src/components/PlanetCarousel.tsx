"use client";

import React, { useRef, useState, useEffect } from "react";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
  showDots?: boolean;
  autoplayMs?: number | null; // ms, null to disable
};

export default function PlanetCarousel({
  children,
  className = "",
  showDots = true,
  autoplayMs = null,
}: CarouselProps) {
  const count = React.Children.count(children);
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    // reset translate when window resizes to keep correct position
    const onResize = () => moveTo(index, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  useEffect(() => {
    if (autoplayMs && count > 1) {
      stopAutoplay();
      autoplayRef.current = window.setInterval(() => next(), autoplayMs);
      return () => stopAutoplay();
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, autoplayMs]);

  function stopAutoplay() {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function prev() {
    moveTo((index - 1 + count) % count);
  }

  function next() {
    moveTo((index + 1) % count);
  }

  function moveTo(i: number, smooth = true) {
    const el = trackRef.current;
    if (!el) return;
    const width = el.clientWidth;
    const translate = -i * width;
    el.style.transition = smooth ? "transform 480ms cubic-bezier(.2,.9,.2,1)" : "none";
    el.style.transform = `translateX(${translate}px)`;
    currentTranslate.current = translate;
    setIndex(i);
  }

  // pointer/drag support
  function onPointerDown(e: React.PointerEvent) {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    el.setPointerCapture(e.pointerId);
    el.style.transition = "none";
    stopAutoplay();
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!isDragging.current || !trackRef.current) return;
    const el = trackRef.current;
    const dx = e.clientX - startX.current;
    el.style.transform = `translateX(${currentTranslate.current + dx}px)`;
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!isDragging.current || !trackRef.current) return;
    const el = trackRef.current;
    isDragging.current = false;
    const dx = e.clientX - startX.current;
    const threshold = el.clientWidth * 0.15; // 15% swipe to change
    if (dx > threshold) {
      prev();
    } else if (dx < -threshold) {
      next();
    } else {
      // snap back
      moveTo(index);
    }
  }

  // keyboard support
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  // initialize position
  useEffect(() => {
    // small delay to ensure layout measured correctly
    const t = setTimeout(() => moveTo(index, false), 20);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
      aria-label="Carousel"
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="flex will-change-transform"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{ touchAction: "pan-y" }}
      >
        {React.Children.map(children, (child, i) => (
          <div className="flex-shrink-0 w-full p-4" aria-hidden={i !== index}>
            {child}
          </div>
        ))}
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            onClick={() => {
              prev();
              stopAutoplay();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 010-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            onClick={() => {
              next();
              stopAutoplay();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/50 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 11H4a1 1 0 010-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                moveTo(i);
                stopAutoplay();
              }}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 ${i === index ? "bg-white" : "bg-white/40"}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
