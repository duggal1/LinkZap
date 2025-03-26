/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  BarChart3Icon,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserPlus,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ThemeToggle } from "../ui/theme-toggle";

export function Header() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <header className="border-b border-slate-100 dark:border-zinc-900 backdrop-blur-lg bg-white/70 dark:bg-black/80 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href={"/"} className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          {/* LinkSnip */}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button variant={"ghost"} size={"sm"} className="hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all duration-200" asChild>
            <Link href={"/stats"} className="flex items-center gap-2">
              <BarChart3Icon className="size-4 text-indigo-500" />
              <span className="font-medium">Stats</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant={"ghost"} size={"sm"} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200" asChild>
                <Link href={"/dashboard"} className="flex items-center gap-2">
                  <LayoutDashboard className="size-4 text-purple-500" />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </Button>

              <Button variant={"ghost"} size={"sm"} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200" asChild>
                <Link href={"/dashboard/stats"} className="flex items-center gap-2">
                  <BarChart3Icon className="size-4 text-violet-500" />
                  <span className="font-medium">My Stats</span>
                </Link>
              </Button>

              <Button variant={"ghost"} size={"sm"} 
                className="hover:bg-red-50 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 transition-all duration-200"
                onClick={() => signOut()}>
                <LogOut className="size-4 mr-2" />
                <span className="font-medium">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant={"ghost"} size={"sm"} className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200" asChild>
                <Link href={"/login"} className="flex items-center gap-2">
                  <LogIn className="size-4 text-indigo-500" />
                  <span className="font-medium">Login</span>
                </Link>
              </Button>

              <Button variant={"ghost"} size={"sm"} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-all duration-200" asChild>
                <Link href={"/register"} className="flex items-center gap-2">
                  <UserPlus className="size-4" />
                  <span className="font-medium">Register</span>
                </Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"} className="hover:bg-slate-100 dark:hover:bg-slate-800">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] backdrop-blur-xl bg-white/95 dark:bg-slate-950/95">
              <SheetHeader>
                <SheetTitle className="text-xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-3 mt-8">
                <Button variant={"ghost"} size={"sm"} className="justify-start hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200" asChild>
                  <Link href={"/stats"} className="flex items-center gap-3">
                    <BarChart3Icon className="size-4 text-indigo-500" />
                    <span className="font-medium">Stats</span>
                  </Link>
                </Button>

                {isAuthenticated ? (
                  <>
                    {/* ...existing authenticated mobile nav buttons with same styling... */}
                  </>
                ) : (
                  <>
                    {/* ...existing non-authenticated mobile nav buttons with same styling... */}
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}