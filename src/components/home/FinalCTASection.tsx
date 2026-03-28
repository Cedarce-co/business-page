/*
  ┌─────────────────────────────────────────────────────────┐
  │  CEDARCE COLOUR REFERENCE — paste in every component   │
  └─────────────────────────────────────────────────────────┘
*/
"use client";

import Button from "@/components/ui/Button";

export default function FinalCTASection() {
  return (
    <section className="border-y border-cliq-gray-200 bg-cliq-gray-100 py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-5xl font-black text-cliq-text-heading lg:text-6xl">
          Your business buddy
          <br />
          is ready.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-cliq-text-body">
          Book a free 30-minute consultation and let us show you exactly what Cedarce
          can do for your business. No pressure. No jargon.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact">Book Free Consultation</Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("open-ai-chat"));
              }
            }}
          >
            Open Cedarce AI
          </Button>
        </div>
        <p className="mt-4 text-sm text-cliq-text-muted">We respond within 2 hours · Mon-Sat 8am-8pm</p>
      </div>
    </section>
  );
}
