"use client";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn, SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import { Sign } from "crypto";
import { BellIcon, CalendarClock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <SignedIn>
        <div className="flex flex-col">
          <header className="flex w-full">
            <span>Location</span>
            <ul className="flex flex-row gap-4">
              <CalendarClock/>
              <BellIcon/>
            </ul>
            <UserButton/>
          </header>
          <main className="h-auto w-fit flex flex-col items-center justify-center">
            content
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
      
    </div>
  );
}
