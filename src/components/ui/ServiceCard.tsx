/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE - paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
import Link from "next/link";
import { motion } from "framer-motion";
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
import { scaleIn } from "@/lib/animations";

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
    <motion.div
      variants={scaleIn}
      className="group rounded-2xl border border-cliq-gray-200 bg-white p-6 shadow-card transition-all duration-300 hover:border-cliq-purple/30 hover:shadow-card-hover"
    >
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
