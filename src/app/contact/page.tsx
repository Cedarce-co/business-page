"use client";

import { FormEvent, useState } from "react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";
import ContactInfoList from "@/components/ui/ContactInfoList";
import { Input, Textarea } from "@/components/ui/FormField";

export default function ContactPage() {
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
    toast.success("Consultation request sent. We'll reply shortly.");
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
    <section className="relative overflow-hidden bg-cliq-navy-900 pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-mesh-dark opacity-90" />
      <MarketingPageHeader tone="dark" />
      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <SectionLabel className="border border-white/10 bg-white/10 text-white/90 backdrop-blur-sm">
          Contact
        </SectionLabel>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
          Book your free consultation
        </h1>
        <p className="mt-3 max-w-3xl text-balance text-center text-white/70">
          Not sure where to start? That&apos;s exactly what this call is for. Tell us what you need. We&apos;ll respond with clear next steps. Your first consultation is completely free.
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid border-t border-white/10 lg:grid-cols-2 lg:divide-x lg:divide-white/10">
          <form onSubmit={onSubmit} className="bg-white/[0.04] py-8 lg:pr-12">
            <h2 className="text-2xl font-black text-white">Consultation details</h2>
            <p className="mt-2 text-white/70">Share a few details and we will reply quickly.</p>
            <div className="mt-6 space-y-4">
              {["Full name", "Business name", "Email", "Phone"].map((label) => (
                <Input
                  key={label}
                  required
                  variant="dark"
                  placeholder={label}
                />
              ))}
              <Textarea
                required
                variant="dark"
                rows={5}
                placeholder="Tell us what you want to build"
              />
            </div>
            <Button type="submit" variant="teal" className="mt-6 w-full rounded-xl px-6 py-3 text-sm font-bold sm:w-auto">
              Send: let&apos;s get you professional
            </Button>
          </form>
          <div className="border-t border-white/10 bg-white/[0.03] py-8 lg:border-t-0 lg:pl-12">
            <h2 className="text-2xl font-black text-white">Reach us directly</h2>
            <div className="mt-4">
              <ContactInfoList variant="dark" showAddress showHours hours="full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
