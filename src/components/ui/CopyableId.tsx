"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  value: string;
  href?: string;
  label?: string;
  className?: string;
};

export default function CopyableId({ value, href, label = "ID", className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  }

  return (
    <span className={`inline-flex max-w-full items-center gap-1.5 ${className}`}>
      {href ? (
        <Link href={href} className="min-w-0 truncate font-mono text-xs font-semibold text-slate-900 hover:underline">
          {value}
        </Link>
      ) : (
        <span className="min-w-0 truncate font-mono text-xs font-semibold text-slate-900">{value}</span>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void copy();
        }}
        className="inline-flex shrink-0 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        aria-label={`Copy ${label.toLowerCase()}`}
        title={`Copy ${label.toLowerCase()}`}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </span>
  );
}
