import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export const fieldClass =
  "w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm text-slate-900 shadow-[inset_0_1px_2px_rgba(31,58,95,0.04)] outline-none transition placeholder:text-slate-400 hover:border-brand-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60";

/** Public-site fields ("dark" is a legacy name; public pages are white + blue now). */
export const fieldClassDark =
  "w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-[15px] text-brand-950 shadow-[inset_0_1px_2px_rgba(31,58,95,0.04)] outline-none transition placeholder:text-slate-400 hover:border-brand-200 focus:border-brand-400 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-60";

export function Label({
  children,
  className,
  htmlFor,
}: {
  children: ReactNode;
  className?: string;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className={cn("block text-sm font-semibold text-slate-800", className)}>
      {children}
    </label>
  );
}

export function FieldHint({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-1 text-xs text-slate-500", className)}>{children}</p>;
}

export function Input({
  className,
  variant = "default",
  ...props
}: ComponentProps<"input"> & { variant?: "default" | "dark" }) {
  return (
    <input
      className={cn(variant === "dark" ? fieldClassDark : fieldClass, className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  variant = "default",
  ...props
}: ComponentProps<"textarea"> & { variant?: "default" | "dark" }) {
  return (
    <textarea
      className={cn(variant === "dark" ? fieldClassDark : fieldClass, "min-h-28 resize-y", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  variant = "default",
  children,
  ...props
}: ComponentProps<"select"> & { variant?: "default" | "dark" }) {
  return (
    <select className={cn(variant === "dark" ? fieldClassDark : fieldClass, className)} {...props}>
      {children}
    </select>
  );
}

export function FormField({
  label,
  hint,
  htmlFor,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? <Label htmlFor={htmlFor}>{label}</Label> : null}
      {children}
      {hint ? <FieldHint>{hint}</FieldHint> : null}
    </div>
  );
}
