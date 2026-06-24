import type { Metadata } from "next"
import { hasLocale } from "next-intl"
import { NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import { Providers } from "../providers"
import { routing } from "@/i18n/routing"
import { getToken } from "@/lib/auth-server"

import "@fontsource-variable/lexend"
import "@fontsource/instrument-serif"
import "../globals.css"

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Metadata" })

  return {
    metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
    applicationName: "Skincare Dossier",
    title: {
      default: "Skincare Dossier",
      template: "%s | Skincare Dossier",
    },
    description: t("description"),
    keywords: t.raw("keywords"),
    authors: [{ name: "Skincare Dossier" }],
    creator: "Skincare Dossier",
    publisher: "Skincare Dossier",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_CO" : "en_US",
      url: `/${locale}`,
      siteName: "Skincare Dossier",
      title: "Skincare Dossier",
      description: t("description"),
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
      description: t("description"),
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
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const token = await getToken()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Providers initialToken={token}>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
