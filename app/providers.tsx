"use client"

import { ThemeProvider } from "next-themes"
import { UserProvider } from "@/components/providers/user-provider"
import { ConvexClientProvider } from "@/components/providers/convex-client-provider"

export function Providers({ children, initialToken }: { children: React.ReactNode; initialToken?: string | null }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ConvexClientProvider initialToken={initialToken}>
        <UserProvider>
          <main className="w-full min-h-screen">{children}</main>
        </UserProvider>
      </ConvexClientProvider>
    </ThemeProvider>
  )
}
