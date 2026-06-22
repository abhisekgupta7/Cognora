import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoginForm from "./features/auth/components/login";

export default function Home() {
  return (
    // Applied warm off-white background and charcoal text, ensuring the requested fonts are used.
    <div className="min-h-screen bg-[#FAFAF8] text-[#1C1C1C] font-sans flex flex-col">
      {/* Navbar Section */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero & Login Section - Lots of whitespace and a clean split layout */}
      <main className="grow max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Value Proposition & Chat Preview */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C]">
            Cognora
          </h1>
          <p className="text-lg md:text-xl font-medium text-[#1C1C1C]/70 max-w-xl">
            An AI tutor agent for LMS platforms. Teaches for English, Nepali, or
            Hindi Courses — with subtitles or without. Assists with teaching, generates
            quizzes, and sends student evaluation reports straight to their
            Gmail.
          </p>
        </div>

        {/* Right Side: LMS Organization Login */}
        <div className="flex flex-col items-center lg:items-end w-full">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#F97316]/10 shadow-sm p-8 lg:p-10">
            <h2 className="text-2xl font-bold mb-2">Platform login</h2>
            <p className="text-[#1C1C1C]/70 mb-8 font-medium">
              Access your LMS organization dashboard.
            </p>

            {/* The LoginForm component should internally use rounded-xl/2xl inputs and orange CTA buttons */}
            <LoginForm />
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
