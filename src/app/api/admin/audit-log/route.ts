import { NextResponse } from "next/server";
import type { AuditEventType } from "@prisma/client";
import { getApiAdminUser } from "@/server/auth/guards";
import { authAuditCountrySummary, listAuthAuditLogs } from "@/server/services/auth-audit";

export async function GET(request: Request) {
  const admin = await getApiAdminUser();
  if (!admin) return NextResponse.json({ error: "Forbidden." }, { status: 403 });

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "50");
  const cursor = searchParams.get("cursor") ?? undefined;
  const countryCode = searchParams.get("country") ?? undefined;
  const eventType = (searchParams.get("event") as AuditEventType | null) ?? undefined;
  const summary = searchParams.get("summary") === "1";

  if (summary) {
    const countries = await authAuditCountrySummary();
    return NextResponse.json({ countries });
  }

  const data = await listAuthAuditLogs({ limit, cursor, countryCode, eventType });
  return NextResponse.json(data);
}
