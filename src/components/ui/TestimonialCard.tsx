import { motion } from "framer-motion";

type Testimonial = {
  name: string;
  role: string;
  stars: number;
  quote: string;
};

export default function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <motion.div className="min-w-[320px] rounded-2xl border border-cliq-gray-200 bg-white p-6 shadow-card">
      <p className="text-sm text-cliq-gold">{"⭐".repeat(item.stars)}</p>
      <p className="mb-5 mt-4 text-sm leading-relaxed text-cliq-text-body">{item.quote}</p>
      <p className="text-sm font-semibold text-cliq-text-heading">{item.name}</p>
      <p className="mt-0.5 text-xs text-cliq-text-muted">{item.role}</p>
    </motion.div>
  );
}
