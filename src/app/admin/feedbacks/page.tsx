import FeedbacksClient from "@/components/admin/FeedbacksClient";

export default function AdminFeedbacksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Feedbacks</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Questions, pain points, and improvement ideas submitted from the FAQ page and other site forms.
        </p>
      </div>
      <FeedbacksClient />
    </div>
  );
}
