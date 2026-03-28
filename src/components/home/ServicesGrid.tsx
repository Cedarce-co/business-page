/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { stagger, viewport } from "@/lib/animations";

export default function ServicesGrid() {
  return (
    <section className="bg-cliq-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">
          What We Build For You
        </SectionLabel>
        <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
          Nine services.
          <br />
          One buddy.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-cliq-text-body">
          Your buddy helps you build and run your digital business stack professionally.
        </p>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
