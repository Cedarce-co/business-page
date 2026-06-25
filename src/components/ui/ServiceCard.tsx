import type { ReactNode } from "react";
import { motion } from "framer-motion";
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
import Badge from "@/components/ui/Badge";
import { ruledCell } from "@/lib/ruled-layout";
import { cn } from "@/lib/utils";

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
    <motion.div className={cn("group h-full", ruledCell)}>
      <div className="mb-4 w-fit rounded-xl bg-cliq-purple-soft p-3">
        <Icon className="h-6 w-6 text-cliq-purple" />
      </div>
      {service.badge ? (
        <Badge variant="popular" className="mb-3">
          {service.badge}
        </Badge>
      ) : null}
      <h3 className="mb-2 text-lg font-bold text-cliq-text-heading">{service.name}</h3>
      <p className="mb-4 text-sm leading-relaxed text-cliq-text-body">{service.desc}</p>
      <Link
        href={`/services/${service.id}`}
        className="text-sm font-semibold text-cliq-purple"
      >
        See what we can build for you →
      </Link>
    </motion.div>
  );
}
