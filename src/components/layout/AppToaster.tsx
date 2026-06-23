"use client";

import { Toaster } from "react-hot-toast";
import ToastNotification from "@/components/layout/ToastNotification";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 4000,
        style: {
          background: "transparent",
          boxShadow: "none",
          border: "none",
          padding: 0,
          margin: 0,
        },
        success: {
          duration: 4000,
        },
        error: {
          duration: 5000,
        },
      }}
    >
      {(t) => <ToastNotification toast={t} />}
    </Toaster>
  );
}
