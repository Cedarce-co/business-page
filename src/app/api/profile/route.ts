import { NextResponse } from "next/server";
import { getApiUserId } from "@/lib/server-auth";
import { profileSchema } from "@/features/profile/types";
import { getUserProfile, updateUserProfile } from "@/server/services/profile";

export async function GET() {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const user = await getUserProfile(userId);

  return NextResponse.json({
    user: {
      id: user?.id,
      name: user?.name ?? "",
      email: user?.email ?? "",
      image: user?.image ?? "",
      phone: user?.phone ?? "",
      address: user?.profile?.address ?? "",
      city: user?.profile?.city ?? "",
      country: user?.profile?.country ?? "",
      kycStatus: user?.kyc?.status ?? "PENDING",
    },
  });
}

export async function PATCH(request: Request) {
  try {
    const userId = await getApiUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const body = await request.json();
    const parsed = profileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid profile data." }, { status: 400 });
    }

    await updateUserProfile(userId, parsed.data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Could not update profile." }, { status: 500 });
  }
}
