"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/dashboard/ui";
import {
  stepPanelCompactHeightClass,
  stepPanelHeightClass,
  stepShellHeightClass,
  type StepShellVariant,
} from "@/components/ui/step-panel-layout";

export {
  formPanelHeightClass,
  stepPanelCompactHeightClass,
  stepPanelHeightClass,
  stepShellHeightClass,
  type StepShellVariant,
} from "@/components/ui/step-panel-layout";

const footerClass =
  "shrink-0 border-t border-slate-100 bg-white pt-4 pb-[max(0px,env(safe-area-inset-bottom))]";

export default function ScrollableStepShell({
  header,
  footer,
  children,
  compact = false,
  variant,
  scrollResetKey,
  className = "",
}: {
  header?: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  /** @deprecated Use `variant="wizard-compact"` */
  compact?: boolean;
  variant?: StepShellVariant;
  /** Resets scroll position (e.g. wizard step index). */
  scrollResetKey?: string | number;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const resolvedVariant: StepShellVariant =
    variant ?? (compact ? "wizard-compact" : "wizard");
  const heightClass = stepShellHeightClass(resolvedVariant);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [scrollResetKey]);

  return (
    <Card
      className={`grid ${heightClass} grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden p-6 sm:p-7 ${className}`}
    >
      {header ? <div className="shrink-0">{header}</div> : null}
      <div
        ref={scrollRef}
        className="step-scroll-area min-h-0 overflow-y-auto overscroll-y-contain pr-1"
      >
        {children}
      </div>
      <div className={footerClass}>{footer}</div>
    </Card>
  );
}
