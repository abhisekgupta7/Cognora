"use client";
import { SessionProvider } from "next-auth/react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  console.log("CLERK KEY:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
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