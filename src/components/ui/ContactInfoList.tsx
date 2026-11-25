import type { ReactNode } from "react";
import { Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import {
  OFFICE_ADDRESS,
  OFFICE_HOURS,
  OFFICE_HOURS_SHORT,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_DISPLAY,
  SUPPORT_PHONE_TEL,
} from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

export const CONTACT_ICON_CLASS = {
  mail: "text-brand-500",
  phone: "text-brand-600",
  address: "text-brand-700",
  clock: "text-brand-400",
  globe: "text-brand-600",
} as const;

/** "dark" = public light pages (legacy name), "onBlue" = on Cedarce-blue panels */
type Variant = "default" | "dark" | "onBlue" | "legal" | "dashboard";

type Props = {
  variant?: Variant;
  showAddress?: boolean;
  showHours?: boolean;
  showWebsite?: boolean;
  hours?: "short" | "full";
  className?: string;
};

function rowClass(variant: Variant) {
  if (variant === "onBlue") return "text-sm text-brand-50 [&_svg]:!text-brand-200";
  if (variant === "dark") return "text-sm text-slate-600";
  if (variant === "dashboard") return "text-sm text-slate-900";
  if (variant === "legal") return "text-sm leading-relaxed text-slate-500";
  return "text-sm text-slate-500";
}

function linkClass(variant: Variant) {
  if (variant === "onBlue") return "font-medium text-white underline-offset-4 hover:underline";
  if (variant === "dark") return "font-medium underline-offset-2 hover:underline";
  if (variant === "dashboard") return "font-semibold underline-offset-4 hover:underline";
  if (variant === "legal") return "font-medium text-brand-950 underline-offset-4 hover:underline";
  return "font-medium underline-offset-4 hover:underline";
}

function hoursClass(variant: Variant) {
  if (variant === "onBlue") return "text-brand-100/90";
  if (variant === "dark") return "text-slate-600";
  if (variant === "dashboard") return "text-slate-700";
  if (variant === "legal") return "text-slate-500";
  return "text-slate-500";
}

function ContactRow({
  icon: Icon,
  iconClass,
  variant,
  children,
}: {
  icon: typeof Mail;
  iconClass: string;
  variant: Variant;
  children: ReactNode;
}) {
  return (
    <div className={`flex w-full items-start gap-2.5 ${rowClass(variant)}`}>
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`} aria-hidden />
      <span className="min-w-0 break-words">{children}</span>
    </div>
  );
}

export default function ContactInfoList({
  variant = "default",
  showAddress = false,
  showHours = true,
  showWebsite = false,
  hours = "short",
  className = "",
}: Props) {
  const hoursLabel = hours === "full" ? OFFICE_HOURS : OFFICE_HOURS_SHORT;
  const websiteHost = SITE_URL.replace(/^https?:\/\//, "");
  const space = variant === "dashboard" ? "space-y-3" : "space-y-2.5";

  return (
    <div className={`flex flex-col ${space} ${className}`.trim()}>
      {showAddress ? (
        <ContactRow icon={MapPin} iconClass={CONTACT_ICON_CLASS.address} variant={variant}>
          {OFFICE_ADDRESS}
        </ContactRow>
      ) : null}

      <ContactRow icon={Mail} iconClass={CONTACT_ICON_CLASS.mail} variant={variant}>
        <a href={`mailto:${SUPPORT_EMAIL}`} className={linkClass(variant)}>
          {SUPPORT_EMAIL}
        </a>
      </ContactRow>

      <ContactRow icon={Phone} iconClass={CONTACT_ICON_CLASS.phone} variant={variant}>
        <a href={`tel:${SUPPORT_PHONE_TEL}`} className={linkClass(variant)}>
          {SUPPORT_PHONE_DISPLAY}
        </a>
      </ContactRow>

      {showHours ? (
        <ContactRow icon={Clock} iconClass={CONTACT_ICON_CLASS.clock} variant={variant}>
          <span className={hoursClass(variant)}>
            {variant === "dark" || variant === "onBlue" ? `Office hours: ${hoursLabel}` : hoursLabel}
          </span>
        </ContactRow>
      ) : null}

      {showWebsite ? (
        <ContactRow icon={Globe} iconClass={CONTACT_ICON_CLASS.globe} variant={variant}>
          <a href={SITE_URL} className={linkClass(variant)}>
            {websiteHost}
          </a>
        </ContactRow>
      ) : null}
    </div>
  );
}
