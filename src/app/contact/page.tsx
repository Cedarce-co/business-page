"use client";

import { FormEvent, useState } from "react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import { SUPPORT_EMAIL, SUPPORT_PHONE_DISPLAY, SUPPORT_PHONE_TEL } from "@/lib/contact";

export default function ContactPage() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    toast.success("Consultation request sent. Cedarce will reply shortly.");
    confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
  };

  if (done) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-cliq-navy-900 px-4 text-center">
        <div>
          <h1 className="text-5xl font-black text-white">You are booked 🎉</h1>
          <p className="mt-4 text-white/70">
            We will respond shortly with next steps for your business.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cliq-navy-900 pb-20 pt-36">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <form onSubmit={onSubmit} className="rounded-2xl border border-cliq-navy-600 bg-cliq-navy-850 p-6">
          <h1 className="text-3xl font-black text-white">Book your free consultation</h1>
          <p className="mt-2 text-white/70">Tell us what you need.</p>
          <div className="mt-6 space-y-4">
            {["Full name", "Business name", "Email", "Phone"].map((label) => (
              <input
                key={label}
                required
                placeholder={label}
                className="w-full rounded-xl border border-cliq-navy-600 bg-cliq-navy-800 px-4 py-3 text-sm text-white placeholder:text-cliq-navy-300 focus:border-cliq-purple focus:outline-none focus:ring-2 focus:ring-cliq-purple/20 transition"
              />
            ))}
            <textarea
              required
              rows={5}
              placeholder="Tell us what you want to build"
              className="w-full rounded-xl border border-cliq-navy-600 bg-cliq-navy-800 px-4 py-3 text-sm text-white placeholder:text-cliq-navy-300 focus:border-cliq-purple focus:outline-none focus:ring-2 focus:ring-cliq-purple/20 transition"
            />
          </div>
          <button className="mt-6 rounded-xl bg-g-button px-6 py-3 font-semibold text-white shadow-purple">
            Send request
          </button>
        </form>
        <div className="rounded-2xl border border-cliq-navy-600 bg-cliq-navy-850 p-6">
          <h2 className="text-2xl font-black text-white">Reach us directly</h2>
          <p className="mt-4 text-white/70">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="underline-offset-2 hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p className="mt-1 text-white/70">
            <a href={`tel:${SUPPORT_PHONE_TEL}`} className="underline-offset-2 hover:underline">
              {SUPPORT_PHONE_DISPLAY}
            </a>
          </p>
          <p className="mt-6 text-cliq-teal">Response time: within 2 hours (Mon-Sat)</p>
        </div>
      </div>
    </section>
  );
}
