"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono,Poppins } from "next/font/google";
import "./globals.css";
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut, SignIn} from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appsidebar";
import { ArrowLeftFromLineIcon } from "lucide-react";


const poppins = Poppins({
  variable:"--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body
          className={poppins.className}
        >
          <ClerkProvider>
            <SidebarProvider>
              <AppSidebar/>
              <SidebarTrigger><ArrowLeftFromLineIcon/></SidebarTrigger>
              {children}
            </SidebarProvider>
            
          </ClerkProvider>
          
        </body>
      </html>
    
    
  );
}
