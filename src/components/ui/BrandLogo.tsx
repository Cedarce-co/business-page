import { BRAND_LOGOS, LOGO_INTRINSIC } from "@/lib/brand-logos";
import { cn } from "@/lib/utils";

type Props = {
  /** "wordmark" = mark + Cedarce text, "mark" = stacked square mark */
  variant?: "wordmark" | "mark";
  /** Rendered height in px. Width follows the asset's aspect ratio. */
  height?: number;
  /** "brand" = Cedarce blue, "white" = for blue backgrounds */
  tone?: "brand" | "white";
  className?: string;
};

/**
 * Renders the transparent logo PNG as a CSS mask so it can be painted in
 * Cedarce blue (or white) without shipping extra image files.
 */
export default function BrandLogo({ variant = "wordmark", height = 32, tone = "brand", className }: Props) {
  const src = variant === "wordmark" ? BRAND_LOGOS.black.fullTransparent : BRAND_LOGOS.black.mobileTransparent;
  const intrinsic = variant === "wordmark" ? LOGO_INTRINSIC.desktopWordmark : LOGO_INTRINSIC.mobileMark;
  const width = Math.round((height * intrinsic.width) / intrinsic.height);

  return (
    <span
      role="img"
      aria-label="Cedarce"
      className={cn("inline-block shrink-0", tone === "brand" ? "bg-brand-800" : "bg-white", className)}
      style={{
        width,
        height,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "left center",
        maskPosition: "left center",
      }}
    />
  );
}
