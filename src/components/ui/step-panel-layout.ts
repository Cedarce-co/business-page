/** Step-by-step intake wizard (one question per screen). */
export const stepPanelHeightClass =
  "h-[calc(100dvh-12rem)] lg:h-[calc(100dvh-15rem)]";

/** Wizard when another block sits above it (e.g. “Your requests”). */
export const stepPanelCompactHeightClass =
  "h-[calc(100dvh-12rem)] lg:h-[calc(100dvh-23rem)]";

/** Full-form edit / read panels — taller than the step wizard. */
export const formPanelHeightClass =
  "h-[calc(100dvh-12rem)] lg:h-[calc(100dvh-14rem)]";

export type StepShellVariant = "wizard" | "wizard-compact" | "form";

export function stepShellHeightClass(variant: StepShellVariant = "wizard") {
  switch (variant) {
    case "wizard-compact":
      return stepPanelCompactHeightClass;
    case "form":
      return formPanelHeightClass;
    default:
      return stepPanelHeightClass;
  }
}
