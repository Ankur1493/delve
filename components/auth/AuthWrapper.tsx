"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface AuthWrapperProps {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

export const AuthWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: AuthWrapperProps) => {
  return (
    <Card className="w-[350px] sm:w-[400px] shadow-md bg-white bg-opacity-10 flex flex-col ">
      <CardHeader>
        <h1
          className={cn(
            "text-3xl text-white font-semibold text-center",
            font.className
          )}
        >
          {headerLabel}
        </h1>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Link
          href={backButtonHref}
          className="flex w-full text-white gap-2 justify-center items-center"
        >
          {backButtonLabel}
          <ArrowUpRight color="white" />
        </Link>
      </CardFooter>
    </Card>
  );
};
