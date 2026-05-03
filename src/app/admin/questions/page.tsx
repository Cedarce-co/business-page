import Link from "next/link";
import { listQuestionSets } from "@/server/services/intake-question-sets";
type QuestionSetRow = Awaited<ReturnType<typeof listQuestionSets>>[number];

function tone(status: string) {
  if (status === "PUBLISHED") return "bg-emerald-50 text-emerald-800 border-emerald-200";
  if (status === "DRAFT") return "bg-amber-50 text-amber-800 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default async function AdminIntakeQuestionsPage() {
  const sets = await listQuestionSets();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Intake questions
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Create a draft, edit questions, then publish a new version. Existing drafts keep the
            version they started with.
          </p>
        </div>
        <Link
          href="/admin/questions/new"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
        >
          Create draft
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Version</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {sets.map((s: QuestionSetRow) => (
              <tr key={s.id} className="border-t border-slate-200">
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${tone(s.status)}`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{s.version}</td>
                <td className="px-4 py-3 text-slate-700">{s.title}</td>
                <td className="px-4 py-3 text-slate-600">
                  {new Date(s.updatedAt).toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/questions/${s.id}`}
                    className="text-sm font-semibold text-slate-900 underline underline-offset-4"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
            {sets.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-600">
                  No question sets yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

