"use client"

import { ChevronsUpDown, LogOut } from "lucide-react"
import { useTranslations } from "next-intl"
import { useUserStore } from "@/lib/store/user-store"
import { getAvatarInitials } from "@/lib/utils"

import { Skeleton } from "@/components/ui/skeleton"
import { UserAvatar } from "@/components/shared/user-avatar"
import { SidebarMenuButton, useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function UserProfileButton() {
  const t = useTranslations("Navigation")
  const { isMobile } = useSidebar()
  const profile = useUserStore((state) => state.profile)
  const displayName = profile?.displayName ?? profile?.fullName
  const initials = getAvatarInitials(displayName || t("profile"))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 w-full" asChild>
        <SidebarMenuButton size="lg" tooltip={displayName ?? t("profile")}>
          <div className="grow flex items-center gap-2">
            <UserAvatar variant="small" initials={initials} avatarUrl={profile?.avatarUrl} />
            <div className="flex flex-col items-start min-w-0">
              {profile ? (
                <>
                  <span className="truncate text-sm font-medium leading-none">{displayName}</span>
                  <span className="ml-0.5 max-w-32 truncate text-xs text-muted-foreground">{profile?.email}</span>
                </>
              ) : (
                <>
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="mt-1 h-2 w-16" />
                </>
              )}
            </div>
          </div>
          <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="end" className="flex flex-col gap-2">
        <DropdownMenuLabel className="flex items-center gap-2">
          <UserAvatar variant="small" initials={initials} avatarUrl={profile?.avatarUrl} />
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium leading-none">{displayName}</span>
            <span className="ml-0.5 text-xs text-muted-foreground">{profile?.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>{t("account")}</DropdownMenuItem>
        <DropdownMenuItem>{t("billing")}</DropdownMenuItem>
        <DropdownMenuItem variant="destructive" aria-label={t("signOut")}>
          <LogOut />
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
