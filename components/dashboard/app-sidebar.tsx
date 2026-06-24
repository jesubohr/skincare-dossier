"use client"

import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
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
  { labelKey: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { labelKey: "clients", href: "/dashboard/clients", icon: Users },
  { labelKey: "treatments", href: "/dashboard/treatments", icon: Layers },
  { labelKey: "calendar", href: "/dashboard/calendar", icon: Calendar },
  { labelKey: "appointments", href: "/dashboard/appointments", icon: Calendar },
  { labelKey: "profile", href: "/dashboard/profile", icon: User },
]

const secondaryNav = [
  { labelKey: "settings", href: "/dashboard/settings", icon: Settings },
  { labelKey: "help", href: "/dashboard/help", icon: HelpCircle },
]

export function AppSidebar() {
  const t = useTranslations("Navigation")

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
          <SidebarGroupLabel>{t("menu")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <NavigationItem key={item.href} icon={item.icon} label={t(item.labelKey)} href={item.href} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Support navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>{t("support")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <NavigationItem key={item.href} icon={item.icon} label={t(item.labelKey)} href={item.href} />
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
