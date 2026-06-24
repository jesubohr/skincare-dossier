# Locale-prefixed internationalized routing

Skincare Dossier uses always-prefixed locale routes for the web app: `/es/...` and `/en/...`, with Spanish (`es`) as the default locale.

This keeps each language explicit in URLs, gives the app a clear place to load translated UI messages, and avoids mixing locale negotiation into protected route names. Auth remains owned by the Next.js proxy: public locale roots and auth pages are allowed, authenticated Practitioners are redirected away from locale auth pages to their locale dashboard, and unauthenticated protected routes redirect to the matching locale login page.

API auth routes remain unlocalized because they are protocol endpoints, not user-facing surfaces. Checkout is user-facing and protected, so it follows the locale-prefixed route shape.
