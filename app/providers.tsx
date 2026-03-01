"use client"

import { ThemeProvider } from "next-themes"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full min-h-screen">{children}</main>
      </SidebarProvider>
    </ThemeProvider>
  )
}
