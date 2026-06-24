import { z } from "zod";

const optionalContact = z.preprocess(
  (v) => {
    if (v === null || v === undefined) return undefined;
    if (typeof v !== "string") return undefined;
    const s = v.trim();
    return s.length ? s : undefined;
  },
  z.string().optional(),
);

export const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().transform((v) => v.toLowerCase().trim()),
  password: z.string().min(8),
  phone: optionalContact,
  address: optionalContact,
  city: optionalContact,
  country: optionalContact,
});

export type SignupInput = z.infer<typeof signupSchema>;
