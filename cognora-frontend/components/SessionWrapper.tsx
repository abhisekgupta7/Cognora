"use client";
import { SessionProvider } from "next-auth/react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClerkProvider
        signInUrl="/login"
        signUpUrl="/login"
      >
        {children}
      </ClerkProvider>
    </SessionProvider>
  );
}