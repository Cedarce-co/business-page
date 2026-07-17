/** Step-by-step intake wizard (one question per screen). Desktop only: fixed viewport panel. */
export const stepPanelHeightClass = "max-lg:h-auto lg:h-[calc(100dvh-15rem)]";

/** Wizard when another block sits above it (e.g. verification banner). */
export const stepPanelCompactHeightClass = "max-lg:h-auto lg:h-[calc(100dvh-23rem)]";

/** Full-form edit / read panels. Taller than the step wizard. */
export const formPanelHeightClass = "max-lg:h-auto lg:h-[calc(100dvh-14rem)]";

/** Flex shell for read-only intake panels (mobile scrolls with page). */
export const formPanelShellClass =
  "flex flex-col max-lg:overflow-visible lg:min-h-0 lg:overflow-hidden";

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
