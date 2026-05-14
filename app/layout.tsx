import type { Metadata } from "next"
import { Providers } from "./providers"
import { getToken } from "@/lib/auth-server"

import "@fontsource-variable/lexend"
import "@fontsource/instrument-serif"
import "./globals.css"

export const metadata: Metadata = {
  title: "Skincare Dossier",
  description: "A Minimalist CRM for Modern Cosmetologists",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = await getToken()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers initialToken={token}>{children}</Providers>
      </body>
    </html>
  )
}
