"use client"

import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import { ConvexReactClient } from "convex/react"
import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { useUserStore } from "@/lib/store/user-store"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ClerkProvider>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <UserProvider>
            <div className="w-full min-h-screen">{children}</div>
          </UserProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
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
