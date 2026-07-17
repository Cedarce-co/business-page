"use client";

import Link from "next/link";
import {
  CreditCard,
  FileText,
  Globe,
  Mail,
  Megaphone,
  MessageSquare,
  Server,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Service } from "@/lib/constants";

const iconMap = {
  Globe,
  Smartphone,
  Server,
  Mail,
  CreditCard,
  FileText,
  MessageSquare,
  TrendingUp,
  Users,
  Megaphone,
};

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Globe;

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-zinc-950 p-6 transition hover:border-cedar-accent/35 hover:bg-cedar-accentSoft sm:p-7">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
        <Icon className="h-5 w-5 text-cedar-accent" />
      </div>
      {service.badge ? (
        <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-cedar-accent">
          {service.badge}
        </span>
      ) : null}
      <h3 className="mb-2 text-xl font-semibold text-cedar-ivory">{service.name}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-cedar-mist">{service.desc}</p>
      <Link
        href={`/services/${service.id}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-cedar-accent transition group-hover:gap-2"
      >
        Learn more →
      </Link>
    </article>
  );
}
