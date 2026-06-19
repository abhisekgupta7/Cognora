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
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Give your students a <span className="text-[#F97316]">multilingual tutor</span> inside your platform.
          </h1>
          <p className="text-lg font-medium text-[#1C1C1C]/80">
            Cognora plugs right into your LMS. Support your students seamlessly in English, Hindi, and Nepali.
          </p>
          
          {/* AI Chat UI Preview Card with Hindi and Nepali */}
          <div className="bg-white rounded-2xl border border-[#F97316]/20 shadow-sm p-6 mt-6">
            
            {/* AI Message (Hindi) */}
            <div className="flex gap-4 mb-4">
              <div className="bg-[#FAFAF8] text-[#1C1C1C] rounded-2xl rounded-tl-none px-5 py-4 text-sm md:text-base max-w-[85%] border border-[#1C1C1C]/5">
                नमस्ते! मैं कॉग्नोरा हूँ। आज हम गुरुत्वाकर्षण (gravity) के बारे में क्या सीखेंगे?
              </div>
            </div>
            
            {/* Student Message (Nepali/Roman Nepali) */}
            <div className="flex gap-4 justify-end">
              <div className="bg-[#F97316] text-white rounded-2xl rounded-tr-none px-5 py-4 text-sm md:text-base max-w-[85%] font-medium">
                Newton's law of universal gravitation explain garnuhos na.
              </div>
            </div>

          </div>
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
