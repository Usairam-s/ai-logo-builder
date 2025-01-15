"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Header() {
  const { user } = useUser();
  return (
    <header className="border-b w-full shadow-sm">
      <nav className="flex items-center justify-between p-4 md:px-10 lg:px-14 ">
        <h1 className="text-xl cursor-pointer bg-primary text-white p-2 rounded-md shadow-lg md:text-2xl lg:text-3xl font-bold">
          <Link href={"/"}>AiLogoMaker</Link>
        </h1>

        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={"/dashboard"}>Dashbaord</Link>
              </Button>
              <UserButton />
            </div>
          ) : (
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <Button>Get Started</Button>
            </SignInButton>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
