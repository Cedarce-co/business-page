import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2),
  // Accept both absolute URLs (blob/CDN) and local paths like /uploads/...
  image: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (v) =>
        v === undefined ||
        v === "" ||
        v.startsWith("/") ||
        z.string().url().safeParse(v).success,
      "Invalid image URL",
    ),
  phone: z.string().min(7).max(20).optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;

export type ProfileState = {
  name: string;
  image: string;
  phone: string;
  address: string;
  city: string;
  country: string;
};
