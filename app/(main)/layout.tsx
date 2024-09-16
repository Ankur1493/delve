import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";


export default function({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "overflow-y-hidden h-screen bg-background font-sans antialiased bg-gradient-to-tl from-black via-[#1e0801] to-[#2c0c02]",
      )}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
