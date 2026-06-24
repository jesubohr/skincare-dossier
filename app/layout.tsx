import type { Metadata } from "next"
import { Providers } from "./providers"
import { getToken } from "@/lib/auth-server"

import "@fontsource-variable/lexend"
import "@fontsource/instrument-serif"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  applicationName: "Skincare Dossier",
  title: {
    default: "Skincare Dossier",
    template: "%s | Skincare Dossier",
  },
  description:
    "A minimalist CRM for independent skincare and medical-spa practitioners.",
  keywords: [
    "skincare CRM",
    "medical spa CRM",
    "cosmetologist CRM",
    "client treatment history",
    "appointment management",
    "practice management",
  ],
  authors: [{ name: "Skincare Dossier" }],
  creator: "Skincare Dossier",
  publisher: "Skincare Dossier",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Skincare Dossier",
    title: "Skincare Dossier",
    description:
      "A minimalist CRM for independent skincare and medical-spa practitioners.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Skincare Dossier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skincare Dossier",
    description:
      "A minimalist CRM for independent skincare and medical-spa practitioners.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  appleWebApp: {
    title: "Skincare Dossier",
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
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
