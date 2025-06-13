import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ArmchairIcon, BellIcon, Calendar1Icon, Circle, Clock3Icon, HomeIcon, Recycle, UserCircle } from "lucide-react"
import Link from "next/link"
import Image from 'next/image';
import { Button } from "./ui/button";


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="text-lg p-4 font-medium flex flex-row items-center text-primary"><Recycle/>Synced</SidebarHeader>
        <SidebarGroup>
            <SidebarGroupLabel>Spaces</SidebarGroupLabel>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-[16px] py-5"><Link href={'/hub'}><HomeIcon size={36}/>Hub</Link></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-[16px] py-5"><Link href={'/circles'}><Circle size={36}/>Circles</Link></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-[16px] py-5"><Link href={'/circles'}><ArmchairIcon size={36}/>Hangouts</Link></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild className="text-[16px] py-5"><Link href={'/'}><UserCircle size={36}/>Proifle</Link></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem className="my-4">
                  <div className="p-1 bg-gradient-to-r from-primary to-blue-400 rounded-xl shadow-lg">
                    <div className="p-4 bg-white dark:bg-black rounded-xl flex flex-col items-center gap-2">
                      <h1 className="text-sm font-medium"><BellIcon className="inline-block animate-butler-bell text-primary"/>Upcoming hangout with</h1>
                      <Image src="/Profile.png" alt="Logo" width={150} height={150} className="rounded-md mx-auto" />
                      <p className="font-medium text-primary text-xl text-center">Lenny</p>
                      <span className="flex gap-1"><Calendar1Icon/> Saturday  <br/> <Clock3Icon/>2:30 PM</span>
                      <Button className="rounded-full w-full">Reschedule</Button>
                    </div>
                  </div>
                </SidebarMenuItem>
               
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}