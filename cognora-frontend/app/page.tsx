import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoginForm from "./features/auth/components/login";

export default function Home() {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div>This is the home page.</div>
      <div>
        <p>Organization login information will be displayed here.</p>
        <LoginForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
