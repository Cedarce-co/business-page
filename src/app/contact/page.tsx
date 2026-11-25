"use client";

import { FormEvent, useState } from "react";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import { Check } from "lucide-react";
import WhatsAppButton, { WhatsAppIcon } from "@/components/ui/WhatsAppButton";
import CalendlyBookButton from "@/components/calendly/CalendlyBookButton";
import MarketingSplitShell from "@/components/marketing/MarketingSplitShell";
import ContactInfoList from "@/components/ui/ContactInfoList";
import CircleLoader from "@/components/ui/CircleLoader";
import { Input, Textarea } from "@/components/ui/FormField";
import { CONTACT_HERO_IMAGE } from "@/lib/marketing-images";

export default function ContactPage() {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Could not send your message.");
      }
      setDone(true);
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#1F3A5F", "#2A65B2", "#347AD5", "#99BCEA", "#FFFFFF"],
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your message. Please try WhatsApp instead.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white bg-mesh-light px-4 text-center">
        <div>
          <span className="btn-sheen mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-g-button text-white shadow-glow">
            <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden />
          </span>
          <h1 className="mt-8 font-display text-5xl font-semibold tracking-[-0.04em] text-brand-950 sm:text-6xl">
            Message sent
          </h1>
          <p className="mx-auto mt-4 max-w-md text-slate-500">
            Thanks. We&apos;ll reply by email during office hours. Need us sooner? WhatsApp is the fastest way.
          </p>
          <WhatsAppButton variant="outline" className="mt-8">
            Chat on WhatsApp
          </WhatsAppButton>
        </div>
      </section>
    );
  }

  return (
    <MarketingSplitShell
      image={CONTACT_HERO_IMAGE}
      eyebrow="Contact"
      title="Let’s talk about your business."
      description="Tell us where you are today. We’ll suggest a simple setup and give you a clear price."
      aside={
        <>
          <CalendlyBookButton variant="onBlue" label="Or pick a time for a call" />
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-100">Reach us directly</p>
            <div className="mt-4">
              <ContactInfoList variant="onBlue" showAddress showHours hours="full" />
            </div>
          </div>
        </>
      }
    >
      {/* WhatsApp first: it's how most of our clients reach us */}
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-deep-blue p-6 text-white shadow-lift sm:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-line-grid-light opacity-50" />
        <div className="flex items-start gap-4">
          <span className="glass-blue flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-200">Fastest reply</p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
              Chat with us on WhatsApp
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-brand-100/85">
              Most of our clients reach us here. Send us a message and we’ll reply quickly.
            </p>
          </div>
        </div>
        <WhatsAppButton variant="onBanner" className="mt-6 min-h-12 w-full sm:w-auto sm:px-8">
          Chat with us on WhatsApp
        </WhatsAppButton>
      </div>

      <div className="my-8 flex items-center gap-4 text-sm font-medium text-slate-400">
        <span className="h-px flex-1 bg-line" />
        or
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="rounded-[2rem] border border-line bg-white p-6 shadow-soft sm:p-8 lg:p-10">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] text-brand-950 sm:text-3xl">
          Prefer a form?
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Leave your details and we&apos;ll get back to you by email.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input required variant="dark" name="firstName" autoComplete="given-name" placeholder="First name" />
            <Input required variant="dark" name="lastName" autoComplete="family-name" placeholder="Last name" />
          </div>
          <Input required variant="dark" name="business" autoComplete="organization" placeholder="Business name" />
          <Input required variant="dark" type="email" name="email" autoComplete="email" placeholder="Email" />
          <Input variant="dark" type="tel" name="phone" autoComplete="tel" placeholder="Phone (optional)" />
          <Textarea required variant="dark" rows={5} name="message" minLength={5} placeholder="What are you looking to set up?" />
          <p className="text-xs text-slate-400">You agree we may contact you about your request. No spam.</p>
          <button
            type="submit"
            disabled={sending}
            className="btn-sheen inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-g-button px-8 text-[15px] font-semibold text-white shadow-glow-sm transition hover:-translate-y-0.5 hover:shadow-glow disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
          >
            {sending ? <CircleLoader size={18} className="text-white" /> : null}
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </MarketingSplitShell>
  );
}
