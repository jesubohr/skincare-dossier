"use client"

import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { useUserStore } from "@/lib/store/user-store"

export function Providers({ children }: { children: React.ReactNode }) {
  const initialize = useUserStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="w-full min-h-screen">{children}</div>
    </ThemeProvider>
  )
}
