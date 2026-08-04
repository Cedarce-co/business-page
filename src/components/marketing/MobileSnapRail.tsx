"use client";

import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileSnapRailProps = {
  children?: ReactNode;
  /** Prefer this over children when rendering from a Server Component. */
  slides?: ReactNode[];
  className?: string;
  /** Visible card width as vw (peek of next card remains). */
  cardWidthVw?: number;
  showArrows?: boolean;
};

/**
 * Mobile card carousel using translateX.
 * Attaches non-passive touch listeners so horizontal swipes are not stolen by page scroll.
 */
export default function MobileSnapRail({
  children,
  slides,
  className,
  cardWidthVw = 78,
  showArrows = true,
}: MobileSnapRailProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const suppressClick = useRef(false);
  const indexRef = useRef(0);
  const stepRef = useRef(0);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    locking: "none" | "x" | "y";
    moved: boolean;
  } | null>(null);

  const items = (slides ?? Children.toArray(children)).filter(Boolean);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [step, setStep] = useState(0);

  indexRef.current = index;
  stepRef.current = step;

  const measure = useCallback(() => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-snap-card]");
    if (!track || !card) return;
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "12") || 12;
    const width = card.getBoundingClientRect().width;
    if (width > 0) {
      const next = width + gap;
      stepRef.current = next;
      setStep(next);
    }
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, items.length, cardWidthVw]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(viewport);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const clampIndex = useCallback(
    (value: number) => Math.max(0, Math.min(Math.max(items.length - 1, 0), value)),
    [items.length],
  );

  const goTo = useCallback(
    (next: number) => {
      const clamped = clampIndex(next);
      indexRef.current = clamped;
      setIndex(clamped);
      setOffset(0);
    },
    [clampIndex],
  );

  // Non-passive touch handlers. critical for horizontal swipe on mobile
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || items.length < 2) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      dragRef.current = {
        startX: t.clientX,
        startY: t.clientY,
        lastX: t.clientX,
        locking: "none",
        moved: false,
      };
      setDragging(true);
    };

    const onMove = (e: TouchEvent) => {
      const drag = dragRef.current;
      const t = e.touches[0];
      if (!drag || !t) return;

      const dx = t.clientX - drag.startX;
      const dy = t.clientY - drag.startY;

      if (drag.locking === "none") {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        drag.locking = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }

      if (drag.locking === "y") return;

      // Horizontal swipe. stop page scroll
      e.preventDefault();
      drag.moved = true;
      drag.lastX = t.clientX;
      setOffset(dx);
    };

    const onEnd = () => {
      const drag = dragRef.current;
      if (!drag) return;

      const dx = drag.lastX - drag.startX;
      const currentStep = stepRef.current || Math.min(window.innerWidth * (cardWidthVw / 100), 304) + 12;
      const threshold = Math.max(36, currentStep * 0.18);

      if (drag.locking === "x" && drag.moved) {
        suppressClick.current = true;
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 200);

        if (Math.abs(dx) > threshold) {
          goTo(indexRef.current + (dx < 0 ? 1 : -1));
        } else {
          setOffset(0);
        }
      } else {
        setOffset(0);
      }

      dragRef.current = null;
      setDragging(false);
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onEnd, { passive: true });

    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [items.length, cardWidthVw, goTo]);

  // Mouse drag (desktop emulator / tablet with mouse)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || items.length < 2) return;

    let active = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // handled above
      if (e.button !== 0) return;
      active = true;
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        locking: "x",
        moved: false,
      };
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!active || e.pointerType === "touch") return;
      const drag = dragRef.current;
      if (!drag) return;
      const dx = e.clientX - drag.startX;
      if (Math.abs(dx) > 8) drag.moved = true;
      drag.lastX = e.clientX;
      setOffset(dx);
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (!active) return;
      active = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      const drag = dragRef.current;
      if (!drag) {
        setDragging(false);
        return;
      }

      const dx = drag.lastX - drag.startX;
      const currentStep = stepRef.current || Math.min(window.innerWidth * (cardWidthVw / 100), 304) + 12;
      const threshold = Math.max(36, currentStep * 0.18);

      if (drag.moved) {
        suppressClick.current = true;
        window.setTimeout(() => {
          suppressClick.current = false;
        }, 200);
        if (Math.abs(dx) > threshold) {
          goTo(indexRef.current + (dx < 0 ? 1 : -1));
        } else {
          setOffset(0);
        }
      } else {
        setOffset(0);
      }

      dragRef.current = null;
      setDragging(false);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [items.length, cardWidthVw, goTo]);

  function onClickCapture(e: React.MouseEvent) {
    if (suppressClick.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  if (items.length === 0) return null;

  const fallbackStep =
    typeof window !== "undefined"
      ? Math.min(window.innerWidth * (cardWidthVw / 100), 304) + 12
      : 0;
  const effectiveStep = step || fallbackStep;
  const translate = effectiveStep > 0 ? -(index * effectiveStep) + offset : offset;

  return (
    <div className={cn("relative -mx-4 px-4 lg:hidden", className)}>
      <div
        ref={viewportRef}
        className="cursor-grab overflow-hidden active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
        onClickCapture={onClickCapture}
        aria-roledescription="carousel"
        aria-label="Cards"
      >
        <div
          ref={trackRef}
          className="flex gap-3"
          style={{
            transform: `translate3d(${translate}px, 0, 0)`,
            transition: dragging ? "none" : "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {items.map((child, i) => (
            <div
              key={i}
              data-snap-card
              className="shrink-0 select-none"
              style={{ width: `min(${cardWidthVw}vw, 19rem)` }}
              aria-hidden={i !== index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-3">
          {showArrows ? (
            <button
              type="button"
              aria-label="Previous"
              disabled={index <= 0}
              onClick={() => goTo(index - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cedar-ivory transition enabled:active:scale-95 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
          ) : null}

          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to card ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === index ? "w-5 bg-cedar-accent" : "w-1.5 bg-white/25",
                )}
              />
            ))}
          </div>

          {showArrows ? (
            <button
              type="button"
              aria-label="Next"
              disabled={index >= items.length - 1}
              onClick={() => goTo(index + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-cedar-ivory transition enabled:active:scale-95 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
