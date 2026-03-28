"use client";

import { useMemo, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import PricingCard from "@/components/ui/PricingCard";
import FinalCTASection from "@/components/home/FinalCTASection";
import { FAQS, PACKAGES, SERVICES } from "@/lib/constants";
import { parseNaira } from "@/lib/utils";

export default function PricingPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const total = useMemo(
    () =>
      SERVICES.filter((service) => selected.includes(service.id)).reduce(
        (sum, service) => sum + parseNaira(service.price),
        0
      ),
    [selected]
  );

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <>
      <section className="bg-cliq-navy-900 pb-16 pt-36 text-center">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionLabel className="bg-cliq-navy-700 text-cliq-teal">Pricing</SectionLabel>
          <h1 className="mt-6 text-5xl font-black text-white lg:text-6xl">
            Simple, transparent pricing.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            You know your options up front. No hidden fees. No drama.
          </p>
        </div>
      </section>

      <section className="bg-cliq-white py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {PACKAGES.map((item) => (
              <PricingCard key={item.name} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cliq-gray-100 py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-cliq-text-heading">Individual service pricing</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-cliq-gray-200 bg-white">
            {SERVICES.map((service) => (
              <div key={service.id} className="flex items-center justify-between border-b border-cliq-gray-200 px-5 py-4 last:border-0">
                <p className="font-medium text-cliq-text-heading">{service.name}</p>
                <p className="text-cliq-purple">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cliq-white py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-cliq-text-heading">Price calculator</h2>
          <p className="mt-2 text-cliq-text-body">Select the services you need.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {SERVICES.map((service) => (
              <label
                key={service.id}
                className="flex items-center gap-3 rounded-xl border border-cliq-gray-200 bg-white p-4"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(service.id)}
                  onChange={() => toggle(service.id)}
                />
                <span className="flex-1 text-cliq-text-heading">{service.name}</span>
                <span className="text-sm text-cliq-text-muted">{service.price}</span>
              </label>
            ))}
          </div>
          <div className="mt-6 rounded-2xl bg-cliq-navy-900 p-6 text-white">
            <p className="text-xl font-black">Estimated investment: ₦{total.toLocaleString()}</p>
            <p className="mt-2 text-sm text-white/70">Final price confirmed in consultation</p>
            <button className="mt-4 rounded-xl bg-g-button px-5 py-3 font-semibold">
              Get a quote for this selection →
            </button>
          </div>
        </div>
      </section>

      <section className="bg-cliq-gray-100 py-20">
        <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-cliq-text-heading">FAQs</h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((item, index) => (
              <article key={item.q} className="rounded-xl border border-cliq-gray-200 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-5 py-4 text-left font-semibold text-cliq-text-heading"
                >
                  {item.q}
                </button>
                {openFaq === index ? <p className="px-5 pb-4 text-cliq-text-body">{item.a}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection />
    </>
  );
}
