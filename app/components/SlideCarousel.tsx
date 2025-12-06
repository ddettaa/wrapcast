"use client";

import { useState, ReactNode, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Pointer } from "lucide-react";

interface SlideCarouselProps {
  children: ReactNode[];
  onComplete?: () => void;
}

export function SlideCarousel({ children, onComplete }: SlideCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = children.length;
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isLastSlide = currentSlide === totalSlides - 1;

  const goNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
    
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
        touchAction: "pan-y",
        background: "#ffffff",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides container - z-index 1 */}
      <div
        style={{
          display: "flex",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: `translateX(-${currentSlide * 100}%)`,
          height: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              minWidth: "100%",
              height: "100%",
              flexShrink: 0,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation overlay - z-index 100 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          zIndex: 100,
        }}
      >
        {/* Progress dots */}
        <div
          style={{
            position: "absolute",
            bottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "clamp(0.5rem, 2vw, 0.75rem)",
            padding: "0.5rem",
            background: "#ffffff",
            border: "2px solid #000000",
            pointerEvents: "auto",
          }}
        >
          {children.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: "clamp(12px, 3vw, 16px)",
                height: "clamp(12px, 3vw, 16px)",
                background: index === currentSlide ? "#000000" : "#ffffff",
                border: "2px solid #000000",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.2s ease",
                minWidth: "unset",
                minHeight: "unset",
              }}
            />
          ))}
        </div>

        {/* Previous button */}
        {currentSlide > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous slide"
            style={{
              position: "absolute",
              left: "clamp(0.5rem, 2vw, 1rem)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#ffffff",
              border: "3px solid #000000",
              boxShadow: "3px 3px 0px #000000",
              width: "clamp(44px, 12vw, 56px)",
              height: "clamp(44px, 12vw, 56px)",
              cursor: "pointer",
              color: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "auto",
            }}
          >
            <ChevronLeft size={28} strokeWidth={3} />
          </button>
        )}

        {/* Next button - HIDE on last slide */}
        {!isLastSlide && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next slide"
            style={{
              position: "absolute",
              right: "clamp(0.5rem, 2vw, 1rem)",
              top: "50%",
              transform: "translateY(-50%)",
              background: "#ffffff",
              border: "3px solid #000000",
              boxShadow: "3px 3px 0px #000000",
              width: "clamp(44px, 12vw, 56px)",
              height: "clamp(44px, 12vw, 56px)",
              cursor: "pointer",
              color: "#000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "auto",
            }}
          >
            <ChevronRight size={28} strokeWidth={3} />
          </button>
        )}

        {/* Swipe hint - hide on last slide */}
        {!isLastSlide && (
          <div
            style={{
              position: "absolute",
              bottom: "max(4rem, calc(env(safe-area-inset-bottom, 1rem) + 3rem))",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(0.7rem, 2.5vw, 0.875rem)",
              whiteSpace: "nowrap",
              fontWeight: 700,
              textTransform: "uppercase",
              background: "#ffffff",
              border: "2px solid #000000",
              padding: "0.25rem 0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              pointerEvents: "auto",
            }}
          >
            <Pointer size={14} strokeWidth={2.5} />
            Swipe or use arrows
            <ChevronRight size={14} strokeWidth={2.5} />
          </div>
        )}
      </div>
    </div>
  );
}
