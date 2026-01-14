import type { Metadata } from "next"
import "@fontsource-variable/lexend"
import "./globals.css"

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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
