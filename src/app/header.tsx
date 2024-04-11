"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, LogInIcon, LogOutIcon, Menu } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function AccountDropdown() {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              account and any data your have.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteAccountAction();
                signOut({ callbackUrl: "/" });
              }}
            >
              Yes, delete my account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"link"}>
            <Avatar className="mr-2">
              <AvatarImage src={session.data?.user?.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">{session.data?.user?.name}</span>
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
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon className="mr-2" /> Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="py-2 z-10 backdrop-blur-md border-b-orange-300 shadow-md dark:drop-shadow-2xl sticky top-0 left-0 w-full">
      <div className="container mx-auto px-3 flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-2 items-center text-lg sm:text-xl hover:underline"
        >
          <div className="relative w-[40px] h-[40px] sm:w-[60px] sm:h-[60px]">
            <Image
              fill
              src="/icon.png"
              alt="the application icon of a magnifying glass"
            />
          </div>
          DevFinder
        </Link>

        <nav className="flex gap-4 sm:gap-8 max-[450px]:hidden">
          {isLoggedIn && (
            <>
              <Link className="hover:underline" href="/browse">
                Browse
              </Link>

              <Link className="hover:underline" href="/your-rooms">
                Your Rooms
              </Link>
            </>
          )}
        </nav>
        {isLoggedIn && (
          <DropdownMenu>
            <DropdownMenuTrigger className="min-[450px]:hidden">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link className="hover:underline" href="/browse">
                  Browse
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Link className="hover:underline" href="/your-rooms">
                  Your Rooms
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className="flex items-center">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button
              className="w-fit p-0"
              onClick={() => signIn()}
              variant="link"
            >
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
