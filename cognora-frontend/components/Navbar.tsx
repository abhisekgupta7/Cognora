import Link from "next/link";
import { SignInButton, UserButton, Show } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ClerkProvider } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-green-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Cognora
          </Link>
        </div>
        <div>
          <Link
            href="/courses"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Courses
          </Link>
        </div>
        <div>
          <Link
            href="/billing"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Billing
          </Link>
        </div>
        <div className="flex items-center space-x-4 text-white">
          <Show when="signed-out">
            <SignInButton />
          </Show>

          <Show when="signed-in">
            <UserButton />
            
          </Show>
        </div>
      </div>
    </nav>
  );
}
