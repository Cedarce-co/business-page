"use client";

import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          border: "1px solid #E4E4EF",
          background: "#FFFFFF",
          color: "#111122",
          boxShadow: "0 8px 32px rgba(10,10,20,0.12)",
        },
      }}
    />
  );
}
