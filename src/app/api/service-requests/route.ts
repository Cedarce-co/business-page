import { NextResponse } from "next/server";
import { getApiUserId } from "@/lib/server-auth";
import { serviceRequestSchema } from "@/features/service-requests/types";
import { createServiceRequest, getServiceRequests } from "@/server/services/service-requests";

export async function GET() {
  const userId = await getApiUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const requests = await getServiceRequests(userId);
  return NextResponse.json({ requests });
}

export async function POST(request: Request) {
  try {
    const userId = await getApiUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    const body = await request.json();
    const parsed = serviceRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    const result = await createServiceRequest(userId, parsed.data);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 403 });
    }

    return NextResponse.json({ ok: true, request: result.request }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not create service request." }, { status: 500 });
  }
}
