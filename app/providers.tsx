"use client"

import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { useUserStore } from "@/lib/store/user-store"
import { ConvexProvider, ConvexReactClient } from "convex/react"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ConvexProvider client={convex}>
        <UserProvider>
          <div className="w-full min-h-screen">{children}</div>
        </UserProvider>
      </ConvexProvider>
    </ThemeProvider>
  )
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const initialize = useUserStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <>{children}</>
}
