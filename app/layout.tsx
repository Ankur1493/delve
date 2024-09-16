import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { SessionProvider } from 'next-auth/react';
import "./globals.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delve",
  description: "A customer using  Delve needs to check whether their Supabase configuration is set up properly for compliance.",
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
          "min-h-screen h-full w-full max-w-screen",
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
