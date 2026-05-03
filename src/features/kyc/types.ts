import { z } from "zod";

function optionalFormString() {
  return z.preprocess(
    (v) => {
      if (v === null || v === undefined) return undefined;
      if (typeof v !== "string") return undefined;
      const s = v.trim();
      return s.length ? s : undefined;
    },
    z.string().optional(),
  );
}

export const kycTextSchema = z.object({
  businessName: z.string().min(2),
  businessAddress: z.string().min(5),
  businessCity: z.string().min(2),
  businessState: z.string().min(2),
  businessWebsite: optionalFormString(),
  businessEmail: optionalFormString(),
  socialHandle: optionalFormString(),
  cacNumber: optionalFormString(),
  govIdType: z.string().min(2),
});

export type KycInput = z.infer<typeof kycTextSchema> & {
  govIdFile: File | null;
  cacFile?: File | null;
};
