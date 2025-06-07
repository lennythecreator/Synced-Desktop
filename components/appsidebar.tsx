import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { HomeIcon, Recycle, UserCircle } from "lucide-react"
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
                    <SidebarMenuButton asChild><Link href={'/hub'}><HomeIcon/>Hub</Link></SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild><Link href={'/'}><UserCircle/>Proifle</Link></SidebarMenuButton>
                </SidebarMenuItem>
               
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}