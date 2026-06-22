export const IDLE_SESSION_MS = 30 * 60 * 1000;

export const SESSION_START_KEYS = {
  user: "cedarce.user.sessionStartedAt",
  admin: "cedarce.admin.sessionStartedAt",
} as const;

export type SessionScope = keyof typeof SESSION_START_KEYS;

export function markSessionStarted(scope: SessionScope) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_START_KEYS[scope], new Date().toISOString());
}

export function readSessionStarted(scope: SessionScope) {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_START_KEYS[scope]);
}

export function clearSessionStarted(scope: SessionScope) {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_START_KEYS[scope]);
}

export async function recordUserSessionEnd(event: "SIGN_OUT" | "IDLE_SIGN_OUT") {
  const sessionStartedAt = readSessionStarted("user");
  try {
    await fetch("/api/auth/session-audit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, sessionStartedAt }),
    });
  } catch {
    // non-blocking
  } finally {
    clearSessionStarted("user");
  }
}

export async function recordAdminSessionEnd(event: "ADMIN_SIGN_OUT" | "ADMIN_IDLE_SIGN_OUT") {
  const sessionStartedAt = readSessionStarted("admin");
  try {
    await fetch("/api/admin/session-audit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ event, sessionStartedAt }),
    });
  } catch {
    // non-blocking
  } finally {
    clearSessionStarted("admin");
  }
}
