import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { SessionProvider } from 'next-auth/react';
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delve",
  description: "A customer using  Delve can check whether their Supabase configuration is set up properly for compliance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "overflow-y-hidden overflow-x-hidden h-screen bg-background font-sans antialiased bg-gradient-to-tl from-black via-[#1e0801] to-[#2c0c02]",
          inter.className
        )}
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html >
  );
}
