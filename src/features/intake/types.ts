import { z } from "zod";

export const intakeQuestionVisibleWhenSchema = z
  .object({
    questionId: z.string(),
    anyOf: z.array(z.string()).min(1),
  })
  .strict();

export type IntakeQuestionVisibleWhen = z.infer<typeof intakeQuestionVisibleWhenSchema>;

const questionCommon = z.object({
  id: z.string(),
  section: z.string(),
  order: z.number(),
  prompt: z.string(),
  required: z.boolean().default(false),
  visibleWhen: intakeQuestionVisibleWhenSchema.optional(),
});

export const intakeQuestionSchema = z.discriminatedUnion("type", [
  questionCommon.extend({
    type: z.literal("short_text"),
    placeholder: z.string().optional(),
  }),
  questionCommon.extend({
    type: z.literal("paragraph"),
    placeholder: z.string().optional(),
  }),
  questionCommon.extend({
    type: z.literal("single_choice"),
    options: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
  }),
  questionCommon.extend({
    type: z.literal("multi_choice"),
    options: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
    allowOther: z.boolean().optional(),
  }),
]);

export type IntakeQuestion = z.infer<typeof intakeQuestionSchema>;

export const intakeQuestionsResponseSchema = z.object({
  version: z.string(),
  questions: z.array(intakeQuestionSchema),
});

export type IntakeQuestionsResponse = z.infer<typeof intakeQuestionsResponseSchema>;
