import type { Metadata } from "next"
import "@fontsource-variable/lexend"
import "./globals.css"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: "Skincare Dossier",
  description: "The platform for skincare professionals",
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
