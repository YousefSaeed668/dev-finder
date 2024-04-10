"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
function AccountDropDown() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOutIcon className="mr-2" />
          Sign Out
        </DropdownMenuItem>

        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export const Header = () => {
  const session = useSession();
  const isLoggedIn = !!session.data;
  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 container mx-auto z-10 relative">
      <div className="flex justify-between items-center">
        <div>
          <Link
            href="/"
            className="flex gap-2 items-center text-xl hover:underline"
          >
            <Image src="/icon.png" width={50} height={50} alt="icon" />
            DevFinder
          </Link>
        </div>
        <nav className="flex gap-8">
          {isLoggedIn && (
            <>
              <Link href="/browse" className="hover:underline">
                Browse
              </Link>
              <Link href="/your-rooms" className="hover:underline">
                Your Rooms
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropDown />}
          {!isLoggedIn && (
            <Button variant="link" onClick={() => signIn("google")}>
              <LogInIcon className="mr-2" />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
