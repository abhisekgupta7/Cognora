"use client";

import { SessionProvider } from "next-auth/react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ClerkProvider
        signInUrl="https://accounts.abhisekgupta7.com.np/sign-in"
        signUpUrl="https://accounts.abhisekgupta7.com.np/sign-up"
      >
        {children}
      </ClerkProvider>
    </SessionProvider>
  );
}
