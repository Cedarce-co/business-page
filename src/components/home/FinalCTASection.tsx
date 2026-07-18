"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionReveal from "@/components/ui/SectionReveal";
import { FINAL_CTA_IMAGE } from "@/lib/marketing-images";

export default function FinalCTASection() {
  return (
    <SectionReveal className="bg-black pb-14 pt-12 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 lg:rounded-none">
          <div className="absolute inset-0">
            <Image
              src={FINAL_CTA_IMAGE.src}
              alt=""
              fill
              sizes="1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50" />
          </div>
          <div className="relative grid items-center gap-5 px-5 py-9 text-center sm:gap-6 sm:px-10 sm:py-14 lg:grid-cols-[1fr_auto] lg:gap-8 lg:px-16 lg:text-left">
            <div className="flex min-w-0 flex-col items-center lg:items-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cedar-accent">Next step</p>
              <h2 className="mt-3 font-display text-[1.65rem] leading-tight text-cedar-ivory sm:mt-4 sm:text-4xl lg:text-5xl">
                Look credible where people check first.
              </h2>
            </div>
            <div className="flex w-full justify-center lg:w-auto lg:justify-start">
              <Button href="/contact" variant="accent" className="min-h-12 w-1/2 whitespace-nowrap px-3 text-xs sm:w-auto sm:px-8 sm:text-base">
                Book free consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
