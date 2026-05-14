"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
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
      setError("Passwords do not match.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setLoading(true)

    const { error } = await authClient.signUp.email({ name, email, password })
    console.log("Sign up error:", error)

    if (error) {
      setError(error.message ?? "Could not create account.")
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl tracking-tight text-foreground mb-1">Create your account</h1>
        <p className="text-sm text-muted-foreground">Set up your practice dossier in seconds.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Full name
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
            Email
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
              Password
            </Label>
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-[11px] font-mono uppercase tracking-[0.10em] text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            className="rounded-[6px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Confirm password
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
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-border flex items-center justify-center text-sm text-muted-foreground">
        <span>
          Already have an account?{" "}
          <Link href="/login" className="text-foreground hover:opacity-70 transition-opacity font-medium">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  )
}
