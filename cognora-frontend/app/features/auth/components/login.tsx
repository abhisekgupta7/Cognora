"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginSchema, type LoginInput } from "../types/auth.types";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

 

  async function handleGoogleLogin() {
    try {
      setIsGoogleLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      toast.error("Google login failed");
      console.error("Google login error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 shadow-sm">
     

      {/* Google Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full h-10 border-white/10 bg-white/5 text-white-200 hover:bg-white/10 cursor-pointer flex items-center justify-center gap-2"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? "Continuing..." : "Google"}
      </Button>

    </div>
  );
}
