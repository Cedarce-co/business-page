"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionReveal from "@/components/ui/SectionReveal";
import { FINAL_CTA_IMAGE } from "@/lib/marketing-images";

export default function FinalCTASection() {
  return (
    <SectionReveal className="bg-black pb-28 pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden border border-white/10">
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
          <div className="relative grid items-center gap-8 px-6 py-14 text-center sm:px-10 lg:grid-cols-[1fr_auto] lg:px-16 lg:text-left">
            <div className="flex min-w-0 flex-col items-center lg:items-start">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">Next step</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-cedar-ivory sm:text-4xl lg:text-5xl">
                Look credible where people check first.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
                A clear website, business email, and professional touchpoints help you show up the way buyers expect.
              </p>
            </div>
            <div className="flex w-full justify-center lg:w-auto lg:justify-start">
              <Button href="/signup" variant="accent" className="whitespace-nowrap px-8">
                Get started for free
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
