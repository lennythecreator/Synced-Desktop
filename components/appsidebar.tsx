import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { ArmchairIcon, Circle, HomeIcon, Recycle, UserCircle } from "lucide-react"
import Link from "next/link"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader className="text-lg p-4 font-medium flex flex-row items-center"><Recycle/>Synced</SidebarHeader>
        <SidebarGroup>
            <SidebarGroupLabel>Nodes</SidebarGroupLabel>
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
               
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}