import type { Metadata } from "next"
import { Providers } from "./providers"

import "@fontsource-variable/lexend"
import "@fontsource/instrument-serif"
import "./globals.css"

export const metadata: Metadata = {
  title: "Skincare Dossier",
  description: "A Minimalist CRM for Modern Cosmetologists",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
