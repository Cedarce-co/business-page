"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionIntro from "@/components/ui/SectionIntro";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection() {
  return (
    <section className="bg-cliq-gray-100 py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionIntro>
          <SectionLabel className="border border-cliq-gray-300 bg-white text-cliq-text-heading">
            Social proof
          </SectionLabel>
          <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
            Real businesses.
            <br />
            Real results. Real fast.
          </h2>
        </SectionIntro>
        <div className="mt-10 overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ left: -900, right: 0 }}
            className="flex gap-4 cursor-grab active:cursor-grabbing"
          >
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={item.name} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
