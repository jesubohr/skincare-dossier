"use client"

import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useUserStore } from "@/lib/store/user-store"

export function Providers({ children }: { children: React.ReactNode }) {
  const initialize = useUserStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full min-h-screen">{children}</main>
      </SidebarProvider>
    </ThemeProvider>
  )
}
