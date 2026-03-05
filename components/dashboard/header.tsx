"use client"

import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { useSidebar } from "@/components/ui/sidebar"

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="flex items-center justify-between">
      <Button size="icon" variant="ghost" className="group h-9 w-9 hover:bg-primary/10 dark:hover:bg-primary/30" onClick={toggleSidebar}>
        <PanelLeft className="size-4 group-hover:text-primary transition-colors" />
      </Button>
      <ThemeToggle />
    </header>
  )
}
