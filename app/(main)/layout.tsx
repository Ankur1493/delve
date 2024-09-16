import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen ">
      <Navbar />
      <div className="flex items-center justify-center drop-shadow-lg">
        <div className="w-[90%]">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
