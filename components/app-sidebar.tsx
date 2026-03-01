"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon, Home, Users, Calendar, Settings, ChevronsUpDown, Flower, UserRound } from "lucide-react"
import { cn } from "@/lib/utils"

import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Users, label: "Clients", href: "#" },
  { icon: Calendar, label: "Calendar", href: "#" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function AppSidebar() {
  const { state } = useSidebar()

  const mockUser = {
    name: "Isabella",
    image: "/isabella.jpg",
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={cn("flex-row items-center justify-between gap-0 pt-3", state === "collapsed" && "px-2")}>
        <div className={cn("flex items-center gap-2 transition-opacity", state === "collapsed" && "opacity-0 w-0 pointer-events-none")}>
          <div className="bg-primary rounded-full p-2">
            <Flower className="size-6 text-white" />
          </div>
          <span className="text-lg font-medium leading-none">
            Skincare
            <br />
            Dossier
          </span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <NavigationItem key={item.label} icon={item.icon} label={item.label} href={item.href} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserOptions user={mockUser} isCollapsed={state === "collapsed"} />
      </SidebarFooter>
    </Sidebar>
  )
}

function NavigationItem({ icon: Icon, label, href }: { icon: LucideIcon; label: string; href: string }) {
  const pathname = usePathname()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={pathname === href}>
        <Link href={href}>
          <Icon />
          <span className="text-base">{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

interface UserOptionsProps {
  user: {
    name: string
    image?: string
  }
  isCollapsed: boolean
}

function UserOptions({ user, isCollapsed }: UserOptionsProps) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user?.image} alt={user.name} />
                  <AvatarFallback className="bg-primary text-white">
                    <UserRound />
                  </AvatarFallback>
                </Avatar>
                <span className="text-base">{user.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" sideOffset={12} className={cn("w-56 rounded-xl", isCollapsed && "ml-4")}>
            <DropdownMenuItem>
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
