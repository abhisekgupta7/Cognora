import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <SignIn fallbackRedirectUrl={process.env.DOMAIN || "http://localhost:3000"}
          />
    </div>
  );
}
