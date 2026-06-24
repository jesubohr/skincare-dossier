"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import { Link, useRouter } from "@/i18n/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const t = useTranslations("Auth.register")
  const common = useTranslations("Common")
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError(t("passwordMismatch"))
      return
    }

    if (password.length < 8) {
      setError(t("passwordLength"))
      return
    }

    setLoading(true)

    const { error } = await authClient.signUp.email({ name, email, password })
    console.log("Sign up error:", error)

    if (error) {
      setError(error.message ?? t("couldNotCreate"))
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl tracking-tight text-foreground mb-1">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {t("fullName")}
          </Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Dr. Ana Reyes"
            className="rounded-[6px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {common("email")}
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="rounded-[6px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {common("password")}
            </Label>
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-[11px] font-mono uppercase tracking-[0.10em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? common("hide") : common("show")}
            </button>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("passwordPlaceholder")}
            className="rounded-[6px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {t("confirmPassword")}
          </Label>
          <Input
            id="confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            className="rounded-[6px]"
          />
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full mt-1">
          {loading ? t("submitting") : t("submit")}
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-border flex items-center justify-center text-sm text-muted-foreground">
        <span>
          {t("hasAccount")}{" "}
          <Link href="/login" className="text-foreground hover:opacity-70 transition-opacity font-medium">
            {t("signIn")}
          </Link>
        </span>
      </div>
    </div>
  )
}
