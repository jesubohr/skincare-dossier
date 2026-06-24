"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type LucideIcon, Users, Calendar, Settings, LayoutDashboard, User, HelpCircle, Layers } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { AppLogo } from "@/components/shared/app-logo"
import { UserProfileButton } from "@/components/dashboard/user-profile-button"

const mainNav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Treatments", href: "/dashboard/treatments", icon: Layers },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Profile", href: "/dashboard/profile", icon: User },
]

const secondaryNav = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Help", href: "/dashboard/help", icon: HelpCircle },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <AppLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <NavigationItem key={item.href} icon={item.icon} label={item.label} href={item.href} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Support navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <NavigationItem key={item.href} icon={item.icon} label={item.label} href={item.href} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserProfileButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

function NavigationItem({ icon: Icon, label, href }: { icon: LucideIcon; label: string; href: string }) {
  const pathname = usePathname()

  return (
    <SidebarMenuItem key={href}>
      <SidebarMenuButton asChild isActive={pathname === href} tooltip={label}>
        <Link href={href}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
