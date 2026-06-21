"use client";
import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-[#FAFAF8] border-b border-[#1C1C1C]/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold text-[#1C1C1C] tracking-tight">
            Cognora<span className="text-[#F97316]">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-[#1C1C1C]/70 hover:text-[#F97316] font-medium transition-colors">
              Courses
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="cursor-pointer bg-[#F97316] text-white px-6 py-2.5 rounded-2xl font-medium hover:bg-[#F97316]/90 transition-colors">
                Sign In
              </button>
            </SignInButton>
          ) : (
            <UserButton />
          )}
        </div>
      </div>
    </nav>
  );
}