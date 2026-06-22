"use client";

import { useEffect } from "react";
import { initTawkEmbed } from "@/lib/tawk";

/** Live chat loads for all visitors on marketing pages — guests are not required to sign up or accept optional cookies. */
export default function TawkToWidget() {
  useEffect(() => {
    initTawkEmbed();
  }, []);

  return null;
}
