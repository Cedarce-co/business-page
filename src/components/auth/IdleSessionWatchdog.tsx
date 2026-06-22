"use client";

import { useCallback, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import {
  IDLE_SESSION_MS,
  markSessionStarted,
  recordAdminSessionEnd,
  recordUserSessionEnd,
  type SessionScope,
} from "@/lib/auth/session-tracking";

const ACTIVITY_EVENTS = ["mousedown", "keydown", "scroll", "touchstart", "click"] as const;

export function useIdleSessionWatchdog(scope: SessionScope) {
  const { status } = useSession();

  const onIdle = useCallback(async () => {
    if (scope === "user") {
      await recordUserSessionEnd("IDLE_SIGN_OUT");
      toast("Signed out after 30 minutes of inactivity.", { icon: "⏱️" });
      await signOut({ callbackUrl: "/signin" });
      return;
    }

    await recordAdminSessionEnd("ADMIN_IDLE_SIGN_OUT");
    toast("Admin session ended after 30 minutes of inactivity.", { icon: "⏱️" });
    await signOut({ callbackUrl: "/admin" });
  }, [scope]);

  useEffect(() => {
    if (status !== "authenticated") return;

    markSessionStarted(scope);

    let timer = window.setTimeout(() => {
      void onIdle();
    }, IDLE_SESSION_MS);

    const reset = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        void onIdle();
      }, IDLE_SESSION_MS);
    };

    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, reset, { passive: true });
    }

    return () => {
      window.clearTimeout(timer);
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, reset);
      }
    };
  }, [status, scope, onIdle]);
}

export default function IdleSessionWatchdog({ scope }: { scope: SessionScope }) {
  useIdleSessionWatchdog(scope);
  return null;
}
