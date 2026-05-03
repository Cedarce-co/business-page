import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getApiUserId } from "@/lib/server-auth";
import { prisma } from "@/lib/prisma";
import { savePublicUpload } from "@/server/uploads/local";

export async function POST(request: Request) {
  try {
    const userId = await getApiUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Missing file." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be 5MB or less." }, { status: 400 });
    }

    let url = "";
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`avatars/${userId}/${Date.now()}-${file.name}`, file, { access: "public" });
      url = blob.url;
    } else {
      const saved = await savePublicUpload({ folder: "avatars", userId, file });
      url = saved.url;
    }

    if (url) {
      await prisma.user.update({ where: { id: userId }, data: { image: url } });
    }

    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Could not upload photo." }, { status: 500 });
  }
}

