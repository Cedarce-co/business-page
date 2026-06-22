type Answers = Record<string, unknown>;

export function intakeSummaryFromAnswers(answers: Answers, packageTier: string) {
  return (
    (typeof answers.business_one_sentence === "string" && answers.business_one_sentence.trim()) ||
    (typeof answers.business_one_liner === "string" && answers.business_one_liner.trim()) ||
    (typeof answers.vision_notes === "string" && answers.vision_notes.trim()) ||
    (typeof answers.anything_else === "string" && answers.anything_else.trim()) ||
    `Service intake submitted for ${packageTier}`
  );
}

export function intakeBudgetFromAnswers(answers: Answers) {
  return (
    (typeof answers.budget_mind === "string" && answers.budget_mind) ||
    (typeof answers.budget_range === "string" && answers.budget_range) ||
    undefined
  );
}

export function intakeTimelineFromAnswers(answers: Answers) {
  return (
    (typeof answers.timeline_ready === "string" && answers.timeline_ready) ||
    (typeof answers.timeline === "string" && answers.timeline) ||
    undefined
  );
}
