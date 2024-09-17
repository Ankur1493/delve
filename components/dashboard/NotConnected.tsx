"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const NotConnected = () => {
  const router = useRouter();

  const onSupabaseConnect = async () => {
    router.push("api/supabase");
  };

  return (
    <div className=" flex flex-col gap-6 justify-center items-center mt-[50%] md:mt-[8%]">
      <h1 className="text-5xl md:text-8xl font-semibold gradient-text w-3/4 text-center">
        Connect your Supabase account here
      </h1>
      <Button
        onClick={onSupabaseConnect}
        variant="secondary"
        className="bg-[#E65525] bg-opacity-70 hover:bg-opacity-100 hover:bg-[#E65525] px-10 py-5 text-white text-[20px]"
      >
        Connect
      </Button>
    </div>
  );
};
