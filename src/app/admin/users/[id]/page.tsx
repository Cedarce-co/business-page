import { notFound } from "next/navigation";
import AdminUserDetailClient from "@/components/admin/AdminUserDetailClient";
import { getAdminUserDetail } from "@/server/services/admin";

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getAdminUserDetail(id);
  if (!user) notFound();

  return (
    <AdminUserDetailClient
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt.toISOString(),
        profile: user.profile
          ? { address: user.profile.address, city: user.profile.city, country: user.profile.country }
          : null,
        kyc: user.kyc
          ? {
              status: user.kyc.status,
              dateOfBirth: user.kyc.dateOfBirth ? user.kyc.dateOfBirth.toISOString() : null,
              nationality: user.kyc.nationality,
              address: user.kyc.address,
              businessName: user.kyc.businessName,
              businessAddress: user.kyc.businessAddress,
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
        serviceRequest: user.serviceRequest.map((r) => ({
          id: r.id,
          serviceType: r.serviceType,
          summary: r.summary,
          status: r.status,
          createdAt: r.createdAt.toISOString(),
        })),
      }}
    />
  );
}
