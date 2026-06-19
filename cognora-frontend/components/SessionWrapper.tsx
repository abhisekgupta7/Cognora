"use client";

import { SessionProvider } from "next-auth/react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </SessionProvider>
  );
}