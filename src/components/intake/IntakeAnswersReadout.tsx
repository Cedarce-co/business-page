import type { IntakeAnswerSection } from "@/features/intake/format-answers";

export default function IntakeAnswersReadout({
  sections,
  meta,
  fillParent = false,
}: {
  sections: IntakeAnswerSection[];
  meta?: { packageTier?: string; questionsVer?: string; submittedAt?: string | null };
  /** When true, expand scroll area to fill a flex parent instead of using a fixed max-height. */
  fillParent?: boolean;
}) {
  if (sections.length === 0) {
    return (
      <p className="text-sm text-slate-600">
        No structured answers were recorded for this intake. If something looks missing, contact support.
      </p>
    );
  }

  return (
    <div className={fillParent ? "flex min-h-0 flex-1 flex-col gap-4" : "flex min-h-0 flex-col gap-4"}>
      {meta ? (
        <div className="shrink-0 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          {meta.packageTier ? (
            <span>
              <span className="font-semibold text-slate-600">Package:</span> {meta.packageTier}
            </span>
          ) : null}
          {meta.questionsVer ? (
            <span>
              <span className="font-semibold text-slate-600">Questionnaire:</span> {meta.questionsVer}
            </span>
          ) : null}
          {meta.submittedAt ? (
            <span>
              <span className="font-semibold text-slate-600">Submitted:</span>{" "}
              {new Date(meta.submittedAt).toLocaleString()}
            </span>
          ) : null}
        </div>
      ) : null}

      <div
        className={
          fillParent
            ? "inner-scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain rounded-xl border border-slate-200/80 bg-slate-50/50 px-3 py-4 sm:px-4"
            : "inner-scroll max-h-[min(28rem,55vh)] overflow-y-auto overscroll-y-contain rounded-xl border border-slate-200/80 bg-slate-50/50 px-3 py-4 sm:px-4"
        }
        role="region"
        aria-label="Intake answers"
      >
        <div className="space-y-8 pr-1">
          {sections.map((block) => (
            <section key={block.section} className="space-y-3">
              <h3 className="border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {block.section}
              </h3>
              <dl className="grid gap-3 sm:grid-cols-1">
                {block.items.map((row, i) => (
                  <div
                    key={`${block.section}-${row.label}-${i}`}
                    className="rounded-xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/90 px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
                  >
                    <dt className="text-xs font-semibold leading-snug text-slate-600">{row.label}</dt>
                    <dd className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-slate-900">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
