"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

const iconStyles = "group-hover:text-primary transition-colors"

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => Promise<void> | void) => void
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  function toggleTheme() {
    const viewTransitionDocument = document as ViewTransitionDocument
    const isAppearanceTransition =
      viewTransitionDocument.startViewTransition !== undefined && !window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!isAppearanceTransition) {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
      return
    }

    viewTransitionDocument.startViewTransition?.(async () => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    })
  }

  return (
    <Button size="icon" variant="ghost" onClick={toggleTheme} className="group h-9 w-9 hover:bg-primary/10 dark:hover:bg-primary/30">
      {resolvedTheme === "dark" ? <Moon className={iconStyles} suppressHydrationWarning /> : <Sun className={iconStyles} suppressHydrationWarning />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
