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
  phone: optionalFormString(),
  personalAddress: optionalFormString(),
  personalCity: optionalFormString(),
  personalCountry: optionalFormString(),
  businessName: optionalFormString(),
  businessAddress: optionalFormString(),
  businessCity: optionalFormString(),
  businessState: optionalFormString(),
  businessWebsite: optionalFormString(),
  businessEmail: optionalFormString(),
  socialHandle: optionalFormString(),
  cacNumber: optionalFormString(),
  govIdType: optionalFormString(),
});

export type KycInput = z.infer<typeof kycTextSchema> & {
  govIdFile: File | null;
  addressProofFile?: File | null;
  cacFile?: File | null;
  /** Set when the user already uploaded an ID and is not replacing it. */
  hasExistingGovId?: boolean;
  hasExistingAddressProof?: boolean;
};
