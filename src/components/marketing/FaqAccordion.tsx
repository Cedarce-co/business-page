"use client";

import { useState } from "react";
import { FAQS } from "@/lib/constants";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQS.map((item, index) => (
        <article key={item.q} className="rounded-xl border border-cliq-gray-200 bg-white">
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-5 py-4 text-left font-semibold text-cliq-text-heading"
            aria-expanded={openIndex === index}
          >
            {item.q}
          </button>
          {openIndex === index ? <p className="px-5 pb-4 text-cliq-text-body">{item.a}</p> : null}
        </article>
      ))}
    </div>
  );
}
