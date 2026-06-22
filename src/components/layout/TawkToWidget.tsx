"use client";

import { useEffect } from "react";
import { initTawkEmbed } from "@/lib/tawk";

export default function TawkToWidget() {
  useEffect(() => {
    initTawkEmbed();
  }, []);

  return null;
}
