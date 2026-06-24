"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"

import type { Id } from "@/convex/_generated/dataModel"
import { useTreatments } from "@/lib/hooks/use-treatments"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface TreatmentRow {
  id: string
  name: string
  description?: string
  durationMinutes: number
  price?: number
}

interface TreatmentSheetProps {
  treatment?: TreatmentRow
  trigger?: React.ReactNode
}

const emptyForm = (treatment?: TreatmentRow) => ({
  name: treatment?.name ?? "",
  description: treatment?.description ?? "",
  duration: treatment ? String(treatment.durationMinutes) : "",
  price: treatment?.price !== undefined ? String(treatment.price) : "",
})

export function TreatmentSheet({ treatment, trigger }: TreatmentSheetProps) {
  const t = useTranslations("Treatments")
  const common = useTranslations("Common")
  const { createTreatment, updateTreatment } = useTreatments()
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState(emptyForm(treatment))

  const isEdit = Boolean(treatment)
  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleOpenChange = (next: boolean) => {
    if (next) setForm(emptyForm(treatment))
    setOpen(next)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    try {
      const priceValue = form.price.trim()
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        priceCents: priceValue ? Math.round(Number(priceValue) * 100) : undefined,
        durationMinutes: Number(form.duration),
      }

      if (treatment) {
        await updateTreatment({ id: treatment.id as Id<"treatments">, ...payload })
      } else {
        await createTreatment(payload)
      }
      setOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus className="h-4 w-4" />
            {t("newTreatment")}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{isEdit ? t("editTreatment") : t("newTreatment")}</SheetTitle>
          <SheetDescription>{isEdit ? t("editDescription") : t("newDescription")}</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 space-y-4 overflow-y-auto px-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={t("namePlaceholder")} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea id="description" rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder={t("descriptionPlaceholder")} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">{t("duration")}</Label>
                <Input id="duration" type="number" min={1} step={5} value={form.duration} onChange={(e) => update("duration", e.target.value)} placeholder="60" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">{t("price")}</Label>
                <Input id="price" type="number" min={0} step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="150.00" />
              </div>
            </div>
          </div>

          <SheetFooter>
            <Button type="submit" disabled={submitting}>
              {submitting ? common("saving") : isEdit ? t("saveChanges") : t("create")}
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
