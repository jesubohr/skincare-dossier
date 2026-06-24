"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"

import { api } from "@/convex/_generated/api"
import type { ClientStatus } from "@/lib/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const SKIN_TYPES = ["Normal", "Dry", "Oily", "Combination", "Sensitive", "Aging", "Acne"] as const
const STATUS_OPTIONS: ClientStatus[] = ["active", "needs-follow-up", "payment-overdue", "none"]

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: "",
  skinType: "",
  status: "active" as ClientStatus,
}

function statusKey(status: ClientStatus) {
  if (status === "needs-follow-up") return "needsFollowUp"
  if (status === "payment-overdue") return "paymentOverdue"
  return status
}

export function NewClientSheet() {
  const t = useTranslations("Clients")
  const common = useTranslations("Common")
  const statusText = useTranslations("Common.status")
  const skinTypes = useTranslations("Common.skinTypes")
  const createClient = useMutation(api.clients.createClient)
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      await createClient({
        fullName: form.fullName.trim(),
        email: form.email.trim() || undefined,
        phone: form.phone.trim(),
        birthDate: form.birthDate,
        skinType: form.skinType,
        status: form.status,
      })
      setForm(EMPTY_FORM)
      setOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          {t("newClient")}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t("newClient")}</SheetTitle>
          <SheetDescription>{t("newDescription")}</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("fullName")}</Label>
              <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Jane Doe" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{common("email")}</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="jane@example.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 555 123 4567" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">{t("birthDate")}</Label>
              <Input id="birthDate" type="date" value={form.birthDate} onChange={(e) => update("birthDate", e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skinType">{t("skinType")}</Label>
              <Select value={form.skinType} onValueChange={(value) => update("skinType", value)}>
                <SelectTrigger id="skinType" className="w-full">
                  <SelectValue placeholder={t("selectSkinType")} />
                </SelectTrigger>
                <SelectContent>
                  {SKIN_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {skinTypes(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">{t("status")}</Label>
              <Select value={form.status} onValueChange={(value) => update("status", value as ClientStatus)}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {statusText(statusKey(option))}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? common("saving") : t("create")}
            </Button>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                {common("cancel")}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
