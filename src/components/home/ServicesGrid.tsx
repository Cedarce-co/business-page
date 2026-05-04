"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionIntro from "@/components/ui/SectionIntro";
import ServiceCard from "@/components/ui/ServiceCard";
import { SERVICES } from "@/lib/constants";
import { stagger, viewport } from "@/lib/animations";

export default function ServicesGrid() {
  return (
    <section className="bg-cliq-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionIntro>
          <SectionLabel className="bg-cliq-purple-soft text-cliq-purple">What we deliver</SectionLabel>
          <h2 className="mt-5 text-4xl font-black text-cliq-text-heading lg:text-5xl">
            Invest once in your digital setup.
            <br />
            Benefit every single day after.
          </h2>
          <p className="mt-4 text-lg text-cliq-text-body">
            Five pillars, from web presence to payments to campaigns: one team handles it end to end. Going professional
            isn&apos;t a cost; it&apos;s what makes every other investment in your business work harder.
          </p>
        </SectionIntro>
        <div className="mt-12 -mx-4 overflow-x-auto overscroll-x-contain px-4 pb-1 snap-x snap-mandatory sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex w-max gap-4 sm:w-full sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
          >
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="w-[min(88vw,360px)] shrink-0 snap-start sm:w-auto sm:min-w-0 sm:snap-normal"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
