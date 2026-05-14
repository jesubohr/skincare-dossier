import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/"]

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic =
    PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/api/auth") || pathname.startsWith("/_next") || pathname.startsWith("/favicon")

  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/register")

  if (isPublic) return NextResponse.next()

  // BetterAuth session cookie
  const session = request.cookies.get("better-auth.session_token")
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
