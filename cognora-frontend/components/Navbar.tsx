import Link from "next/link";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ClerkProvider } from "@clerk/nextjs";

export default function Navbar() {
  return (
   <nav className="bg-[#FAFAF8] border-b border-[#1C1C1C]/5 px-6 py-4 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Brand & Main Navigation */}
        <div className="flex items-center gap-10">
          
          {/* Brand Logo - Bold and prominent with an accent dot */}
          <Link
            href="/"
            className="text-2xl font-bold text-[#1C1C1C] tracking-tight"
          >
            Cognora<span className="text-[#F97316]">.</span>
          </Link>

          {/* Nav Links - Grouped together with medium weight and orange hover state */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/courses"
              className="text-[#1C1C1C]/70 hover:text-[#F97316] font-medium transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/billing"
              className="text-[#1C1C1C]/70 hover:text-[#F97316] font-medium transition-colors"
            >
              Billing
            </Link>
          </div>
        </div>

        {/* Right Side: Auth & User Actions */}
        <div className="flex items-center gap-4 cursor-pointer">
          <Show when="signed-out">
            {/* Note: Ensure your SignInButton inherits or uses a rounded-2xl CTA style (e.g. bg-[#F97316] text-white px-6 py-2.5 rounded-2xl font-medium) */}
            <SignInButton  />
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
        
      </div>
    </nav>
  );
}
