"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "bg-black text-black border border-gray-300 shadow-lg dark:bg-black dark:text-white dark:border-gray-700",
        style: {
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "500",
        },
      }}
    />
  );
}
