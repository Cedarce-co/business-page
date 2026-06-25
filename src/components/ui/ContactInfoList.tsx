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
  mail: "text-sky-600",
  phone: "text-emerald-600",
  address: "text-violet-600",
  clock: "text-amber-600",
  globe: "text-cliq-purple",
} as const;

type Variant = "default" | "dark" | "legal" | "dashboard";

type Props = {
  variant?: Variant;
  showAddress?: boolean;
  showHours?: boolean;
  showWebsite?: boolean;
  hours?: "short" | "full";
  className?: string;
};

function rowClass(variant: Variant) {
  if (variant === "dark") return "text-sm text-white/85";
  if (variant === "dashboard") return "text-sm text-slate-900";
  if (variant === "legal") return "text-sm leading-relaxed text-cliq-text-body";
  return "text-sm text-cliq-text-body";
}

function linkClass(variant: Variant) {
  if (variant === "dark") return "font-medium underline-offset-2 hover:underline";
  if (variant === "dashboard") return "font-semibold underline-offset-4 hover:underline";
  if (variant === "legal") return "font-medium text-cliq-text-heading underline-offset-4 hover:underline";
  return "font-medium underline-offset-4 hover:underline";
}

function hoursClass(variant: Variant) {
  if (variant === "dark") return "text-white/85";
  if (variant === "dashboard") return "text-slate-700";
  if (variant === "legal") return "text-cliq-text-muted";
  return "text-cliq-text-muted";
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
            {variant === "dark" ? `Office hours: ${hoursLabel}` : hoursLabel}
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
