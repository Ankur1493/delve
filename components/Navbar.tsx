import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";

export const Navbar = async () => {
  const session = await auth()
  return (
    <nav className="md:m-10 md:mx-20 md:rounded-xl bg-white bg-opacity-10 backdrop-blur-xl text-white shadow-2xl">
      <div className="container mx-auto px-4 flex justify-between items-center py-3">
        <div className="flex items-center space-x-2">
          <Link href="/dashboard">
            <div className="text-2xl font-bold flex items-center">
              <Image
                src="https://getdelve.com/static/media/logo.9b11ea213c1d0090f794.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-sm"
              />
              <span className="ml-2">Delve</span>
            </div>
          </Link>
        </div>

        <div className="flex space-x-4 items-center">
          <div className="flex gap-1 sm:gap-4 items-center justify-center">
            {
              session?.user ?
                (
                  <form action={async () => {
                    "use server"
                    await signOut()
                  }}>
                    <Button variant="link" className="text-muted" type='submit'>Sign Out</Button>
                  </form>) : (
                  <Link href="/login">
                    Login
                  </Link>
                )
            }
          </div>
          <a href="https://github.com/Ankur1493/delve">
            <button className="bg-white text-black px-4 py-1 rounded-xl hover:bg-gray-300">
              Star Us
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
};
