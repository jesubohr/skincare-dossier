import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { routing } from "@/i18n/routing"

const handleI18nRouting = createMiddleware(routing)
const PUBLIC_PATHS = new Set(["", "/login", "/register"])

function getLocalizedPath(pathname: string) {
  const [, locale, ...rest] = pathname.split("/")

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return null
  }

  return {
    locale,
    pathname: `/${rest.join("/")}`.replace(/\/$/, "") || "",
  }
}

export function proxy(request: NextRequest) {
  const localizedPath = getLocalizedPath(request.nextUrl.pathname)
  const response = handleI18nRouting(request)

  if (!localizedPath || !response.ok) {
    return response
  }

  const { locale, pathname } = localizedPath
  const isPublic = PUBLIC_PATHS.has(pathname)
  const session = request.cookies.get("better-auth.session_token")

  if (isPublic) {
    if (session && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }

    return response
  }

  if (!session) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }

  return response
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
}
