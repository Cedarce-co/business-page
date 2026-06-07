import { NextResponse } from "next/server";
import { getApiUserId } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import { MAX_UPLOAD_BYTES } from "@/lib/upload-limits";
import { storeUpload, UploadConfigError } from "@/server/uploads/store";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const userId = await getApiUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file." }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: `File must be ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB or less.` },
        { status: 400 },
      );
    }

    const url = await storeUpload({
      folder: "avatars",
      userId,
      file,
      access: "public",
    });

    await prisma.user.update({ where: { id: userId }, data: { image: url } });

    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof UploadConfigError) {
      console.error("[profile/photo] upload config:", error.message);
      return NextResponse.json({ error: error.message }, { status: 503 });
    }

    console.error("[profile/photo] upload failed:", error);
    return NextResponse.json({ error: "Could not upload photo." }, { status: 500 });
  }
}
