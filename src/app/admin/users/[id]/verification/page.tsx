import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAdminUser } from "@/lib/server-auth";
import { getAdminUserDetail } from "@/server/services/admin";
import VerificationReviewClient from "@/components/admin/VerificationReviewClient";

export default async function AdminVerificationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminUser();
  const { id } = await params;
  const user = await getAdminUserDetail(id);
  if (!user) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Verification</p>
          <h1 className="mt-1 truncate text-3xl font-black text-slate-900">{user.name}</h1>
          <p className="truncate text-sm text-slate-600">{user.email}</p>
          <div className="mt-3">
            <Link href={`/admin/users/${user.id}`} className="text-sm font-semibold text-slate-900 underline underline-offset-4">
              Back to user
            </Link>
          </div>
        </div>
      </div>

      <VerificationReviewClient
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          kyc: user.kyc
            ? {
                status: user.kyc.status,
                businessName: user.kyc.businessName,
                businessAddress: user.kyc.businessAddress || user.kyc.address,
                businessCity: user.kyc.businessCity,
                businessState: user.kyc.businessState,
                businessWebsite: user.kyc.businessWebsite,
                businessEmail: user.kyc.businessEmail,
                socialHandle: user.kyc.socialHandle,
                cacNumber: user.kyc.cacNumber,
                cacUrl: user.kyc.cacUrl,
                govIdType: user.kyc.govIdType,
                govIdUrl: user.kyc.govIdUrl,
              }
            : null,
        }}
      />
    </div>
  );
}

