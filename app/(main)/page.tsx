import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center mt-16 md:mt-4">
        <h1 className="text-4xl mt-2 md:text-8xl font-bold gradient-text pb-3">
          We help you track
        </h1>
        <div className="mt-4 w-fit text-xl md:text-5xl rounded-lg backdrop-blur-md bg-[#E45424] text-white font-bold text-center p-4">
          Supabase Configuration
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-gray-400 md:w-2/4 w-3/4">
        <p className="text-md md:text-xl mt-5 text-center lg:w-[50%]">
          Your Ultimate Solution for Supabase Compliance: Effortlessly monitor
          and manage your Supabase configurations with precision and ease.
        </p>
      </div>
      <Link
        href={"/login"}
        className="mt-6 p-3 px-5 border-white bg-black text-white text-[20px] font-semibold rounded-xl"
      >
        Get Started for FREE
      </Link>
    </div>
  );
}
