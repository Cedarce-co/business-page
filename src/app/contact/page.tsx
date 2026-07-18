"use client";

import { FormEvent, useState } from "react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import CalendlyBookButton from "@/components/calendly/CalendlyBookButton";
import MarketingSplitShell from "@/components/marketing/MarketingSplitShell";
import ContactInfoList from "@/components/ui/ContactInfoList";
import { Input, Textarea } from "@/components/ui/FormField";
import { CONTACT_HERO_IMAGE } from "@/lib/marketing-images";

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
      <section className="flex min-h-screen items-center justify-center bg-black px-4 text-center">
        <div>
          <h1 className="font-display text-5xl text-cedar-ivory">You are booked</h1>
          <p className="mt-4 text-cedar-mist">
            We will respond shortly with next steps for your business.
          </p>
        </div>
      </section>
    );
  }

  return (
    <MarketingSplitShell
      image={CONTACT_HERO_IMAGE}
      eyebrow="Contact"
      title="There’s no limit to what you can build."
      description="Tell us where your business is today. We’ll map the setup that makes you look credible and get paid faster — first consultation is free."
      aside={
        <>
          <CalendlyBookButton variant="teal" label="Or pick a time on Calendly" />
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cedar-accent">
              Reach us directly
            </p>
            <div className="mt-4">
              <ContactInfoList variant="dark" showAddress showHours hours="full" />
            </div>
          </div>
        </>
      }
    >
      <div className="rounded-[1.75rem] border border-white/10 bg-zinc-950 p-6 sm:p-8 lg:p-10">
        <h2 className="font-display text-2xl text-cedar-ivory sm:text-3xl">Tell us your idea</h2>
        <p className="mt-2 text-sm text-cedar-mist">
          A few details help us prepare a useful first conversation.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required variant="dark" placeholder="First name" />
            <Input required variant="dark" placeholder="Last name" />
          </div>
          <Input required variant="dark" placeholder="Business name" />
          <Input required variant="dark" type="email" placeholder="Email" />
          <Input variant="dark" placeholder="Phone (optional)" />
          <Textarea required variant="dark" rows={5} placeholder="What are you looking to set up?" />
          <p className="text-xs text-white/40">
            You agree we may contact you about your request. No spam — just next steps.
          </p>
          <Button type="submit" variant="accent" className="w-1/2 px-3 text-xs sm:w-auto sm:px-6 sm:text-base">
            Send message
          </Button>
        </form>
      </div>
    </MarketingSplitShell>
  );
}
