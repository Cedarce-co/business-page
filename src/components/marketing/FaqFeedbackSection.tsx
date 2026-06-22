"use client";

import { FormEvent, useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import toast from "react-hot-toast";
import Modal from "@/components/ui/Modal";
import CircleLoader from "@/components/ui/CircleLoader";

const TOPICS = [
  "Something is unclear",
  "Pain point / frustration",
  "Feature idea",
  "Pricing or packages",
  "General feedback",
  "Other",
] as const;

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900";

export default function FaqFeedbackSection() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: TOPICS[0] as string,
    message: "",
  });

  function resetForm() {
    setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
    setSent(false);
  }

  function close() {
    setOpen(false);
    window.setTimeout(resetForm, 200);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (form.message.trim().length < 10) {
      toast.error("Please share a bit more detail (at least 10 characters).");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim() || undefined,
          email: form.email.trim() || undefined,
          topic: form.topic,
          message: form.message.trim(),
          page: "/faq",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((data as { error?: string }).error ?? "Could not send feedback.");
      setSent(true);
      toast.success("Thank you. We received your feedback.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send feedback.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="mt-14 rounded-3xl border border-cliq-gray-200 bg-white p-8 shadow-card sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cliq-teal">Your voice</p>
            <h2 className="text-2xl font-black text-cliq-text-heading sm:text-3xl">
              Still have questions or ideas for us?
            </h2>
            <p className="text-sm leading-relaxed text-cliq-text-body">
              Tell us what&apos;s confusing, what we could improve, or pain points we should solve. Every message is read
              by our team and helps shape Cedarce.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cliq-navy-900 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(17,17,34,0.18)] transition hover:bg-cliq-navy-800"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Share feedback
          </button>
        </div>
      </section>

      <Modal
        open={open}
        onClose={close}
        eyebrow="Feedback"
        title={sent ? "Thank you" : "Share your feedback"}
        widthClassName="max-w-lg"
      >
        {sent ? (
          <div className="space-y-4 py-2">
            <p className="text-sm leading-relaxed text-slate-600">
              We&apos;ve received your message. If you left an email, we may follow up when we have an update.
            </p>
            <button
              type="button"
              onClick={close}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <p className="text-sm text-slate-600">
              Optional name and email if you&apos;d like a reply. Your message goes straight to our team.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputClass}
                placeholder="Your name (optional)"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
              <input
                className={inputClass}
                type="email"
                placeholder="Email (optional)"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="feedback-topic" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Topic
              </label>
              <select
                id="feedback-topic"
                className={inputClass}
                value={form.topic}
                onChange={(e) => setForm((p) => ({ ...p, topic: e.target.value }))}
              >
                {TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="feedback-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Your message
              </label>
              <textarea
                id="feedback-message"
                required
                rows={5}
                className={`${inputClass} min-h-32`}
                placeholder="What question do you still have? What should we improve? What pain point can we help with?"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              />
            </div>
            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={close}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <CircleLoader size={16} className="text-white" />
                    Sending…
                  </>
                ) : (
                  "Send feedback"
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
