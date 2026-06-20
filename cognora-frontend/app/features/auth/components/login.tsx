"use client";

import { useState } from "react";
import { Home, Loader2 } from "lucide-react";
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
    <div className="w-full bg-white rounded-2xl border border-[#F97316]/10 p-8 shadow-sm">

  {/* Google Button */}
  <Button
    type="button"
    variant="outline"
    className="w-full h-12 rounded-2xl border border-[#1C1C1C]/15 bg-white text-[#1C1C1C] font-medium hover:bg-[#FAFAF8] hover:border-[#1C1C1C]/30 transition-all flex items-center justify-center gap-3 cursor-pointer"
    onClick={handleGoogleLogin}
    disabled={isGoogleLoading}
  >
    {/* Lucide Icons */}
    {isGoogleLoading ? (
      <Loader2 className="w-5 h-5 animate-spin text-[#F97316]" />
    ) : (
      <Home className="w-5 h-5" /> 
    )}
    
    {/* Human, sentence-case copy */}
    {isGoogleLoading ? "Connecting..." : "Continue with Google"}
  </Button>

</div>
  );
}
