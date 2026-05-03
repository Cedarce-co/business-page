import { z } from "zod";

export const serviceRequestSchema = z.object({
  serviceType: z.string().min(2),
  summary: z.string().min(10),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
