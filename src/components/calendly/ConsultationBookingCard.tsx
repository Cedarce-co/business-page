import { CalendarCheck } from "lucide-react";
import CalendlyBookButton from "@/components/calendly/CalendlyBookButton";
import { getCalendlyUrl, isCalendlyConfigured } from "@/lib/calendly";

export default function ConsultationBookingCard({
  reviewNote,
}: {
  reviewNote?: string | null;
}) {
  if (!isCalendlyConfigured()) return null;

  const link = getCalendlyUrl();
  const noteMentionsBooking =
    reviewNote?.toLowerCase().includes("calendly") ||
    reviewNote?.toLowerCase().includes("book a time") ||
    reviewNote?.toLowerCase().includes("consultation");

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
          <CalendarCheck className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-900">Schedule your consultation</p>
          <p className="mt-1 text-sm text-slate-700">
            {noteMentionsBooking
              ? "Use the button below to pick a time, or reply on your request if you'd rather we book for you."
              : "Pick a time that works for you, or tell us your availability and we'll schedule it for you."}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <CalendlyBookButton className="w-full sm:w-auto" />
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-sm font-semibold text-emerald-900 underline underline-offset-4 hover:text-emerald-950"
            >
              Open scheduling page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
