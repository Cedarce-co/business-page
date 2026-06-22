import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiUserId, getApiAdminUser } from "@/lib/server-auth";
import { getUserSession } from "@/server/auth/session";
import { getKycDocumentForActor, type KycDocumentField } from "@/server/services/kyc-documents";
import { getRequestMeta } from "@/server/lib/request-meta";
import { rateLimit, rateLimitResponse } from "@/server/lib/rate-limit";

const querySchema = z.object({
  field: z.enum(["govId", "cac", "addressProof"]),
  userId: z.string().optional(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    field: url.searchParams.get("field"),
    userId: url.searchParams.get("userId") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid document request." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limited = rateLimit(`kyc-doc:${ip}`, 30);
  if (!limited.ok) return rateLimitResponse(limited);

  const userSessionId = await getApiUserId();
  const userSession = await getUserSession();
  const adminUser = await getApiAdminUser();

  const targetUserId = parsed.data.userId ?? userSessionId;
  if (!targetUserId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const isAdmin = Boolean(adminUser?.id);
  if (parsed.data.userId && !isAdmin) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  if (!parsed.data.userId && !userSessionId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const actorUserId = isAdmin && parsed.data.userId ? adminUser!.id : userSessionId!;
  const actorEmail =
    isAdmin && parsed.data.userId ? (adminUser?.email ?? "") : (userSession?.user?.email ?? "");

  const meta = await getRequestMeta();

  try {
    const file = await getKycDocumentForActor({
      actorUserId,
      actorEmail: actorEmail || (adminUser?.email ?? ""),
      actorType: isAdmin && parsed.data.userId ? "ADMIN" : "USER",
      targetUserId,
      field: parsed.data.field as KycDocumentField,
      meta,
    });

    return new NextResponse(file.body, {
      status: 200,
      headers: {
        "Content-Type": file.contentType,
        "Content-Disposition": `inline; filename="${file.filename}"`,
        "Cache-Control": "private, no-store, max-age=0",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load document.";
    const status = message === "Forbidden." ? 403 : message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
