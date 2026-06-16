"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes } from "react";

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  toggleClassName?: string;
  wrapperClassName?: string;
};

export default function PasswordInput({
  className = "",
  wrapperClassName = "",
  toggleClassName = "text-slate-400 hover:text-slate-600",
  id,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={`relative w-full ${wrapperClassName}`.trim()}>
      <input
        {...props}
        id={inputId}
        type={visible ? "text" : "password"}
        className={`${className} pr-11`.trim()}
      />
      <button
        type="button"
        tabIndex={-1}
        className={`absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-0.5 transition ${toggleClassName}`}
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        aria-controls={inputId}
      >
        {visible ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
      </button>
    </div>
  );
}
