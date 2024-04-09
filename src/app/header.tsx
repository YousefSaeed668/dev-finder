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
  const isLoggedIn = !!session.data;
  console.log(session.data?.user?.image);
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
        {isLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2" />
            Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogInIcon className="mr-2" />
            Sign In
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export const Header = () => {
  const session = useSession();
  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 container mx-auto">
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
        <div className="flex items-center gap-4">
          <AccountDropDown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
