import ProfileForm from "@/components/dashboard/ProfileForm";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/server-auth";
import { Page } from "@/components/dashboard/ui";

export default async function ProfilePage() {
  const session = await requireUser();
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { profile: true },
  });

  return (
    <Page
      title="Profile settings"
      subtitle="Update your personal settings here. Account verification is a separate requirement for service access."
    >
      <ProfileForm
        initial={{
          name: user?.name ?? "",
          image: user?.image ?? "",
          phone: user?.phone ?? "",
          address: user?.profile?.address ?? "",
          city: user?.profile?.city ?? "",
          country: user?.profile?.country ?? "",
        }}
      />
    </Page>
  );
}
